// Krop v0.1.6 Copyright (c) 2023 Kori <korinamez@gmail.com> and contributors
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('http'), require('https'), require('http2'), require('assert')) :
  typeof define === 'function' && define.amd ? define(['http', 'https', 'http2', 'assert'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.krop = factory(global.http, global.https, global.http2, global.assert));
})(this, (function (http, https, http2, assert) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
      Object.defineProperty(target, descriptor.key, descriptor);
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
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
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
            maxVersion: "TLSv1.3",
            path: "".concat(urlParsed.hostname, ":").concat(urlParsed.port ? urlParsed.port : 443),
            timeout: timeout,
            headers: headers
          }).on("connect", function (response, socket) {
            if (response.statusCode == 200) {
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
      key: "parseResponseData",
      value: function parseResponseData(arr_data, headers) {
        var buffer = Buffer.concat(arr_data);
        var data;
        try {
          data = JSON.parse(buffer.toString());
        } catch (error) {
          if (headers["content-type"] && this.midia_types.some(function (type) {
            return headers["content-type"].includes(type);
          })) {
            data = buffer;
          } else {
            data = buffer.toString();
          }
        }
        return data;
      }
    }, {
      key: "parseOptions",
      value: function () {
        var _parseOptions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var options,
            parsed_url,
            buffer,
            _options$method,
            _objectSpread2$1,
            _options$method2,
            _args = arguments;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                  parsed_url = new URL(options.url);
                  buffer = Buffer.from(_typeof(options.payload) == "object" ? JSON.stringify(options.payload) : typeof options.payload != "string" && options.payload ? String(options.payload) : options.payload || "");
                  if (!options.http2) {
                    _context.next = 11;
                    break;
                  }
                  if (!options.proxy) {
                    _context.next = 8;
                    break;
                  }
                  _context.next = 7;
                  return this.proxyTunnel(options.url, options.proxy);
                case 7:
                  options.socket = _context.sent;
                case 8:
                  return _context.abrupt("return", {
                    url: options.url,
                    payload: buffer,
                    client: {
                      maxVersion: "TLSv1.3",
                      ALPNProtocols: ["h2", "http/1.1"],
                      socket: options.socket
                    },
                    request: _objectSpread2((_objectSpread2$1 = {}, _defineProperty(_objectSpread2$1, HTTP2_HEADER_AUTHORITY, parsed_url.host), _defineProperty(_objectSpread2$1, HTTP2_HEADER_PATH, parsed_url.pathname + parsed_url.search || "/"), _defineProperty(_objectSpread2$1, HTTP2_HEADER_SCHEME, parsed_url.protocol.split(":")[0]), _defineProperty(_objectSpread2$1, HTTP2_HEADER_METHOD, http2.constants["HTTP2_METHOD_".concat((_options$method = options.method) === null || _options$method === void 0 ? void 0 : _options$method.toUpperCase())]), _defineProperty(_objectSpread2$1, "Content-Type", options !== null && options !== void 0 && options.headers && options !== null && options !== void 0 && options.headers["Content-Type"] ? options === null || options === void 0 ? void 0 : options.headers["Content-Type"] : "text/plain"), _defineProperty(_objectSpread2$1, "Content-Length", buffer.length), _defineProperty(_objectSpread2$1, "Accept", "*/*, image/*"), _objectSpread2$1), options === null || options === void 0 ? void 0 : options.headers)
                  });
                case 11:
                  if (!options.proxy) {
                    _context.next = 20;
                    break;
                  }
                  _context.t0 = https.Agent;
                  _context.next = 15;
                  return this.proxyTunnel(options.url, options.proxy)["catch"](function (error) {
                    throw error;
                  });
                case 15:
                  _context.t1 = _context.sent;
                  _context.t2 = {
                    socket: _context.t1,
                    keepAlive: true
                  };
                  options.agent = new _context.t0(_context.t2);
                  _context.next = 21;
                  break;
                case 20:
                  options.agent = new https.Agent(options);
                case 21:
                  return _context.abrupt("return", {
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
                      maxVersion: "TLSv1.3",
                      timeout: options.timeout || 15000,
                      headers: _objectSpread2({
                        accept: "application/json, text/plain, image/*, */*",
                        "accept-language": "en-US,en;q=0.9",
                        "Content-Length": buffer.length
                      }, options === null || options === void 0 ? void 0 : options.headers)
                    }, options)
                  });
                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
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
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
        var _parsed_options$paylo;
        var parsed_options, req;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return RequestManager$1.parseOptions(options);
              case 2:
                parsed_options = _context.sent;
                delete parsed_options.request.agent;
                if (parsed_options.request.port == 443) {
                  delete parsed_options.request.port;
                }
                req = http.request(parsed_options.request, function (res) {
                  var response_data = [];
                  res.on("data", function (chunk) {
                    response_data.push(chunk);
                  });
                  res.on("end", function () {
                    res.status = res.statusCode;
                    res.data = RequestManager$1.parseResponseData(response_data, res.headers);
                    resolve(res);
                  });
                }).on("error", function (error) {
                  reject(error);
                });
                if (((_parsed_options$paylo = parsed_options.payload) === null || _parsed_options$paylo === void 0 ? void 0 : _parsed_options$paylo.length) > 0) req.write(parsed_options.payload);
                req.end();
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  function HTTPS(options) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
        var _parsed_options$paylo;
        var parsed_options, req;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return RequestManager$1.parseOptions(options);
              case 2:
                parsed_options = _context.sent;
                req = https.request(parsed_options.request, function (res) {
                  var response_data = [];
                  res.on("data", function (chunk) {
                    response_data.push(chunk);
                  });
                  res.on("end", function () {
                    res.status = res.statusCode;
                    res.data = RequestManager$1.parseResponseData(response_data, res.headers);
                    resolve(res);
                  });
                }).on("error", function (error) {
                  reject(error);
                });
                if (((_parsed_options$paylo = parsed_options.payload) === null || _parsed_options$paylo === void 0 ? void 0 : _parsed_options$paylo.length) > 0) req.write(parsed_options.payload);
                req.end();
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  var HTTP2_HEADER_STATUS = http2.constants.HTTP2_HEADER_STATUS;
  function HTTP2(options) {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve) {
        var _parsed_options$paylo;
        var parsed_options, clientSession, req;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return RequestManager$1.parseOptions(options);
              case 2:
                parsed_options = _context.sent;
                clientSession = http2.connect(new URL(parsed_options.url), parsed_options.client);
                req = clientSession.request(parsed_options.request);
                req.on("response", function (headers) {
                  var response_data = [];
                  req.on("data", function (chunk) {
                    response_data.push(chunk);
                  });
                  req.on("end", function () {
                    req.close();
                    clientSession.close();
                    resolve({
                      status: headers[HTTP2_HEADER_STATUS],
                      headers: headers,
                      data: RequestManager$1.parseResponseData(response_data, headers)
                    });
                  });
                });
                if (((_parsed_options$paylo = parsed_options.payload) === null || _parsed_options$paylo === void 0 ? void 0 : _parsed_options$paylo.length) > 0) req.write(parsed_options.payload);
                req.end();
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

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
    return options.http2 ? HTTP2(options) : options.url.includes("http:") ? HTTP(options) : HTTPS(options);
  }

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
          var _this$default_options;
          var _len,
            args,
            _key,
            url,
            options,
            parsed_options,
            response,
            _args = arguments;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
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
                  _context.next = 7;
                  return Request(parsed_options);
                case 7:
                  response = _context.sent;
                  try {
                    if (response.headers["set-cookie"]) {
                      if (this.cookies) this.cookies += "; " + response.headers["set-cookie"].map(function (c) {
                        return c.split(";")[0];
                      }).join("; ");else this.cookies = response.headers["set-cookie"].map(function (c) {
                        return c.split(";")[0];
                      }).join("; ");
                    }
                  } catch (error) {}
                  return _context.abrupt("return", response);
                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
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
      value: function json() {
        var object = {};
        var _iterator = _createForOfIteratorHelper(this.cookies.split("; ")),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var cookie = _step.value;
            var _cookie$split = cookie.split("="),
              _cookie$split2 = _toArray(_cookie$split),
              name = _cookie$split2[0],
              value = _cookie$split2.slice(1);
            if (name) {
              object[name] = value.join("=");
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
