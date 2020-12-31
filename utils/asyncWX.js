export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      fail: (err) => {
        reject(err);
      },
      success: (result) => {
        resolve(result);
      },
    });
  });
};
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      fail: (err) => {
        reject(err);
      },
      success: (result) => {
        resolve(result);
      },
    });
  });
};
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      fail: (err) => {
        reject(err);
      },
      success: (result) => {
        resolve(result);
      },
    });
  });
};
// promise形式的 showmodel
export const showModel = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content: content,
      // 之所以用箭头函数 是因为下面this如果不用箭头函数 this不是我们想要的那个值
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: "none",
      success: (res) => {
        resolve();
      },
      fail: (err) => {
        reject();
      },
    });
  });
};

// promise wx-login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
