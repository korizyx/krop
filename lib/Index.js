import request from "./functions/Request.js";
import Session from "./structures/Session.js";
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

request.Session = Session;
assert.equal(request.Session, Session);

export default {
  request,
  Session,
};
