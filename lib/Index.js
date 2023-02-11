import request from "./functions/Request.js";
import session from "./structures/Session.js";
import assert from "assert";

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

request.Session = session;
assert.equal(request.Session, session);

export var Session = session;
export default request;
