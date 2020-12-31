"use strict";

var _asyncWX = require("../../utils/asyncWX.js");

var _runtime = _interopRequireDefault(require("../../lib/runtime/runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 全选的实现
// onShow 获取缓存中的购物车数组
//根据购物车中的商品数据 所有的商品都被选中 checked=true 全选就被选中

/* 总价格的实现
 需要商品被选中再计算
 获取购物车的数组
 遍历
 判断商品是否被选中
 总价格 += 商品的单价*数量
 总数量 += 商品的数量
 把计算后的价格和数量 设置回data中即可
*/

/*
  选中状态同步的实现
  绑定change事件
  获取被修改的商品对象
  重新填充回data中和缓存中
 */

/*
  全选和反选功能
  给全选的复选框绑定事件 change
  获取data中的全选变量 allChecked
  直接取反 allChecked = !allChecked
  遍历购物车数组 让里面商品选中状态跟随 allChecked改变而改变
  把购物车数组和allChecked重新设置回data 把购物车重新设置为缓存中
 */

/*
  商品数量的编辑功能
  + - 绑定同一个点击事件 区分的关键 自定义属性
  + +1
  - -1
  传递被点击的商品id goods_id
  获取data中的购物车数组
  根据id来获取被修改的商品对象
  当购物车的数量=1  同时用户点击-
  弹窗提示(showModel)用户是否要删除 api
  确定 执行删除
  取消 什么都不做
  直接修改商品的数量属性
  把购物车数组重新设置回缓存中和data中
  this.setCart()
 */

/*
  结算
  判断有没有收获地址信息
  判断用户有没有选择购买商品
  经过以上验证 跳转到支付页面
 
  */
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function onShow() {
    // 获取缓存中的地址
    var address = wx.getStorageSync("address"); // 获取缓存中的购物车数据

    var cart = wx.getStorageSync("cart") || []; // // 计算全选
    // // every 数组方法 会遍历 接收一个回调参数
    // // 每一个回调函数都返回true 那么every方法返回true
    // // 如果有一个返回false 则every不再执行 直接返回false
    // // const allChecked = cart.length ? cart.every((v) => v.checked) : false;
    // // 空数组调用every就是true
    // console.log(allChecked);
    // let totalPrice = 0;
    // let totalNum = 0;
    // let allChecked = true;
    // cart.forEach((v) => {
    //   if (v.checked) {
    //     totalPrice += v.goods_price * v.num;
    //     totalNum += v.num;
    //   } else {
    //     allChecked = false;
    //   }
    // });
    // allChecked = cart.length != 0 ? true : false;

    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo; // // 设置data数据
    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum,
    // });

    this.setCart(cart);
    this.setData({
      address: address
    });
  },
  //options(Object)
  onLoad: function onLoad(options) {},
  // 获取用户地址
  // 调用小程序内置的API 获取用户的地址
  handleChooseAddress: function handleChooseAddress() {
    // wx.chooseAddress({
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: () => {},
    //   complete: () => {},
    // });
    wx.getSetting({
      success: function success(result) {
        // console.log(result);
        var scopeAdress = result.authSetting["scope.address"];

        if (scopeAdress === true || scopeAdress === undefined) {
          wx.chooseAddress({
            success: function success(result) {
              console.log(result);
              wx.setStorageSync("address", result);
            }
          });
        }
      }
    }); // 使用包装的方法之后
    // 获取权限状态
    // async handleChooseAddress() {
    //   wx.getSetting({
    //     complete: (res) => {},
    //   });
    //   const res1 = await getSetting();
    //   const scopeAdress = res1.authSetting["scope.address"];
    //   if (scopeAdress === true || scopeAdress === undefined) {
    //     //  调用获取收货地址的代码的api
    //     const res2 = await chooseAddress();
    //   } else {
    //     // 诱导用户打开获取权限 即调用打开函数
    //     await openSetting();
    //     // 调用获取地址的api
    //     const res2 = await chooseAddress();
    //   }
    // },
  },
  handleItemChange: function handleItemChange(e) {
    // 获取被修改的商品的id
    var goods_id = e.currentTarget.dataset.id; // 获取购物车的数组

    var cart = this.data.cart; // 获取被修改的商品对象

    var index = cart.findIndex(function (v) {
      return v.goods_id === goods_id;
    }); // 选中状态取反

    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  // 设置购物车状态 重新计算
  setCart: function setCart(cart) {
    var totalPrice = 0;
    var totalNum = 0;
    var allChecked = true;
    cart.forEach(function (v) {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false; // 设置data数据

    this.setData({
      cart: cart,
      allChecked: allChecked,
      totalPrice: totalPrice,
      totalNum: totalNum
    });
    wx.setStorageSync("cart", cart);
  },
  // 商品全选功能
  handleItemAllCheck: function handleItemAllCheck() {
    // 获取data中的数据
    var _this$data = this.data,
        cart = _this$data.cart,
        allChecked = _this$data.allChecked; // 修改值

    allChecked = !allChecked; // 循环修改cart数组中的商品状态

    cart.forEach(function (v) {
      return v.checked = allChecked;
    }); // 把修改后的值填充回data和缓存中

    this.setData({
      cart: cart,
      allChecked: allChecked
    });
  },
  handleItemNumEdit: function handleItemNumEdit(e) {
    var _e$currentTarget$data, operation, id, cart, index, res;

    return _runtime["default"].async(function handleItemNumEdit$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _e$currentTarget$data = e.currentTarget.dataset, operation = _e$currentTarget$data.operation, id = _e$currentTarget$data.id;
            cart = this.data.cart; // 找到需要修改的商品

            index = cart.findIndex(function (v) {
              return v.goods_id === id;
            }); // 判断是否要执行删除

            if (!(cart[index].num === 1 && operation === -1)) {
              _context.next = 11;
              break;
            }

            _context.next = 6;
            return _runtime["default"].awrap((0, _asyncWX.showModel)({
              content: "您是否要删除?"
            }));

          case 6:
            res = _context.sent;
            console.log(res);

            if (res.confirm) {
              cart.splice(index, 1);
              this.setCart(cart);
            }

            _context.next = 13;
            break;

          case 11:
            cart[index].num += operation; // 设置回缓存和data中

            this.setCart(cart);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  handlePay: function handlePay(e) {
    var _this$data2, address, totalNum;

    return _runtime["default"].async(function handlePay$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 点击结算功能
            // 判断收货地址
            _this$data2 = this.data, address = _this$data2.address, totalNum = _this$data2.totalNum;

            if (address.userName) {
              _context2.next = 5;
              break;
            }

            _context2.next = 4;
            return _runtime["default"].awrap((0, _asyncWX.showToast)({
              title: "您还没有选择收货地址"
            }));

          case 4:
            return _context2.abrupt("return");

          case 5:
            if (!(totalNum === 0)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 8;
            return _runtime["default"].awrap((0, _asyncWX.showToast)({
              title: "您还没有选购商品"
            }));

          case 8:
            return _context2.abrupt("return");

          case 9:
            // 执行正常逻辑 跳转到支付页面
            wx.navigateTo({
              url: "/pages/pay/index"
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  }
});
//# sourceMappingURL=index.dev.js.map
