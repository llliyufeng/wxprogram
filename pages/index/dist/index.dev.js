"use strict";

var _request = require("../../request/request.js");

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    navList: [],
    // 楼层数组
    floorList: []
  },
  //页面开始加载触发的生命周期事件
  onLoad: function onLoad(options) {
    // 发送异步请求来获取轮播图数据
    // var reqTask = wx.request({
    //   url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message,
    //     });
    //   },
    //   fail: () => {},
    //   complete: () => {},
    // });
    this.getSwiperData();
    this.getNavData();
    this.getFloorData();
  },
  getSwiperData: function getSwiperData() {
    var _this = this;

    (0, _request.request)({
      url: "/home/swiperdata"
    }).then(function (result) {
      _this.setData({
        swiperList: result
      });
    });
  },
  getNavData: function getNavData() {
    var _this2 = this;

    (0, _request.request)({
      url: "/home/catitems"
    }).then(function (result) {
      _this2.setData({
        navList: result
      });
    });
  },
  getFloorData: function getFloorData() {
    var _this3 = this;

    (0, _request.request)({
      url: "/home/floordata"
    }).then(function (result) {
      _this3.setData({
        floorList: result
      });
    });
  }
});
//# sourceMappingURL=index.dev.js.map
