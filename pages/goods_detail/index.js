// pages/goos_detail/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    //商品是否被收藏
    isCollect: false
  },
  //全局商品对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)

  },
  //发送请求，获取商品详情数据
  async getGoodsDetail (goods_id) {
    const { data: res } = await request({ url: '/goods/detail', data: { goods_id } })
    this.GoodsInfo = res.message
    //获取缓存中的商品数组
    let collect = wx.getStorageSync("collect") || [];
    //判断当前商品是否被收藏
    //some 只要返回一个true 整个函数返回true
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
    this.setData({
      goodsObj: {
        goods_id: res.message.goods_id,
        goods_name: res.message.goods_name,
        goods_price: res.message.goods_price,
        goods_introduce: res.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.message.pics
      },
      isCollect
    })
  },
  //点击轮播图预览大图
  itemTap (e) {
    let { index } = e.currentTarget.dataset
    //调用小程序api previewImage
    //先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_big_url);
    wx.previewImage({
      current: urls[index],
      urls: urls,
    });
  },
  //添加购物车
  cartAdd () {
    //获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    //判断商品是否存在购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //不存在
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      //商品存在 执行num++
      cart[index].num++
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    //弹出提示框 添加成功
    wx.showToast({
      title: '已添加到购物车',
      mask: true
    });
  },
  //点击购买
  buy () {
    this.cartAdd();
    wx.switchTab({
      url: '/pages/cart/index',
    });
  },
  //点击收藏按钮
  collectTap () {
    let isCollect = false
    //1 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    //2 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index !== -1) {
      //被收藏了
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        mask: true,
      });
    } else {
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        mask: true,
      });
    }
    //3 把数组存入缓存中
    wx.setStorageSync("collect", collect);
    //4 修改 data 中的 isCollect 属性
    this.setData({
      isCollect
    })

  }

})