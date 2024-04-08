"use strict";

import __HTTP from "./HTTP.js";
import __HTTPS from "./HTTPS.js";
import __HTTP2 from "./HTTP2.js";

const ciphers = [
  "TLS_AES_256_GCM_SHA384",
  "TLS_CHACHA20_POLY1305_SHA256",
  "TLS_AES_128_GCM_SHA256",
  "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
  "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
  "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256",
  "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
  "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
  "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
].join(":");

function Request(...args) {
  const url = args.find((v) => typeof v == "string") || "";
  const options = args.find((v) => typeof v == "object") || {};

  if (!options?.url) options.url = url;

  options.url.includes("http:") || options.url.includes("https:")
    ? null
    : (options.url = `https://${options.url}`);

  try {
    return options.http2
      ? __HTTP2(options)
      : options.url.includes("http:")
      ? __HTTP(options)
      : __HTTPS(options);
  } catch (error) {
    if (options?.retry && options.retry > 0) {
      --options.retry;
      return Request(options);
    } else {
      throw error;
    }
  }
}

Request.BETTER_CIPHERS = ciphers;

export default Request;
