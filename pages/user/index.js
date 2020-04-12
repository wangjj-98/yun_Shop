// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collect: []
  },
  getUserInfo (e) {
    const { userInfo } = e.detail
    wx.setStorageSync("userInfo", userInfo);
    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userInfo,
      collect
    })
  },
  //修改收货地址
  editAddress () {

    //1. 获取当前权限状态
    wx.getSetting({
      success: (result) => {
        //2.把权限状态保存在变量中
        const scopeAddress = result.authSetting['scope.address']
        //3.判断scopeAddress的值
        if (scopeAddress === false) {
          //4.scopeAddress为false状态拒绝授权  就打开设置页面进行授权
          wx.openSetting({
            success: (res2) => {
            },
          });
        }
        //5.如果scopeAddress 为true 或者为undefined 直接调用收货地址api
        wx.chooseAddress({
          success: (res) => {
            //6.保存收货地址在本地缓存中
            wx.setStorageSync("address", res);
          },
        });
      },
    });

  }

})