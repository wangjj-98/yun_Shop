// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, type: 1, value: "全部", isActive: true },
      { id: 1, type: 2, value: "待付款", isActive: false },
      { id: 2, type: 3, value: "待收货", isActive: false },
      { id: 3, type: 4, value: "退款/退货", isActive: false }
    ],
    type: null

  },
  itemChange (e) {
    let index = e.detail
    let tabs = this.data.tabs
    let type = this.data.type
    tabs.forEach(item => {
      // item.id === index ? item.isActive = true : item.isActive = false
      if (item.id === index) {
        item.isActive = true
        type = item.type
      } else {
        item.isActive = false
      }
    })
    this.setData({
      type,
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options
    let tabs = this.data.tabs
    tabs.forEach(item => {
      item.type === +type ? item.isActive = true : item.isActive = false
    });
    this.setData({
      type,
      tabs
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})