import _request from "./functions/Request.js";
import _Session from "./structures/Session.js";
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
  _request[method] = (options) => _request({ ...options, method });
});

_request.Session = _Session;
assert.equal(_request.Session, _Session);

const request = _request;

export default request;
