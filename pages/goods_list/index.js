import { request } from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      },
    ],
    goodList: [],
    totalPage: "",
  },

  // 接口要的参数
  Queryparams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Queryparams.cid = options.cid;
    this.getGoodList();
  },

  handleTabsItemChange(e) {
    const { index } = e.detail;
    // 修改原数组
    const { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? (v.isActive = true) : (v.isActive = false);
    });
    this.setData({
      tabs,
    });
  },
  // 获取商品列表数据
  async getGoodList() {
    const res = await request({ url: "/goods/search", data: this.Queryparams });
    let pagenum = 1;
    let total = res.total;
    this.totalPage = Math.ceil(total / this.Queryparams.pagesize);
    this.setData({
      // 拼接的数组旧+新1
      goodList: [...this.data.goodList, ...res.goods],
    });
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    // console.log("触底");
    if (this.Queryparams.pagenum >= this.totalPage) {
      wx.showToast({
        title: "没有下一页了",
      });
    } else {
      this.Queryparams.pagenum++;
      this.getGoodList();
    }
  },
  onPullDownRefresh() {
    // 重置数据
    this.setData({
      goodList: [],
    });
    // 重置页码
    this.Queryparams.pagenum = 1;
    // 重新发送请求
    this.getGoodList();
  },
});
