"use strict";

// pages/login/index.js
Page({
  handleGetUserInfo: function handleGetUserInfo(e) {
    var userInfo = e.detail.userInfo;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
});
//# sourceMappingURL=index.dev.js.map
