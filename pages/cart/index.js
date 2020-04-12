// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    //全选按钮选中状态
    allchecked: false,
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },
  //获取用户收货地址
  getAddress () {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart)

  },
  //点击选中按钮
  itemChange (e) {
    let { id } = e.currentTarget.dataset
    let { cart } = this.data
    cart.forEach(item => {
      item.goods_id === id ? item.checked = !item.checked : null
    })
    this.setCart(cart)

  },
  //封装 设置购物车状态同时 计算底部工具栏数据 全选总价格 购买数量
  setCart (cart) {
    //计算全选按钮
    const allchecked = cart.length ? cart.every(item => item.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(ele => {
      if (ele.checked) {
        totalPrice += ele.num * ele.goods_price
        totalNum += ele.num
      }
    });

    this.setData({
      address: wx.getStorageSync("address"),
      cart,
      allchecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  //点击全选按钮  实现全选与反选
  allItemChange () {
    let { cart } = this.data
    let allchecked = !this.data.allchecked
    cart.forEach(item => {
      allchecked ? item.checked = true : item.checked = false
    })
    this.setCart(cart)
  },
  //num --
  itemNumDown (e) {
    let { id } = e.currentTarget.dataset
    let { cart } = this.data
    //商品索引
    const index = cart.findIndex(item => item.goods_id === id)
    if (cart[index].num === 1) {
      //弹窗提示
      wx.showModal({
        content: '你是否要删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1)
            this.setCart(cart)
          }
        },
      });
      return
    }
    cart[index].num--
    this.setCart(cart)
  },
  //num ++
  itemNumUp (e) {
    let { id } = e.currentTarget.dataset
    let { cart } = this.data
    cart.forEach(item => {
      item.goods_id === id ? item.num++ : null
    })
    this.setCart(cart)
  },
  //结算按钮
  itemPay () {
    //判断有没有收货地址 和选购商品
    const { address } = this.data
    const { totalNum } = this.data
    if (!address.userName) {
      wx.showToast({
        title: '您还没有填写收货地址',
        icon: 'none',
        mask: true,
      });
      return
    }
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        mask: true,
      });
      return
    }
    //跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }

})