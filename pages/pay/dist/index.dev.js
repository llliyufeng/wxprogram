"use strict";

var _runtime = _interopRequireDefault(require("../../lib/runtime/runtime"));

var _request = require("../../request/request.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
  支付页面业务逻辑分析：
  页面加载的时候
    从缓存中获取购物车数据 渲染到页面中(checked为true)
  微信支付
    企业账号
    企业账号的后台中必须给开发者添加到白名单
      一个appid可以绑定多个开发者 这些开发者就可以共用appid和开发权限了
  支付流程
    创建订单(获取订单编号) -> 准备预支付(获取支付参数) -> 发起微信支付(提交参数) -> 查询订单
  支付按钮
    先判断缓存中是否有token
    没有 跳转页面授权 进行获取token
    有token 进行剩下的逻辑
 */
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function onShow() {
    // 获取缓存中的地址
    var address = wx.getStorageSync("address"); // 获取缓存中的购物车数据

    var cart = wx.getStorageSync("cart") || []; // 过滤出checked属性 提取出选择的商品

    cart = cart.filter(function (v) {
      return v.checked;
    });
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    var totalPrice = 0;
    var totalNum = 0;
    cart.forEach(function (v) {
      totalPrice += v.goods_price * v.num;
      totalNum += v.num;
    }); // 设置data数据

    this.setData({
      cart: cart,
      totalPrice: totalPrice,
      totalNum: totalNum,
      address: address
    });
    wx.setStorageSync("cart", cart);
  },
  handleOrderPay: function handleOrderPay() {
    var token, header, order_price, consignee_addr, cart, goods, orderParams, res;
    return _runtime["default"].async(function handleOrderPay$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"); // 判断缓存中有无token

            token = wx.getStorageSync("token");

            if (token) {
              _context.next = 5;
              break;
            }

            // 不存在就跳转页面
            wx.navigateTo({
              url: "/pages/auth/index"
            }); // 返回

            return _context.abrupt("return");

          case 5:
            console.log("Yijing cunzai "); // 创建订单
            // 准备请求头

            header = {
              Authorization: token
            }; // 准备请求体参数

            order_price = this.data.totalPrice;
            consignee_addr = this.data.address.all;
            cart = this.data.cart;
            goods = [];
            cart.forEach(function (v) {
              return goods.push({
                goods_id: v.goods_id,
                goods_number: v.goods_num,
                goods_price: v.goods_price
              });
            });
            orderParams = {
              order_price: order_price,
              consignee_addr: consignee_addr,
              goods: goods
            }; // 准备发送请求 创建订单 获取订单编号

            _context.next = 15;
            return _runtime["default"].awrap((0, _request.request)({
              url: "/my/orders/create",
              method: "post",
              data: orderParams,
              header: header
            }));

          case 15:
            res = _context.sent;
            console.log(res);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  }
});
//# sourceMappingURL=index.dev.js.map
