let reqTimes = 0;
export const request = (params) => {
  reqTimes++;
  // 显示加载中
  wx.showLoading({
    title: "加载中",
  });
  // 定义公共的url
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: (result) => {
        resolve(result.data.message);
        // wx.hideLoading();
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        reqTimes--;
        if (reqTimes === 0) {
          // 关闭正在等待的图标
          wx.hideLoading();
        }
      },
    });
  });
};
