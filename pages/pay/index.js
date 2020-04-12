// pages/pay/index.js
// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(v => v.checked === true)
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(ele => {
      totalPrice += ele.num * ele.goods_price
      totalNum += ele.num
    });
    this.setData({
      address: wx.getStorageSync("address"),
      cart,
      totalPrice,
      totalNum
    })
  },
})