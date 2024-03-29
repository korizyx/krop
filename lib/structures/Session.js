"use strict";

import Request from "../functions/Request.js";

class Session {
  constructor(default_options = {}) {
    this.default_options = default_options;
    this.cookies = "";
  }

  async req(...args) {
    try {
      const url = args.find((v) => typeof v == "string") || "";
      const options = args.find((v) => typeof v == "object") || {};

      if (!options?.url) options.url = url;

      const parsed_options = this.addCookiesInOptions({
        ...this.default_options,
        ...options,
        headers: {
          ...this.default_options?.headers,
          ...options?.headers,
        },
      });

      const response = await Request(parsed_options);

      try {
        if (response.headers["set-cookie"]) {
          if (this.cookies) {
            const session_cookies = this.json();
            const response_cookies = this.json(
              response.headers["set-cookie"]
                .map((c) => c.split(";")[0])
                .join("; ")
            );

            const interweaving = {
              ...session_cookies,
              ...response_cookies,
            };

            var str = "";

            for (const key of Object.keys(interweaving)) {
              str += `${key}=${interweaving[key]}; `;
            }

            this.cookies = str.slice(0, -2);
          } else {
            this.cookies = response.headers["set-cookie"]
              .map((c) => c.split(";")[0])
              .join("; ");
          }
        }
      } catch (_error) {
        throw _error;
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  addCookie(cookie) {
    if (typeof cookie == "object") {
      if (this.cookies.includes(cookie.name)) {
        return false;
      } else if (this.cookies) {
        this.cookies += `; ${cookie.name}=${cookie.value}`;

        return true;
      } else {
        this.cookies = `${cookie.name}=${cookie.value}`;

        return true;
      }
    } else {
      if (this.cookies.includes(cookie.split("=")[0])) {
        return false;
      } else if (this.cookies) {
        this.cookies += `; ${cookie.trim()}`;

        return true;
      } else {
        this.cookies = `${cookie.trim()}`;

        return true;
      }
    }
  }

  removeCookie(cookie_name) {
    if (this.cookies.includes(cookie_name)) {
      this.cookies = this.cookies.replace(
        this.cookies.slice(this.cookies.indexOf(cookie_name)).split(" ")[0],
        ""
      );

      return true;
    } else return false;
  }

  addCookiesInOptions(options) {
    if (this.cookies) {
      if (options.headers && options.headers?.cookie) {
        options.headers.cookie += "; " + this.cookies;
      } else {
        options.headers.cookie = this.cookies;
      }
    }

    return options;
  }

  json(str, encode = true) {
    const object = {};

    for (const cookie of (str || this.cookies).split("; ")) {
      const [name, ...value] = cookie.split("=");

      if (name) {
        object[name] = encode
          ? encodeURIComponent(value.join("="))
          : value.join("=");
      }
    }

    return object;
  }
}

export default Session;
