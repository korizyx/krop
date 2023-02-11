import request from "./functions/Request.js";
import Session from "./structures/Session.js";

request.Session = Session;

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
  request[method] = (options) => request({ ...options, method });
});

export default request;
