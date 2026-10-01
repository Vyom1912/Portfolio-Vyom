// Email checks for the contact form. A static site can't prove an inbox exists,
// but these catch almost every fake or mistyped address before it is sent.

const DISPOSABLE = new Set([
  "mailinator.com", "10minutemail.com", "10minutemail.net", "guerrillamail.com", "guerrillamail.net", "sharklasers.com",
  "yopmail.com", "yopmail.net", "tempmail.com", "temp-mail.org", "tempmail.net", "tempmailo.com", "trashmail.com",
  "getnada.com", "nada.email", "dispostable.com", "maildrop.cc", "throwawaymail.com", "fakeinbox.com", "emailondeck.com",
  "mintemail.com", "mohmal.com", "1secmail.com", "1secmail.net", "mailnesia.com", "spamgourmet.com", "burnermail.io",
  "mailpoof.com", "tempr.email", "discard.email", "moakt.com", "emailfake.com", "fakemail.net", "mytemp.email",
  "inboxkitten.com", "tmail.ws", "mail.tm", "mailcatch.com", "spambox.us", "trbvm.com", "example.com", "example.org",
  "test.com", "email.com.test",
]);

// Common domains and the typos people make in them.
const KNOWN = ["gmail.com", "googlemail.com", "yahoo.com", "yahoo.in", "yahoo.co.in", "outlook.com", "hotmail.com", "live.com", "icloud.com", "rediffmail.com", "protonmail.com", "proton.me", "aol.com", "zoho.com"];
const TYPOS = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com", "gmaill.com": "gmail.com", "gmail.co": "gmail.com",
  "gmail.con": "gmail.com", "gmail.cm": "gmail.com", "gmail.om": "gmail.com", "gmail.in": "gmail.com", "gnail.com": "gmail.com",
  "gmal.com": "gmail.com", "gmali.com": "gmail.com", "gmail.comm": "gmail.com", "gmsil.com": "gmail.com", "gmail.cmo": "gmail.com",
  "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yahoo.con": "yahoo.com", "yhoo.com": "yahoo.com",
  "hotmial.com": "hotmail.com", "hotmai.com": "hotmail.com", "hotmail.con": "hotmail.com", "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com", "outllok.com": "outlook.com", "outlook.con": "outlook.com", "iclod.com": "icloud.com", "icloud.con": "icloud.com",
};

function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function suggestDomain(domain) {
  if (TYPOS[domain]) return TYPOS[domain];
  if (KNOWN.includes(domain)) return null;
  let best = null;
  for (const k of KNOWN) {
    const dist = distance(domain, k);
    if (dist > 0 && dist <= 2 && (!best || dist < best.dist)) best = { k, dist };
  }
  return best ? best.k : null;
}

// Synchronous checks. Returns { ok, message, suggestion }.
export function checkEmail(raw) {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, message: "Please enter your email address." };
  const at = email.lastIndexOf("@");
  if (at < 1 || at !== email.indexOf("@")) return { ok: false, message: "That doesn't look like an email address. It should look like name@gmail.com." };
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (!/^[a-z0-9._%+-]+$/.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return { ok: false, message: "The part before @ has characters an email address can't use." };
  if (!/^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/.test(domain))
    return { ok: false, message: "The part after @ isn't a valid domain, for example gmail.com." };

  const suggestion = suggestDomain(domain);
  if (suggestion) return { ok: false, message: `Did you mean ${local}@${suggestion}?`, suggestion: `${local}@${suggestion}` };

  if (DISPOSABLE.has(domain)) return { ok: false, message: "Please use your real email address, not a temporary inbox, so I can reply." };

  if (domain === "gmail.com" || domain === "googlemail.com") {
    // Gmail usernames: 6 to 30 letters, numbers and dots. A +tag after the name is allowed.
    const name = local.split("+")[0];
    const bare = name.replace(/\./g, "");
    if (!/^[a-z0-9.]+$/.test(name)) return { ok: false, message: "Gmail addresses can only use letters, numbers and dots before the @." };
    if (bare.length < 6 || bare.length > 30) return { ok: false, message: "Gmail addresses have 6 to 30 characters before the @. Please check yours." };
  }
  return { ok: true, email, domain };
}

// Asks public DNS (Cloudflare, over HTTPS) whether the domain can receive mail.
// Only the domain is sent, never the full address. If the lookup itself fails
// (offline, blocked), the form is not held up.
const cache = new Map();
export async function domainAcceptsMail(domain) {
  if (KNOWN.includes(domain)) return true;
  if (cache.has(domain)) return cache.get(domain);
  const ask = async (type) => {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`, {
      headers: { Accept: "application/dns-json" },
    });
    if (!res.ok) throw new Error("dns");
    return res.json();
  };
  try {
    const mx = await ask("MX");
    let ok = mx.Status === 0 && (mx.Answer || []).some((a) => a.type === 15 && !/^0 \.$/.test(a.data));
    if (!ok && mx.Status === 0) {
      // No MX record: mail can still go to the domain's own address record.
      const a = await ask("A");
      ok = a.Status === 0 && (a.Answer || []).length > 0;
    }
    cache.set(domain, ok);
    return ok;
  } catch {
    return true;
  }
}
