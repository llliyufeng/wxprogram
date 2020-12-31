"use strict";

var _request = require("../../request/request.js");

var _runtime = _interopRequireDefault(require("../../lib/runtime/runtime"));

var _asyncWX = require("../../utils/asyncWX.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// pages/auth/index.js
// https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin
Page({
  handleGetUserInfo: function handleGetUserInfo(e) {
    var _e$detail, encryptedData, errMsg, iv, rawData, code, loginParams;

    return _runtime["default"].async(function handleGetUserInfo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 获取用户信息
            _e$detail = e.detail, encryptedData = _e$detail.encryptedData, errMsg = _e$detail.errMsg, iv = _e$detail.iv, rawData = _e$detail.rawData; // 获取小程序登录成功后的code值

            _context.next = 3;
            return _runtime["default"].awrap((0, _asyncWX.login)());

          case 3:
            code = _context.sent;
            // 发送请求 获取用户token值
            loginParams = {
              encryptedData: encryptedData,
              errMsg: errMsg,
              iv: iv,
              rawData: rawData,
              code: code
            }; // const { token } = await request({
            //   url: "/users/wxlogin",
            //   data: loginParams,
            //   method: "post",
            // });
            // 因为获取不到 所以模拟一个token
            // 把token存入缓存中

            wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"); // 成功之后跳回去

            wx.navigateBack({
              // 返回上一层 2为上两层
              delta: 1
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
});
//# sourceMappingURL=index.dev.js.map
