"use strict";

var _request = require("../../request/request.js");

var _runtime = _interopRequireDefault(require("../../lib/runtime/runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goodList: [],
    totalPage: ""
  },
  // 接口要的参数
  Queryparams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    this.Queryparams.cid = options.cid;
    this.getGoodList();
  },
  handleTabsItemChange: function handleTabsItemChange(e) {
    var index = e.detail.index; // 修改原数组

    var tabs = this.data.tabs;
    tabs.forEach(function (v, i) {
      i === index ? v.isActive = true : v.isActive = false;
    });
    this.setData({
      tabs: tabs
    });
  },
  // 获取商品列表数据
  getGoodList: function getGoodList() {
    var res, pagenum, total;
    return _runtime["default"].async(function getGoodList$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _runtime["default"].awrap((0, _request.request)({
              url: "/goods/search",
              data: this.Queryparams
            }));

          case 2:
            res = _context.sent;
            pagenum = 1;
            total = res.total;
            this.totalPage = Math.ceil(total / this.Queryparams.pagesize);
            this.setData({
              // 拼接的数组旧+新1
              goodList: [].concat(_toConsumableArray(this.data.goodList), _toConsumableArray(res.goods))
            }); // 关闭下拉刷新

            wx.stopPullDownRefresh();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  onReachBottom: function onReachBottom() {
    // console.log("触底");
    if (this.Queryparams.pagenum >= this.totalPage) {
      wx.showToast({
        title: "没有下一页了"
      });
    } else {
      this.Queryparams.pagenum++;
      this.getGoodList();
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    // 重置数据
    this.setData({
      goodList: []
    }); // 重置页码

    this.Queryparams.pagenum = 1; // 重新发送请求

    this.getGoodList();
  }
});
//# sourceMappingURL=index.dev.js.map
