"use strict";

import { request } from "http";
import { Agent } from "https";
import { constants } from "http2";
import { createBrotliDecompress, createGunzip, createInflate } from "zlib";

const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_METHOD,
  HTTP2_HEADER_SCHEME,
  HTTP2_HEADER_AUTHORITY,
} = constants;

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

      request({
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

  decompress(arr_data, headers) {
    return new Promise((resolve, reject) => {
      const buffer = Buffer.concat(arr_data);

      if (headers["content-encoding"]?.includes("gzip")) {
        const gunzip = createGunzip();

        gunzip.end(buffer, function () {
          resolve(gunzip.read().toString());
        });
      } else if (headers["content-encoding"]?.includes("br")) {
        const brotli = createBrotliDecompress();

        brotli.end(buffer, function () {
          resolve(brotli.read().toString());
        });
      } else if (headers["content-encoding"]?.includes("deflate")) {
        const inflate = createInflate();

        inflate.end(buffer, function () {
          resolve(inflate.read().toString());
        });
      } else {
        resolve(buffer.toString());
      }
    });
  }

  async parseResponseData(arr_data, headers) {
    var data = await this.decompress(arr_data, headers);

    try {
      data = JSON.parse(buffer.toString());
    } catch (error) {
      if (
        headers["content-type"] &&
        this.midia_types.some((type) => headers["content-type"].includes(type))
      ) {
        data = buffer;
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
            constants[`HTTP2_METHOD_${options.method?.toUpperCase()}`],
          "Content-Type": "text/plain",
          "Content-Length": buffer.length,
          Accept: "*/*, image/*",
          ...options?.headers,
        },
      };
    } else {
      if (options.proxy) {
        options.agent = new Agent({
          socket: await this.proxyTunnel(options.url, options.proxy).catch(
            (error) => {
              throw error;
            }
          ),
          keepAlive: true,
        });
      } else {
        options.agent = new Agent(options);
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

export default new RequestManager();
