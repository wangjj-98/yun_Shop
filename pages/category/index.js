// pages/category/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],

    //右侧商品数据
    rightContent: [],
    menuIndex: 0,
    //设置右侧滚动条回到顶部
    scrollTop: 0
  },
  //接口返回数据
  categoryList: [],
  //点击左侧菜单切换样式
  menuTap (e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      menuIndex: index,
      scrollTop: 0
    })
    this.getCategoryList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      缓存技术
      1.先判断本地存储中有没有旧数据
      2.如果没有直接发送请求
      3.有旧的数据，且旧数据没有过期，就使用本地的旧数据
    */
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCategoryList()
    } else {
      //有旧数据 定义过期时间
      if (Date.now() - Cates.time > 1000 * 60 * 2) {
        this.getCategoryList()
      } else {
        //使用旧数据
        this.categoryList = Cates.data
        let leftMenuList = this.categoryList.map(v => v.cat_name)
        let menuIndex = this.data.menuIndex
        let rightContent = this.categoryList[menuIndex].children
        this.setData({
          leftMenuList,
          rightContent,
          menuIndex
        })

      }

    }

  },
  //获取分类数据
  async getCategoryList () {
    const res = await request({ url: '/categories' })
    this.categoryList = res.data.message
    //把接口的数据存入在本地存储中
    wx.setStorageSync('cates', { time: Date.now(), data: this.categoryList });
    let leftMenuList = this.categoryList.map(v => v.cat_name)
    let menuIndex = this.data.menuIndex
    let rightContent = this.categoryList[menuIndex].children
    this.setData({
      leftMenuList,
      rightContent,
      menuIndex
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