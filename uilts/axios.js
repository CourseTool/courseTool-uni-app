import axios from "axios";
import qs from "qs";

// axios二次封装
import mpAdapter from "axios-miniprogram-adapter";
axios.defaults.adapter = mpAdapter;

class HttpRequest {
    constructor() {
        // this.baseURL = "https://127.0.0.1:9001"
        // this.baseURL = "https://www.course.pink:9001"
        // this.baseURL = "https://www.zrzh.online:3000";
        this.baseURL = "http://127.0.0.1:3000";
        // this.baseURL = "https://www.chenjue.online:3000"
        this.timeout = 10000;
    }
    mergeOptions(options) {
        return {
            baseURL: this.baseURL,
            timeout: this.timeout,
            ...options,
        };
    }
    request(options) {
        const instance = axios.create();
        const opts = this.mergeOptions(options);
        return instance(opts);
    }
    get(url, data = {}, outHeaders = {}) {
        return this.request({
            dataType: "json",
            method: "get",
            url,
            params: {
                ...data,
            }, // get参数可以直接展开
            headers: {},
        });
    }
    post(url, data = {}, outHeaders = {}) {
        return this.request({
            method: "post",
            url,
            data: qs.stringify(data), // post要求必须传入data属性
            headers: {},
        });
    }
}

const request = new HttpRequest();

export default request;
