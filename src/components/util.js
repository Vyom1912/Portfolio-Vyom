export const asset = (path) => import.meta.env.BASE_URL + path;

export const hostOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
