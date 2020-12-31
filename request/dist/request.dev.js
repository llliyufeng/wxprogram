"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reqTimes = 0;

var request = function request(params) {
  reqTimes++; // 显示加载中

  wx.showLoading({
    title: "加载中"
  }); // 定义公共的url

  var baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise(function (resolve, reject) {
    wx.request(_objectSpread({}, params, {
      url: baseURL + params.url,
      success: function success(result) {
        resolve(result.data.message); // wx.hideLoading();
      },
      fail: function fail(err) {
        reject(err);
      },
      complete: function complete() {
        reqTimes--;

        if (reqTimes === 0) {
          // 关闭正在等待的图标
          wx.hideLoading();
        }
      }
    }));
  });
};

exports.request = request;
//# sourceMappingURL=request.dev.js.map
