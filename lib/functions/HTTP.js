"use strict";

import { request } from "http";
import RequestManager from "../structures/RequestManager.js";

export default function HTTP(options = {}) {
  return new Promise(async (resolve, reject) => {
    const parsed_options = await RequestManager.parseOptions(options);

    delete parsed_options.request.agent;

    if (parsed_options.request.port == 443) {
      delete parsed_options.request.port;
    }

    const req = request(parsed_options.request, (res) => {
      const response_data = [];

      res.on("data", (chunk) => {
        response_data.push(chunk);
      });

      res.on("end", () => {
        res.data = RequestManager.parseResponseData(response_data, res.headers);

        resolve(res);
      });
    }).on("error", (error) => {
      reject(error);
    });

    if (parsed_options.payload?.length > 0) req.write(parsed_options.payload);

    req.end();
  });
}
