"use strict";

import __HTTP from "./HTTP.js";
import __HTTPS from "./HTTPS.js";
import __HTTP2 from "./HTTP2.js";

function Request(options) {
  return options.http2
    ? __HTTP2(options)
    : options.url.includes("http:")
    ? __HTTP(options)
    : __HTTPS(options);
}

export default Request;
