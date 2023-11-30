// Krop v0.4.2 Copyright (c) 2023 Kori <korinamez@gmail.com> and contributors
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('http'), require('https'), require('http2'), require('zlib'), require('assert')) :
  typeof define === 'function' && define.amd ? define(['http', 'https', 'http2', 'zlib', 'assert'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.krop = factory(global.http, global.https, global.http2, global.zlib, global.assert));
})(this, (function (http, https, http2, zlib, assert) { 'use strict';

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw new Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var HTTP2_HEADER_PATH = http2.constants.HTTP2_HEADER_PATH,
    HTTP2_HEADER_METHOD = http2.constants.HTTP2_HEADER_METHOD,
    HTTP2_HEADER_SCHEME = http2.constants.HTTP2_HEADER_SCHEME,
    HTTP2_HEADER_AUTHORITY = http2.constants.HTTP2_HEADER_AUTHORITY;
  var RequestManager = /*#__PURE__*/function () {
    function RequestManager() {
      _classCallCheck(this, RequestManager);
      this.midia_types = ["image", "video", "audio", "font"];
    }
    _createClass(RequestManager, [{
      key: "proxyParse",
      value: function proxyParse(text) {
        var input = text;
        var protocol = input.split("://")[0];
        if (input.includes("@")) input = input.substring(input.lastIndexOf("@") + 1);else if (input.includes("://")) input = input.split("://")[1];
        var host = input.split(":")[0];
        var port = parseInt(input.split(":")[1]);
        input = text.split("://")[1];
        input = text.substring(0, text.lastIndexOf("@"));
        var _input$split = input.split(":"),
          _input$split2 = _slicedToArray(_input$split, 2),
          username = _input$split2[0],
          password = _input$split2[1];
        return {
          host: host,
          port: port,
          protocol: protocol || "https",
          username: username,
          password: password
        };
      }
    }, {
      key: "proxyTunnel",
      value: function proxyTunnel(url, proxy) {
        var _this = this;
        var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15000;
        return new Promise(function (resolve, reject) {
          var urlParsed = new URL(url);
          var parsed_proxy = _typeof(proxy) == "object" ? proxy : _this.proxyParse(proxy);
          if (parsed_proxy.username) {
            headers["Proxy-Authorization"] = "Basic " + Buffer.from(parsed_proxy.username + ":" + parsed_proxy.password).toString("base64");
          }
          http.request({
            host: parsed_proxy.host,
            port: parsed_proxy.port,
            method: "CONNECT",
            // maxVersion: "TLSv1.3",
            path: "".concat(urlParsed.hostname, ":").concat(urlParsed.port ? urlParsed.port : 443),
            timeout: timeout,
            headers: headers
          }).on("connect", function (response, socket) {
            if (response.statusCode <= 299) {
              resolve(socket);
            } else {
              reject(response);
            }
          }).on("error", function (err) {
            return reject(err);
          }).on("timeout", function (err) {
            return reject("timeout to connect in proxy");
          }).end();
        });
      }
    }, {
      key: "decompress",
      value: function decompress(arr_data, headers) {
        return new Promise(function (resolve, reject) {
          var _headers$contentEnco, _headers$contentEnco2, _headers$contentEnco3;
          var buffer = Buffer.concat(arr_data);
          if ((_headers$contentEnco = headers["content-encoding"]) !== null && _headers$contentEnco !== void 0 && _headers$contentEnco.includes("gzip")) {
            var gunzip = zlib.createGunzip();
            gunzip.end(buffer, function () {
              resolve(gunzip.read().toString());
            });
          } else if ((_headers$contentEnco2 = headers["content-encoding"]) !== null && _headers$contentEnco2 !== void 0 && _headers$contentEnco2.includes("br")) {
            var brotli = zlib.createBrotliDecompress();
            brotli.end(buffer, function () {
              resolve(brotli.read().toString());
            });
          } else if ((_headers$contentEnco3 = headers["content-encoding"]) !== null && _headers$contentEnco3 !== void 0 && _headers$contentEnco3.includes("deflate")) {
            var inflate = zlib.createInflate();
            inflate.end(buffer, function () {
              resolve(inflate.read().toString());
            });
          } else {
            resolve(buffer.toString());
          }
        });
      }
    }, {
      key: "parseResponseData",
      value: function () {
        var _parseResponseData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(arr_data, headers) {
          var data;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.decompress(arr_data, headers);
              case 2:
                data = _context.sent;
                try {
                  data = JSON.parse(data);
                } catch (error) {
                  if (headers["content-type"] && this.midia_types.some(function (type) {
                    return headers["content-type"].includes(type);
                  })) {
                    data = Buffer.concat(arr_data);
                  }
                }
                return _context.abrupt("return", data);
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function parseResponseData(_x, _x2) {
          return _parseResponseData.apply(this, arguments);
        }
        return parseResponseData;
      }()
    }, {
      key: "parseOptions",
      value: function () {
        var _parseOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var options,
            parsed_url,
            buffer,
            _options$method,
            _options$method2,
            _args2 = arguments;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.prev = 1;
                parsed_url = new URL(options.url);
                buffer = Buffer.from(_typeof(options.payload) == "object" ? JSON.stringify(options.payload) : typeof options.payload != "string" && options.payload ? String(options.payload) : options.payload || "");
                if (!options.http2) {
                  _context2.next = 12;
                  break;
                }
                if (!options.proxy) {
                  _context2.next = 9;
                  break;
                }
                _context2.next = 8;
                return this.proxyTunnel(options.url, options.proxy);
              case 8:
                options.socket = _context2.sent;
              case 9:
                return _context2.abrupt("return", {
                  url: options.url,
                  payload: buffer,
                  client: {
                    maxVersion: (options === null || options === void 0 ? void 0 : options.tlsVersion) || null,
                    ALPNProtocols: ["h2", "http/1.1"],
                    socket: options.socket,
                    ciphers: (options === null || options === void 0 ? void 0 : options.ciphers) || null
                  },
                  request: _objectSpread2(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, HTTP2_HEADER_AUTHORITY, parsed_url.host), HTTP2_HEADER_PATH, parsed_url.pathname + parsed_url.search || "/"), HTTP2_HEADER_SCHEME, parsed_url.protocol.split(":")[0]), HTTP2_HEADER_METHOD, http2.constants["HTTP2_METHOD_".concat((_options$method = options.method) === null || _options$method === void 0 ? void 0 : _options$method.toUpperCase())]), "Content-Type", "text/plain"), "Content-Length", buffer.length), "Accept", "*/*, image/*"), options === null || options === void 0 ? void 0 : options.headers)
                });
              case 12:
                if (!options.proxy) {
                  _context2.next = 21;
                  break;
                }
                _context2.t0 = https.Agent;
                _context2.next = 16;
                return this.proxyTunnel(options.url, options.proxy)["catch"](function (error) {
                  throw error;
                });
              case 16:
                _context2.t1 = _context2.sent;
                _context2.t2 = {
                  socket: _context2.t1,
                  keepAlive: true
                };
                options.agent = new _context2.t0(_context2.t2);
                _context2.next = 22;
                break;
              case 21:
                options.agent = new https.Agent(options);
              case 22:
                return _context2.abrupt("return", {
                  url: options.url,
                  payload: buffer,
                  request: _objectSpread2({
                    origin: parsed_url.origin,
                    href: parsed_url.href,
                    protocol: parsed_url.protocol || "https:",
                    hostname: parsed_url.hostname,
                    path: parsed_url.pathname + parsed_url.search || "/",
                    port: parsed_url.port || 443,
                    method: ((_options$method2 = options.method) === null || _options$method2 === void 0 ? void 0 : _options$method2.toUpperCase()) || "GET",
                    maxVersion: (options === null || options === void 0 ? void 0 : options.tlsVersion) || null,
                    timeout: options.timeout || 15000,
                    ciphers: (options === null || options === void 0 ? void 0 : options.ciphers) || null,
                    headers: _objectSpread2({
                      accept: "application/json, text/plain, image/*, */*",
                      "accept-language": "en-US,en;q=0.9",
                      "Content-Length": buffer.length
                    }, options === null || options === void 0 ? void 0 : options.headers)
                  }, options)
                });
              case 23:
                _context2.next = 28;
                break;
              case 25:
                _context2.prev = 25;
                _context2.t3 = _context2["catch"](1);
                throw _context2.t3;
              case 28:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this, [[1, 25]]);
        }));
        function parseOptions() {
          return _parseOptions.apply(this, arguments);
        }
        return parseOptions;
      }()
    }]);
    return RequestManager;
  }();
  var RequestManager$1 = new RequestManager();

  function HTTP() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
        var _parsed_options$paylo, parsed_options, req;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return RequestManager$1.parseOptions(options);
            case 3:
              parsed_options = _context2.sent;
              delete parsed_options.request.agent;
              if (parsed_options.request.port == 443) {
                delete parsed_options.request.port;
              }
              req = http.request(parsed_options.request, function (res) {
                var response_data = [];
                res.on("data", function (chunk) {
                  response_data.push(chunk);
                });
                res.on("end", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        res.status = res.statusCode;
                        _context.next = 3;
                        return RequestManager$1.parseResponseData(response_data, res.headers);
                      case 3:
                        res.data = _context.sent;
                        resolve(res);
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                })));
              }).on("error", function (error) {
                reject(error);
              });
              if (((_parsed_options$paylo = parsed_options.payload) === null || _parsed_options$paylo === void 0 ? void 0 : _parsed_options$paylo.length) > 0) req.write(parsed_options.payload);
              req.end();
              _context2.next = 14;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 11]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  function HTTPS(options) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
        var _parsed_options$paylo, parsed_options, req;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return RequestManager$1.parseOptions(options);
            case 3:
              parsed_options = _context2.sent;
              req = https.request(_objectSpread2({}, parsed_options.request), function (res) {
                var response_data = [];
                res.on("data", function (chunk) {
                  response_data.push(chunk);
                });
                res.on("end", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        res.status = res.statusCode;
                        _context.next = 3;
                        return RequestManager$1.parseResponseData(response_data, res.headers);
                      case 3:
                        res.data = _context.sent;
                        resolve(res);
                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                })));
              }).on("error", function (error) {
                reject(error);
              });
              if (((_parsed_options$paylo = parsed_options.payload) === null || _parsed_options$paylo === void 0 ? void 0 : _parsed_options$paylo.length) > 0) req.write(parsed_options.payload);
              req.end();
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  var HTTP2_HEADER_STATUS = http2.constants.HTTP2_HEADER_STATUS;
  function HTTP2(options) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
        var _parsed_options$paylo, parsed_options, clientSession, req, response_data, headers;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return RequestManager$1.parseOptions(options);
            case 3:
              parsed_options = _context2.sent;
              clientSession = http2.connect(new URL(parsed_options.url), _objectSpread2(_objectSpread2({}, parsed_options.client), {}, {
                peerMaxConcurrentStreams: Infinity
              }));
              clientSession.on("error", reject);
              req = clientSession.request(_objectSpread2({}, parsed_options.request));
              if (((_parsed_options$paylo = parsed_options.payload) === null || _parsed_options$paylo === void 0 ? void 0 : _parsed_options$paylo.length) > 0) req.write(parsed_options.payload);
              response_data = [];
              req.once("response", function (_headers) {
                headers = _headers;
              });
              req.on("data", function (chunk) {
                response_data.push(chunk);
              });
              req.on("error", function (error) {
                reject(error);
              });
              req.on("end", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      req.destroy();
                      clientSession.destroy();
                      _context.t0 = resolve;
                      _context.t1 = headers[HTTP2_HEADER_STATUS];
                      _context.t2 = headers;
                      _context.next = 7;
                      return RequestManager$1.parseResponseData(response_data, headers);
                    case 7:
                      _context.t3 = _context.sent;
                      _context.t4 = {
                        status: _context.t1,
                        headers: _context.t2,
                        data: _context.t3
                      };
                      (0, _context.t0)(_context.t4);
                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })));
              if (!req.readableEnded) req.end();
              _context2.next = 19;
              break;
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 16]]);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  var ciphers = ["TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256", "TLS_AES_128_GCM_SHA256", "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384", "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384", "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256", "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"].join(":");
  function Request() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var url = args.find(function (v) {
      return typeof v == "string";
    }) || "";
    var options = args.find(function (v) {
      return _typeof(v) == "object";
    }) || {};
    if (!(options !== null && options !== void 0 && options.url)) options.url = url;
    options.url.includes("http:") || options.url.includes("https:") ? null : options.url = "https://".concat(options.url);
    try {
      return options.http2 ? HTTP2(options) : options.url.includes("http:") ? HTTP(options) : HTTPS(options);
    } catch (error) {
      if (options !== null && options !== void 0 && options.retry && options.retry > 0) {
        options.retry--;
        return Request(options);
      } else {
        throw error;
      }
    }
  }
  Request.BETTER_CIPHERS = ciphers;

  var Session = /*#__PURE__*/function () {
    function Session() {
      var default_options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Session);
      this.default_options = default_options;
      this.cookies = "";
    }
    _createClass(Session, [{
      key: "req",
      value: function () {
        var _req = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _this$default_options,
            _len,
            args,
            _key,
            url,
            options,
            parsed_options,
            response,
            session_cookies,
            response_cookies,
            interweaving,
            str,
            _i,
            _Object$keys,
            key,
            _args = arguments;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args[_key];
                }
                url = args.find(function (v) {
                  return typeof v == "string";
                }) || "";
                options = args.find(function (v) {
                  return _typeof(v) == "object";
                }) || {};
                if (!(options !== null && options !== void 0 && options.url)) options.url = url;
                parsed_options = this.addCookiesInOptions(_objectSpread2(_objectSpread2(_objectSpread2({}, this.default_options), options), {}, {
                  headers: _objectSpread2(_objectSpread2({}, (_this$default_options = this.default_options) === null || _this$default_options === void 0 ? void 0 : _this$default_options.headers), options === null || options === void 0 ? void 0 : options.headers)
                }));
                _context.next = 8;
                return Request(parsed_options);
              case 8:
                response = _context.sent;
                _context.prev = 9;
                if (response.headers["set-cookie"]) {
                  if (this.cookies) {
                    session_cookies = this.json();
                    response_cookies = this.json(response.headers["set-cookie"].map(function (c) {
                      return c.split(";")[0];
                    }).join("; "));
                    interweaving = _objectSpread2(_objectSpread2({}, session_cookies), response_cookies);
                    str = "";
                    for (_i = 0, _Object$keys = Object.keys(interweaving); _i < _Object$keys.length; _i++) {
                      key = _Object$keys[_i];
                      str += "".concat(key, "=").concat(interweaving[key], "; ");
                    }
                    this.cookies = str.slice(0, -2);
                  } else {
                    this.cookies = response.headers["set-cookie"].map(function (c) {
                      return c.split(";")[0];
                    }).join("; ");
                  }
                }
                _context.next = 16;
                break;
              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](9);
                throw _context.t0;
              case 16:
                return _context.abrupt("return", response);
              case 19:
                _context.prev = 19;
                _context.t1 = _context["catch"](0);
                throw _context.t1;
              case 22:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[0, 19], [9, 13]]);
        }));
        function req() {
          return _req.apply(this, arguments);
        }
        return req;
      }()
    }, {
      key: "addCookie",
      value: function addCookie(cookie) {
        if (_typeof(cookie) == "object") {
          if (this.cookies.includes(cookie.name)) {
            return false;
          } else if (this.cookies) {
            this.cookies += "; ".concat(cookie.name, "=").concat(cookie.value);
            return true;
          } else {
            this.cookies = "".concat(cookie.name, "=").concat(cookie.value);
            return true;
          }
        } else {
          if (this.cookies.includes(cookie.split("=")[0])) {
            return false;
          } else if (this.cookies) {
            this.cookies += "; ".concat(cookie.trim());
            return true;
          } else {
            this.cookies = "".concat(cookie.trim());
            return true;
          }
        }
      }
    }, {
      key: "removeCookie",
      value: function removeCookie(cookie_name) {
        if (this.cookies.includes(cookie_name)) {
          this.cookies = this.cookies.replace(this.cookies.slice(this.cookies.indexOf(cookie_name)).split(" ")[0], "");
          return true;
        } else return false;
      }
    }, {
      key: "addCookiesInOptions",
      value: function addCookiesInOptions(options) {
        if (this.cookies) {
          var _options$headers;
          if (options.headers && (_options$headers = options.headers) !== null && _options$headers !== void 0 && _options$headers.cookie) {
            options.headers.cookie += "; " + this.cookies;
          } else {
            options.headers.cookie = this.cookies;
          }
        }
        return options;
      }
    }, {
      key: "json",
      value: function json(str) {
        var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var object = {};
        var _iterator = _createForOfIteratorHelper((str || this.cookies).split("; ")),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var cookie = _step.value;
            var _cookie$split = cookie.split("="),
              _cookie$split2 = _toArray(_cookie$split),
              name = _cookie$split2[0],
              value = _cookie$split2.slice(1);
            if (name) {
              object[name] = encode ? encodeURIComponent(value.join("=")) : value.join("=");
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return object;
      }
    }]);
    return Session;
  }();

  ["get", "post", "patch", "options", "delete", "head", "put", "link", "unlink", "purge"].forEach(function (method) {
    Request[method] = function (options) {
      return Request(_objectSpread2(_objectSpread2({}, options), {}, {
        method: method
      }));
    };
  });
  Request.Session = Session;
  assert.equal(Request.Session, Session);
  var request = Request;

  return request;

}));
//# sourceMappingURL=krop.js.map
