import {
  __commonJS,
  __toESM
} from "./chunk-ZS7NZCD4.js";

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === "object" && typeof val === "object") {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function deepMerge() {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === "object" && typeof val === "object") {
          result[key] = deepMerge(result[key], val);
        } else if (typeof val === "object") {
          result[key] = deepMerge({}, val);
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      deepMerge,
      extend,
      trim
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/createError.js"(exports, module) {
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError2(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var createError2 = require_createError();
    module.exports = function settle2(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError2(
          "Request failed with status code " + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils2 = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL2(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils2.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils2.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils2.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils2.forEach(val, function parseValue(v) {
            if (utils2.isDate(v)) {
              v = v.toISOString();
            } else if (utils2.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath2(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// ../../../../../../Users/zhangrui/Library/Mobile Documents/com~apple~CloudDocs/Desktop/桌面/WeChatApp/course-wechat/node_modules/axios-miniprogram-adapter/dist/index.esm.js
var import_utils = __toESM(require_utils());
var import_settle = __toESM(require_settle());
var import_buildURL = __toESM(require_buildURL());
var import_buildFullPath = __toESM(require_buildFullPath());
var import_createError = __toESM(require_createError());
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function encoder(input) {
  var str = String(input);
  var block;
  var charCode;
  var idx = 0;
  var map = chars;
  var output = "";
  for (
    ;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = "=", idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 255) {
      throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }
    block = block << 8 | charCode;
  }
  return output;
}
var platFormName = "wechat";
function getRequest() {
  switch (true) {
    case typeof wx === "object":
      platFormName = "wechat";
      return wx.request.bind(wx);
    case typeof swan === "object":
      platFormName = "baidu";
      return swan.request.bind(swan);
    case typeof dd === "object":
      platFormName = "dd";
      return dd.httpRequest.bind(dd);
    case typeof my === "object":
      platFormName = "alipay";
      return (my.request || my.httpRequest).bind(my);
    default:
      return wx.request.bind(wx);
  }
}
function transformResponse(mpResponse, config, mpRequestOption) {
  var headers = mpResponse.header || mpResponse.headers;
  var status = mpResponse.statusCode || mpResponse.status;
  var statusText = "";
  if (status === 200) {
    statusText = "OK";
  } else if (status === 400) {
    statusText = "Bad Request";
  }
  var response = {
    data: mpResponse.data,
    status,
    statusText,
    headers,
    config,
    request: mpRequestOption
  };
  return response;
}
function transformError(error, reject, config) {
  switch (platFormName) {
    case "wechat":
      if (error.errMsg.indexOf("request:fail abort") !== -1) {
        reject((0, import_createError.default)("Request aborted", config, "ECONNABORTED", ""));
      } else if (error.errMsg.indexOf("timeout") !== -1) {
        reject((0, import_createError.default)("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", ""));
      } else {
        reject((0, import_createError.default)("Network Error", config, null, ""));
      }
      break;
    case "dd":
    case "alipay":
      if ([14, 19].includes(error.error)) {
        reject((0, import_createError.default)("Request aborted", config, "ECONNABORTED", "", error));
      } else if ([13].includes(error.error)) {
        reject((0, import_createError.default)("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", "", error));
      } else {
        reject((0, import_createError.default)("Network Error", config, null, "", error));
      }
      break;
    case "baidu":
      reject((0, import_createError.default)("Network Error", config, null, ""));
      break;
  }
}
function transformConfig(config) {
  var _a;
  if ([
    "alipay",
    "dd"
    /* 钉钉 */
  ].includes(platFormName)) {
    config.headers = config.header;
    delete config.header;
    if ("dd" === platFormName && config.method !== "GET" && ((_a = config.headers) === null || _a === void 0 ? void 0 : _a["Content-Type"]) === "application/json" && Object.prototype.toString.call(config.data) === "[object Object]") {
      config.data = JSON.stringify(config.data);
    }
  }
  return config;
}
var isJSONstr = function(str) {
  try {
    return typeof str === "string" && str.length && (str = JSON.parse(str)) && Object.prototype.toString.call(str) === "[object Object]";
  } catch (error) {
    return false;
  }
};
function mpAdapter(config, _a) {
  var _b = (_a === void 0 ? {} : _a).transformRequestOption, transformRequestOption = _b === void 0 ? function(requestOption) {
    return requestOption;
  } : _b;
  var request = getRequest();
  return new Promise(function(resolve, reject) {
    var requestTask;
    var requestData = config.data;
    var requestHeaders = config.headers;
    var requestMethod = config.method && config.method.toUpperCase() || "GET";
    var mpRequestOption = {
      method: requestMethod,
      url: (0, import_buildURL.default)((0, import_buildFullPath.default)(config.baseURL, config.url), config.params, config.paramsSerializer),
      timeout: config.timeout,
      // Listen for success
      success: function(mpResponse) {
        var response = transformResponse(mpResponse, config, mpRequestOption);
        (0, import_settle.default)(resolve, reject, response);
      },
      // Handle request Exception
      fail: function(error) {
        transformError(error, reject, config);
      },
      complete: function() {
        requestTask = void 0;
      }
    };
    if (config.auth) {
      var _a2 = [config.auth.username || "", config.auth.password || ""], username = _a2[0], password = _a2[1];
      requestHeaders.Authorization = "Basic " + encoder(username + ":" + password);
    }
    import_utils.default.forEach(requestHeaders, function setRequestHeader(val, key) {
      var _header = key.toLowerCase();
      if (typeof requestData === "undefined" && _header === "content-type" || _header === "referer") {
        delete requestHeaders[key];
      }
    });
    mpRequestOption.header = requestHeaders;
    if (config.responseType) {
      mpRequestOption.responseType = config.responseType;
    }
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!requestTask) {
          return;
        }
        requestTask.abort();
        reject(cancel);
        requestTask = void 0;
      });
    }
    if (isJSONstr(requestData)) {
      requestData = JSON.parse(requestData);
    }
    if (requestData !== void 0) {
      mpRequestOption.data = requestData;
    }
    requestTask = request(transformRequestOption(transformConfig(mpRequestOption)));
  });
}
var index_esm_default = mpAdapter;
export {
  index_esm_default as default
};
/*! Bundled license information:

axios-miniprogram-adapter/dist/index.esm.js:
  (*!
   * axios-miniprogram-adapter 0.3.5 (https://github.com/bigMeow/axios-miniprogram-adapter)
   * API https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/doc/api.md
   * Copyright 2018-2022 bigMeow. All Rights Reserved
   * Licensed under MIT (https://github.com/bigMeow/axios-miniprogram-adapter/blob/master/LICENSE)
   *)
*/
//# sourceMappingURL=axios-miniprogram-adapter.js.map
