import Request from "../lib/Index.js";
import { writeFileSync } from "fs";

const response = await Request({
  url: "https://pt.wikipedia.org/static/images/mobile/copyright/wikipedia.png",
});

// learn about https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
const mime_type = {
  media: response.headers["content-type"].split("/")[0],
  extension: response.headers["content-type"].split("/")[1],
};

writeFileSync(
  `./${mime_type.media}.${mime_type.extension}`,
  // media buffer
  response.data,
  {
    flag: "w+",
  }
);

console.log(response.headers["content-type"], response.data.length);
