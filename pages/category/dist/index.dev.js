"use strict";

var _request = require("../../request/request.js");

var _runtime = _interopRequireDefault(require("../../lib/runtime/runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Page({
  /**
   * 页面的初始数据
   */
  data: {
    MenuList: [],
    MenuDetail: [],
    currentIndex: 0,
    scrollTop: 0
  },
  CartData: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    // this.getCartData();
    //判断本地存储中有无旧数据 如果没有就发送新请求
    // 如果有旧的数据 就判断是否过期 没有过期就使用
    // 获取本地存储的数据
    var CartData = wx.getStorageSync("cartData");

    if (!CartData) {
      // 不存在 发送请求获取数据
      this.getCartData();
      console.log("不存在");
    } else {
      // 有旧的数据 定义过期时间
      if (Date.now() - CartData.time > 1000 * 10) {
        // 重新发送请求
        this.getCartData();
        console.log("不能使用旧的数据");
      } else {
        // 可以使用旧数据
        console.log("可以使用旧数据");
        this.CartData = CartData.data;
        console.log(this.CartData);
        var MenuList = this.CartData.map(function (v) {
          return v.cat_name;
        }); // 右侧

        var MenuDetail = this.CartData[0].children;
        this.setData({
          MenuList: MenuList,
          MenuDetail: MenuDetail
        });
      }
    }
  },
  getCartData: function getCartData() {
    var res, MenuList, MenuDetail;
    return _runtime["default"].async(function getCartData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _runtime["default"].awrap((0, _request.request)({
              url: "/categories"
            }));

          case 2:
            res = _context.sent;
            this.CartData = res;
            wx.setStorageSync("cartData", {
              time: Date.now(),
              data: this.CartData
            });
            MenuList = this.CartData.map(function (v) {
              return v.cat_name;
            });
            MenuDetail = this.CartData[0].children;
            this.setData({
              MenuList: MenuList,
              MenuDetail: MenuDetail
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  handleMenuList: function handleMenuList(e) {
    var index = e.currentTarget.dataset.index;
    var MenuDetail = this.CartData[index].children;
    this.setData({
      currentIndex: index,
      MenuDetail: MenuDetail,
      scrollTop: 0
    }); // 重新设置scrollView标签的距离顶部的距离： scrollTop
  }
});
//# sourceMappingURL=index.dev.js.map
