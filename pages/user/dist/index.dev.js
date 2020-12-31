"use strict";

// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },
  onShow: function onShow() {
    var userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo: userinfo
    });
  }
});
//# sourceMappingURL=index.dev.js.map
