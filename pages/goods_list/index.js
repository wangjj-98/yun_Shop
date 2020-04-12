// pages/goods_list/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false }
    ],
    goodsList: [],
  },
  //接口参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalpage: 1,
  //切换tab栏
  itemChange (e) {
    let index = e.detail
    let tabs = this.data.tabs
    tabs.forEach((item, i) => {
      i === index ? item.isActive = true : item.isActive = false
    })
    this.setData({
      tabs
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取Cid
    let { cid, query } = options
    this.queryParams.cid = cid || '';
    this.queryParams.query = query || '';

    this.getGoodsList()
  },
  //获取商品列表数据
  async getGoodsList () {
    const { data: res } = await request({ url: '/goods/search', data: this.queryParams })
    //获取总条数
    let total = res.message.total;
    //计算总页数
    this.totalpage = Math.ceil(total / this.queryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.message.goods],
      total
    })
    //关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //重置数组
    this.setData({
      goodsList: []
    })
    //重置页码
    this.queryParams.pagenum = 1;
    //重新发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /* 判断有没有下一页数据
        1.获取到总页数 和当前页码
        2.判断 当前页码是否大于总页数
    */
    if (this.queryParams.pagenum >= this.totalpage) {
      //没有下一页数据
      wx.showToast({
        title: '没有下一页商品了'
      });
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})