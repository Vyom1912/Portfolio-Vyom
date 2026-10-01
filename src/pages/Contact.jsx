import { useRef, useState } from "react";
import { Link } from "react-router";
import Page from "../components/Page.jsx";
import { checkEmail, domainAcceptsMail } from "../components/emailCheck.js";
import { person } from "../data/site.js";

// Web3Forms public access key (safe to expose; it only allows sending to Vyom's inbox).
const ACCESS_KEY = "b425eae4-14d0-43ec-abec-40e85b13220f";

function checkName(v) {
  const name = v.trim();
  if (name.length < 2) return "Please enter your name.";
  if (name.length > 60) return "Please keep your name under 60 characters.";
  if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(name)) return "Names can use letters, spaces, dots, hyphens and apostrophes.";
  return "";
}
function checkMessage(v) {
  const text = v.trim();
  if (text.length < 20) return `Please write a little more (at least 20 characters, ${Math.max(0, 20 - text.length)} to go).`;
  if (text.length > 5000) return "Please keep the message under 5,000 characters.";
  return "";
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [emailState, setEmailState] = useState("idle"); // idle | checking | ok
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState("idle");
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  // Runs the email checks; with `online`, also asks DNS whether the domain takes mail.
  async function validateEmail(value, online) {
    const res = checkEmail(value);
    setSuggestion(res.suggestion || "");
    if (!res.ok) {
      setEmailState("idle");
      setErrors((e) => ({ ...e, email: res.message }));
      return null;
    }
    if (!online) {
      setErrors((e) => ({ ...e, email: "" }));
      return res.email;
    }
    setEmailState("checking");
    const ok = await domainAcceptsMail(res.domain);
    if (!ok) {
      setEmailState("idle");
      setErrors((e) => ({ ...e, email: `${res.domain} can't receive email. Please check the address.` }));
      return null;
    }
    setEmailState("ok");
    setErrors((e) => ({ ...e, email: "" }));
    return res.email;
  }

  const onChange = (field) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (status === "sent" || status === "error") setStatus("idle");
    if (field === "email") setEmailState("idle");
    // Once a field has been left, keep its message up to date while typing.
    if (touched[field]) {
      if (field === "name") setErrors((er) => ({ ...er, name: checkName(value) }));
      if (field === "message") setErrors((er) => ({ ...er, message: checkMessage(value) }));
      if (field === "email") validateEmail(value, false);
    }
  };

  const onBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "name") setErrors((er) => ({ ...er, name: checkName(values.name) }));
    if (field === "message") setErrors((er) => ({ ...er, message: checkMessage(values.message) }));
    if (field === "email" && values.email.trim()) validateEmail(values.email, true);
  };

  const useSuggestion = () => {
    setValues((v) => ({ ...v, email: suggestion }));
    setSuggestion("");
    validateEmail(suggestion, true);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (values.botcheck) return;
    setTouched({ name: true, email: true, message: true });
    const nameError = checkName(values.name);
    const messageError = checkMessage(values.message);
    setErrors((er) => ({ ...er, name: nameError, message: messageError }));
    const email = await validateEmail(values.email, true);
    const firstBad = nameError ? "name" : !email ? "email" : messageError ? "message" : null;
    if (firstBad) {
      refs[firstBad].current?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${values.name.trim()}`,
          name: values.name.trim(),
          email,
          message: values.message.trim(),
          botcheck: false,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setValues({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
      setEmailState("idle");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field = (name) => ({
    id: `f-${name}`,
    name,
    ref: refs[name],
    value: values[name],
    onChange: onChange(name),
    onBlur: onBlur(name),
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
    className: errors[name] ? "invalid" : touched[name] && !errors[name] && values[name] ? "valid" : "",
  });

  return (
    <Page path="/contact">
      <section className="wrap page-head">
        <p className="label">Contact</p>
        <h1>Get in touch</h1>
        <p className="lede">
          I'm open to full-time full stack roles and to freelance web projects. Send a message here or email me directly.
        </p>
      </section>

      <section className="wrap contact-grid">
        <div>
          <dl className="contact-list">
            <dt className="label">Email</dt>
            <dd><a className="link" href={`mailto:${person.email}`}>{person.email}</a></dd>
            <dt className="label">LinkedIn</dt>
            <dd><a className="link" href={person.linkedin} target="_blank" rel="noopener me">linkedin.com/in/vyom1912</a></dd>
            <dt className="label">GitHub</dt>
            <dd><a className="link" href={person.github} target="_blank" rel="noopener me">github.com/Vyom1912</a></dd>
            <dt className="label">Based in</dt>
            <dd>{person.location}</dd>
          </dl>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="f-name">Your name</label>
            <input type="text" autoComplete="name" maxLength={60} {...field("name")} />
            {errors.name && <p className="field-error" id="f-name-error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="f-email">Your email</label>
            <div className="input-wrap">
              <input type="email" inputMode="email" autoComplete="email" spellCheck="false" placeholder="you@gmail.com" {...field("email")} />
              <span className={`field-state ${emailState}`} aria-hidden="true">
                {emailState === "checking" && <i className="mini-spinner" />}
                {emailState === "ok" && (
                  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </span>
            </div>
            {errors.email && (
              <p className="field-error" id="f-email-error">
                {errors.email}
                {suggestion && (
                  <button type="button" className="fix-btn" onClick={useSuggestion}>
                    Use {suggestion}
                  </button>
                )}
              </p>
            )}
            {!errors.email && emailState === "ok" && <p className="field-ok">This address can receive email.</p>}
            {!errors.email && emailState !== "ok" && <p className="field-hint">I'll reply to this address, so please use one you check.</p>}
          </div>

          <div className="field">
            <label htmlFor="f-message">Message</label>
            <textarea rows="6" maxLength={5000} {...field("message")} />
            <div className="field-foot">
              {errors.message ? <p className="field-error" id="f-message-error">{errors.message}</p> : <span />}
              <span className="counter">{values.message.trim().length} / 5000</span>
            </div>
          </div>

          <input
            type="checkbox"
            name="botcheck"
            className="hp"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.checked }))}
          />
          <button className="btn btn-solid" type="submit" disabled={status === "sending" || emailState === "checking"}>
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          <p className={`form-status ${status}`} role="status">
            {status === "sent" && "Thanks, your message is on its way. I'll reply by email."}
            {status === "error" && (
              <>Something went wrong. Please email me at <a className="link" href={`mailto:${person.email}`}>{person.email}</a>.</>
            )}
            {(status === "idle" || status === "sending") && (
              <>Messages are delivered through Web3Forms. See the <Link className="link" to="/privacy">privacy policy</Link>.</>
            )}
          </p>
        </form>
      </section>
    </Page>
  );
}
