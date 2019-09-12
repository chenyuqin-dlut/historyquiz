// pages/index/index.js
const URL_getcoin = require('../../config').URL_getcoin;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    coin: "",
    rank: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        //console.log(res.data);
        that.setData({
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.nickName
        })
      }
    })


  },

  tolevel: function() {
    wx.navigateTo({
      url: '../level/level',
    })
  },

  tochallenge: function() {
    wx.navigateTo({
      url: '../challenge/challenge',
    })
  },

  torank: function() {
    wx.navigateTo({
      url: '../rank/rank',
    })
  },

  togift: function() {
    wx.navigateTo({
      url: '../gift/gift',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: URL_getcoin,
          data: {
            openid: res.data
          },
          success: function (getres) {
            console.log(getres)
            that.setData({
              coin: getres.data[0],
              rank: getres.data[1],
            })
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})