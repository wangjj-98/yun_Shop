// pages/search/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    //按钮显示隐藏
    isShow: false,
    inpValue: ''
  },
  timer: null,
  //监听input 框 
  handleInput (e) {
    let { value } = e.detail
    //检测值合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isShow: false,
      })
      return;
    }
    this.setData({
      isShow: true
    })
    //防抖
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.qsearch(value)
    }, 1000)

  },

  //发送请求
  async qsearch (query) {
    const { data: res } = await request({ url: '/goods/qsearch', data: { query } })
    console.log(res);
    this.setData({
      goods: res.message
    })
  },
  //点击取消按钮
  btnCancel () {
    this.setData({
      inpValue: '',
      goods: [],
      isShow: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


})