// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: "店铺收藏", isActive: true },
      { id: 1, value: "商品收藏", isActive: false },
      { id: 2, value: "商品关注", isActive: false },
      { id: 3, value: "我的足迹", isActive: false },
    ],
    collect: []

  },
  itemChange (e) {
    let index = e.detail
    let tabs = this.data.tabs
    tabs.forEach(v => {
      v.id === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    let tabs = this.data.tabs
    tabs.forEach(item => {
      item.id === +id ? item.isActive = true : item.isActive = false
    });
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })
  },


})