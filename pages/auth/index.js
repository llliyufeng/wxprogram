// pages/auth/index.js
// https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin

import { request } from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/asyncWX.js";
Page({
  async handleGetUserInfo(e) {
    // 获取用户信息
    const { encryptedData, errMsg, iv, rawData } = e.detail;
    // 获取小程序登录成功后的code值
    const code = await login();
    // 发送请求 获取用户token值
    const loginParams = { encryptedData, errMsg, iv, rawData, code };
    // const { token } = await request({
    //   url: "/users/wxlogin",
    //   data: loginParams,
    //   method: "post",
    // });
    // 因为获取不到 所以模拟一个token

    // 把token存入缓存中
    wx.setStorageSync(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    );
    // 成功之后跳回去
    wx.navigateBack({
      // 返回上一层 2为上两层
      delta: 1,
    });
  },
});
