"use strict";

var _request = require("../../request/request.js");

var _runtime = _interopRequireDefault(require("../../lib/runtime/runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
本页面实现逻辑：
1 发送请求和数据
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api previewImage
3 点击加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式
  3 先判断 当前的商品是否存在于购物车
  4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个元素 新元素带上num属性 重新把购物车数组填充回缓存中
  6 弹出添加提示


 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {}
  },
  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  // https://api-hmugo-web.itheima.net/api/public/v1/goods/detail
  getGoodsDetail: function getGoodsDetail(goods_id) {
    var goodsData;
    return _runtime["default"].async(function getGoodsDetail$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _runtime["default"].awrap((0, _request.request)({
              url: "/goods/detail",
              data: {
                goods_id: goods_id
              }
            }));

          case 2:
            goodsData = _context.sent;
            this.goodsInfo = goodsData;
            this.setData({
              goodsData: {
                goods_name: goodsData.goods_name,
                goods_price: goodsData.goods_price,
                goods_introduce: goodsData.goods_introduce,
                pics: goodsData.pics
              }
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  // 绑定点击事件
  handlePreviewImage: function handlePreviewImage(e) {
    var urls, current;
    return _runtime["default"].async(function handlePreviewImage$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 先构造要预览的图片数组
            urls = this.goodsInfo.pics.map(function (v) {
              return v.pics_mid;
            });
            current = e.currentTarget.dataset.url;
            wx.previewImage({
              current: current,
              urls: urls
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  },
  // 点击加入购物车
  // 3 点击加入购物车
  // 1 先绑定点击事件
  // 2 获取缓存中的购物车数据 数组格式
  // 3 先判断 当前的商品是否存在于购物车
  // 4 已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中
  // 5 不存在于购物车的数组中 直接给购物车数组添加一个元素 新元素带上num属性 重新把购物车数组填充回缓存中
  // 6 弹出添加提示
  handleCartAdd: function handleCartAdd() {
    var _this = this;

    // 2 获取缓存中的购物车数据 数组格式
    var cart = wx.getStorageSync("cart") || []; // 3 先判断 当前的商品是否存在于购物车
    // findIndex
    // findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
    // findIndex() 方法为数组中的每个元素都调用一次函数执行：
    // 当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
    // 如果没有符合条件的元素返回 -1

    var index = cart.findIndex(function (v) {
      return v.goods_id === _this.goodsInfo.goods_id;
    });

    if (index === -1) {
      // 不存在 第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      // 存在
      cart[index].num++;
    } // 重新把购物车数组填充回缓存中;


    wx.setStorageSync("cart", cart); // 弹窗提示

    wx.showToast({
      title: "加入成功",
      icon: "success",
      // true防止用户手抖 如果为true 默认时间后触发
      mask: true
    });
  }
});
//# sourceMappingURL=index.dev.js.map
