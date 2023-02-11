import request from "./functions/Request.js";
import session from "./structures/Session.js";

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

assert.equal(request.Session, session);

export default request;
