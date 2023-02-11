"use strict";

import __HTTP from "./HTTP.js";
import __HTTPS from "./HTTPS.js";
import __HTTP2 from "./HTTP2.js";

function Request(...args) {
  const url = args.find((v) => typeof v == "string") || "";
  const options = args.find((v) => typeof v == "object") || {};

  if (!options?.url) options.url = url;

  options.url.includes("http:") || options.url.includes("https:")
    ? null
    : (options.url = `https://${options.url}`);

  return options.http2
    ? __HTTP2(options)
    : options.url.includes("http:")
    ? __HTTP(options)
    : __HTTPS(options);
}

export default Request;
