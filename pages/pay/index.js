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

import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/request.js";

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    // 获取缓存中的地址
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤出checked属性 提取出选择的商品
    cart = cart.filter((v) => v.checked);
    address.all =
      address.provinceName +
      address.cityName +
      address.countyName +
      address.detailInfo;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      totalPrice += v.goods_price * v.num;
      totalNum += v.num;
    });
    // 设置data数据
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
    wx.setStorageSync("cart", cart);
  },
  async handleOrderPay() {
    wx.setStorageSync(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    );
    // 判断缓存中有无token
    const token = wx.getStorageSync("token");
    if (!token) {
      // 不存在就跳转页面
      wx.navigateTo({
        url: "/pages/auth/index",
      });
      // 返回
      return;
    }

    console.log("Yijing cunzai ");

    // 创建订单
    // 准备请求头
    const header = { Authorization: token };
    // 准备请求体参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    let cart = this.data.cart;
    let goods = [];
    cart.forEach((v) =>
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.goods_num,
        goods_price: v.goods_price,
      })
    );
    const orderParams = { order_price, consignee_addr, goods };
    // 准备发送请求 创建订单 获取订单编号
    const res = await request({
      url: "/my/orders/create",
      method: "post",
      data: orderParams,
      header,
    });
    console.log(res);
  },
});
