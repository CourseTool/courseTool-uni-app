"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.axios.defaults.adapter = common_vendor.mpAdapter;
class HttpRequest {
  constructor() {
    this.baseURL = "http://127.0.0.1:3000";
    this.timeout = 1e4;
  }
  mergeOptions(options) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    };
  }
  request(options) {
    const instance = common_vendor.axios.create();
    const opts = this.mergeOptions(options);
    return instance(opts);
  }
  get(url, data = {}, outHeaders = {}) {
    return this.request({
      dataType: "json",
      method: "get",
      url,
      params: {
        ...data
      },
      // get参数可以直接展开
      headers: {}
    });
  }
  post(url, data = {}, outHeaders = {}) {
    return this.request({
      method: "post",
      url,
      data: common_vendor.qs.stringify(data),
      // post要求必须传入data属性
      headers: {}
    });
  }
}
const request = new HttpRequest();
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/uilts/axios.js.map
