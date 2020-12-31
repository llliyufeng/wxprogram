import { request } from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    MenuList: [],
    MenuDetail: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  CartData: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCartData();
    //判断本地存储中有无旧数据 如果没有就发送新请求
    // 如果有旧的数据 就判断是否过期 没有过期就使用

    // 获取本地存储的数据
    const CartData = wx.getStorageSync("cartData");
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
        let MenuList = this.CartData.map((v) => v.cat_name);
        // 右侧
        let MenuDetail = this.CartData[0].children;

        this.setData({
          MenuList,
          MenuDetail,
        });
      }
    }
  },
  async getCartData() {
    // request({
    //   url: "/categories",
    // }).then((res) => {
    //   this.CartData = res.data.message;
    //   // 在此处可以确定数据已经返回来了
    //   // 把接口的数据存入到本地存储中
    //   wx.setStorageSync("cartData", { time: Date.now(), data: this.CartData });
    //   // wx.getStorage({
    //   //   key: "cartData",
    //   //   success(res) {
    //   //     console.log(res.data);
    //   //   },
    //   // });
    //   // 把数据存储在
    //   // 左侧菜单信息
    //   let MenuList = this.CartData.map((v) => v.cat_name);
    //   // 右侧
    //   let MenuDetail = this.CartData[0].children;
    //   this.setData({
    //     MenuList,
    //     MenuDetail,
    //   });
    // });
    // 使用es7的async和await来发请求
    const res = await request({ url: "/categories" });
    this.CartData = res;
    wx.setStorageSync("cartData", { time: Date.now(), data: this.CartData });
    let MenuList = this.CartData.map((v) => v.cat_name);
    let MenuDetail = this.CartData[0].children;
    this.setData({
      MenuList,
      MenuDetail,
    });
  },
  handleMenuList(e) {
    let { index } = e.currentTarget.dataset;
    let MenuDetail = this.CartData[index].children;
    this.setData({
      currentIndex: index,
      MenuDetail,
      scrollTop: 0,
    });

    // 重新设置scrollView标签的距离顶部的距离： scrollTop
  },
});
