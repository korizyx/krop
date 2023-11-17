import { connect, constants } from "http2";
import RequestManager from "../structures/RequestManager.js";

const { HTTP2_HEADER_STATUS } = constants;

export default function HTTP2(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const parsed_options = await RequestManager.parseOptions(options);
      const clientSession = connect(new URL(parsed_options.url), {
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
          data: await RequestManager.parseResponseData(response_data, headers),
        });
      });

      if (!req.readableEnded) req.end();
    } catch (error) {
      reject(error);
    }
  });
}
