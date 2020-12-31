import { request } from "../../request/request.js";
//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    navList: [],
    // 楼层数组
    floorList: [],
  },
  //页面开始加载触发的生命周期事件
  onLoad: function (options) {
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
  getSwiperData() {
    request({
      url: "/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperList: result,
      });
    });
  },
  getNavData() {
    request({
      url: "/home/catitems",
    }).then((result) => {
      this.setData({
        navList: result,
      });
    });
  },
  getFloorData() {
    request({
      url: "/home/floordata",
    }).then((result) => {
      this.setData({
        floorList: result,
      });
    });
  },
});
