// Krop v0.3.1 Copyright (c) 2023 Kori <korinamez@gmail.com> and contributors
'use strict';

const http = require('http');
const https = require('https');
const http2 = require('http2');
const assert = require('assert');

const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_SCHEME,
  HTTP2_HEADER_AUTHORITY,
} = http2.constants;

class RequestManager {
  constructor() {
    this.midia_types = ["image", "video", "audio", "font"];
  }

  proxyParse(text) {
    var input = text;

    const protocol = input.split("://")[0];

    if (input.includes("@"))
      input = input.substring(input.lastIndexOf("@") + 1);
    else if (input.includes("://")) input = input.split("://")[1];

    const host = input.split(":")[0];
    const port = parseInt(input.split(":")[1]);

    input = text.split("://")[1];

    input = text.substring(0, text.lastIndexOf("@"));
    const [username, password] = input.split(":");

    return { host, port, protocol: protocol || "https", username, password };
  }

  proxyTunnel(url, proxy, headers = {}, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const urlParsed = new URL(url);
      const parsed_proxy =
        typeof proxy == "object" ? proxy : this.proxyParse(proxy);

      if (parsed_proxy.username) {
        headers["Proxy-Authorization"] =
          "Basic " +
          Buffer.from(
            parsed_proxy.username + ":" + parsed_proxy.password
          ).toString("base64");
      }

      http.request({
        host: parsed_proxy.host,
        port: parsed_proxy.port,
        method: "CONNECT",
        maxVersion: "TLSv1.3",
        path: `${urlParsed.hostname}:${urlParsed.port ? urlParsed.port : 443}`,
        timeout,
        headers,
      })
        .on("connect", (response, socket) => {
          if (response.statusCode == 200) {
            resolve(socket);
          } else {
            reject(response);
          }
        })
        .on("error", (err) => reject(err))
        .on("timeout", (err) => reject("timeout to connect in proxy"))
        .end();
    });
  }

  parseResponseData(arr_data, headers) {
    const buffer = Buffer.concat(arr_data);
    var data;

    try {
      data = JSON.parse(buffer.toString());
    } catch (error) {
      if (
        headers["content-type"] &&
        this.midia_types.some((type) => headers["content-type"].includes(type))
      ) {
        data = buffer;
      } else {
        data = buffer.toString();
      }
    }

    return data;
  }

  async parseOptions(options = {}) {
    const parsed_url = new URL(options.url);

    const buffer = Buffer.from(
      typeof options.payload == "object"
        ? JSON.stringify(options.payload)
        : typeof options.payload != "string" && options.payload
        ? String(options.payload)
        : options.payload || ""
    );

    if (options.http2) {
      if (options.proxy) {
        options.socket = await this.proxyTunnel(options.url, options.proxy);
      }

      return {
        url: options.url,
        payload: buffer,
        client: {
          maxVersion: "TLSv1.3",
          ALPNProtocols: ["h2", "http/1.1"],
          socket: options.socket,
          ciphers: options?.ciphers || null,
        },
        request: {
          [HTTP2_HEADER_AUTHORITY]: parsed_url.host,
          [HTTP2_HEADER_PATH]: parsed_url.pathname + parsed_url.search || "/",
          [HTTP2_HEADER_SCHEME]: parsed_url.protocol.split(":")[0],
          [HTTP2_HEADER_METHOD]:
            http2.constants[`HTTP2_METHOD_${options.method?.toUpperCase()}`],
          "Content-Type": "text/plain",
          "Content-Length": buffer.length,
          Accept: "*/*, image/*",
          ...options?.headers,
        },
      };
    } else {
      if (options.proxy) {
        options.agent = new https.Agent({
          socket: await this.proxyTunnel(options.url, options.proxy).catch(
            (error) => {
              throw error;
            }
          ),
          keepAlive: true,
        });
      } else {
        options.agent = new https.Agent(options);
      }

      return {
        url: options.url,
        payload: buffer,
        request: {
          origin: parsed_url.origin,
          href: parsed_url.href,
          protocol: parsed_url.protocol || "https:",
          hostname: parsed_url.hostname,
          path: parsed_url.pathname + parsed_url.search || "/",
          port: parsed_url.port || 443,
          method: options.method?.toUpperCase() || "GET",
          maxVersion: "TLSv1.3",
          timeout: options.timeout || 15000,
          ciphers: options?.ciphers || null,
          headers: {
            accept: "application/json, text/plain, image/*, */*",
            "accept-language": "en-US,en;q=0.9",
            "Content-Length": buffer.length,
            ...options?.headers,
          },
          ...options,
        },
      };
    }
  }
}

const RequestManager$1 = new RequestManager();

function HTTP(options = {}) {
  return new Promise(async (resolve, reject) => {
    const parsed_options = await RequestManager$1.parseOptions(options);

    delete parsed_options.request.agent;

    if (parsed_options.request.port == 443) {
      delete parsed_options.request.port;
    }

    const req = http.request(parsed_options.request, (res) => {
      const response_data = [];

      res.on("data", (chunk) => {
        response_data.push(chunk);
      });

      res.on("end", () => {
        res.status = res.statusCode;
        res.data = RequestManager$1.parseResponseData(response_data, res.headers);

        resolve(res);
      });
    }).on("error", (error) => {
      reject(error);
    });

    if (parsed_options.payload?.length > 0) req.write(parsed_options.payload);

    req.end();
  });
}

function HTTPS(options) {
  return new Promise(async (resolve, reject) => {
    const parsed_options = await RequestManager$1.parseOptions(options);

    const req = https.request({ ...parsed_options.request }, (res) => {
      const response_data = [];

      res.on("data", (chunk) => {
        response_data.push(chunk);
      });

      res.on("end", () => {
        res.status = res.statusCode;
        res.data = RequestManager$1.parseResponseData(response_data, res.headers);

        resolve(res);
      });
    }).on("error", (error) => {
      reject(error);
    });

    if (parsed_options.payload?.length > 0) req.write(parsed_options.payload);

    req.end();
  });
}

const { HTTP2_HEADER_STATUS } = http2.constants;

function HTTP2(options) {
  return new Promise(async (resolve) => {
    const parsed_options = await RequestManager$1.parseOptions(options);
    const clientSession = http2.connect(new URL(parsed_options.url), {
      ...parsed_options.client,
      peerMaxConcurrentStreams: Infinity,
    });

    clientSession.once("error", console.log);

    const req = clientSession.request({ ...parsed_options.request });

    if (parsed_options.payload?.length > 0) req.write(parsed_options.payload);

    const response_data = [];
    var headers;

    req.once("response", (_headers) => {
      headers = _headers;
    });

    req.on("data", (chunk) => {
      response_data.push(chunk);
    });

    req.on("end", async () => {
      // req.destroy();
      // clientSession.destroy();

      resolve({
        status: headers[HTTP2_HEADER_STATUS],
        headers,
        data: RequestManager$1.parseResponseData(response_data, headers),
      });
    });

    if (!req.readableEnded) req.end();
  });
}

function Request(...args) {
  const url = args.find((v) => typeof v == "string") || "";
  const options = args.find((v) => typeof v == "object") || {};

  if (!options?.url) options.url = url;

  options.url.includes("http:") || options.url.includes("https:")
    ? null
    : (options.url = `https://${options.url}`);

  return options.http2
    ? HTTP2(options)
    : options.url.includes("http:")
    ? HTTP(options)
    : HTTPS(options);
}

class Session {
  constructor(default_options = {}) {
    this.default_options = default_options;
    this.cookies = "";
  }

  async req(...args) {
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
    } catch (error) {}

    return response;
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

  json(str) {
    const object = {};

    for (const cookie of (str || this.cookies).split("; ")) {
      const [name, ...value] = cookie.split("=");

      if (name) {
        object[name] = value.join("=");
      }
    }
    
    return object;
  }
}

[
  "get",
  "post",
  "patch",
  "options",
  "delete",
  "head",
  "put",
  "link",
  "unlink",
  "purge",
].forEach((method) => {
  Request[method] = (options) => Request({ ...options, method });
});

Request.Session = Session;
assert.equal(Request.Session, Session);

const request = Request;

module.exports = request;
//# sourceMappingURL=krop.cjs.map
