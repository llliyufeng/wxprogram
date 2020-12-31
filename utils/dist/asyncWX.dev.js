"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.showToast = exports.showModel = exports.chooseAddress = exports.openSetting = exports.getSetting = void 0;

var getSetting = function getSetting() {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      fail: function fail(err) {
        reject(err);
      },
      success: function success(result) {
        resolve(result);
      }
    });
  });
};

exports.getSetting = getSetting;

var openSetting = function openSetting() {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      fail: function fail(err) {
        reject(err);
      },
      success: function success(result) {
        resolve(result);
      }
    });
  });
};

exports.openSetting = openSetting;

var chooseAddress = function chooseAddress() {
  return new Promise(function (resolve, reject) {
    wx.chooseAddress({
      fail: function fail(err) {
        reject(err);
      },
      success: function success(result) {
        resolve(result);
      }
    });
  });
}; // promise形式的 showmodel


exports.chooseAddress = chooseAddress;

var showModel = function showModel(_ref) {
  var content = _ref.content;
  return new Promise(function (resolve, reject) {
    wx.showModal({
      title: "提示",
      content: content,
      // 之所以用箭头函数 是因为下面this如果不用箭头函数 this不是我们想要的那个值
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
};

exports.showModel = showModel;

var showToast = function showToast(_ref2) {
  var title = _ref2.title;
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title: title,
      icon: "none",
      success: function success(res) {
        resolve();
      },
      fail: function fail(err) {
        reject();
      }
    });
  });
}; // promise wx-login


exports.showToast = showToast;

var login = function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      timeout: 10000,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
};

exports.login = login;
//# sourceMappingURL=asyncWX.dev.js.map
