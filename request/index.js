//同时发送请求的次数
let ajaxTimes = 0;
export const request = (params) => {
  ajaxTimes++;
  //显示加载中效果
  wx.showLoading({
    title: '加载中',
  });
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //关闭真正加载
          wx.hideLoading();
        }
      }
    })
  })
}