// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: '体验问题', isActive: true },
      { id: 1, value: '商品，商家投诉', isActive: false },
    ],
    imagesList: [],
    textValue: ''
  },
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
  chooseImg () {
    //调用小程序内置的选择图片上传
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        this.setData({
          imagesList: [...this.data.imagesList, ...result.tempFilePaths]
        })

      },
    });
  },
  itemDel (e) {
    let src = e.detail
    let imagesList = this.data.imagesList
    let index = imagesList.findIndex(item => item === src)
    imagesList.splice(index, 1)
    this.setData({
      imagesList
    })
  },
  //获取输入框 value
  getValue (e) {
    console.log(e);
    let { value } = e.detail
    //检测value合法性 如果不合法
    if (!value.trim()) {
      wx.showToast({
        title: '输入的格式不符合规则',
        icon: 'none',
        mask: true,
      });
      return
    }
    this.setData({
      textValue: value
    })
  },
  //点击按钮提交
  btnSubmit () {
    const { textValue, imagesList } = this.data
    //上传图片
    //上传文件api不支持多个文件同时上传
    //使用遍历解决
    imagesList.forEach(v => {
      wx.uploadFile({
        url: 'http://images.ac.cn/api/upload?apiType=Ali',
        filePath: v,
        name: 'file',
        formData: {},
        success: (result) => {

        },
      });
    })
    wx.navigateBack({
      delta: 1
    });

  }


})