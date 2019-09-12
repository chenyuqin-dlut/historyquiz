// pages/start/start.js
const URL_get_intro = require('../../config').URL_get_intro;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro: '',
    joinnum:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getIntro();

  },

  toapply: function () {
    wx.showModal({
      title: '提示',
      content: '请确保6月12日晚能到山上礼堂参加现场决赛，若无法到场请勿报名。',
      confirmText: '我能到场',
      confirmColor: '#ff0000',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../apply/apply',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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

  },



  ifGetUserInfo: function () {//以前的获取用户信息的方法
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.SDKVersion) {
          //console.log(res.SDKVersion);
          var result = that.compareVersion(res.SDKVersion, '1.4.4');
          if (result < 0) {
            wx.showModal({
              title: '提示',
              content: '请先升级您的微信客户端再答题',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  //console.log('用户点击确定')
                } else if (res.cancel) {
                  //console.log('用户点击取消')
                }
              }
            })
          } else {

          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请先升级您的微信客户端再答题',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },

  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },

  getIntro: function () {
    var that = this;
    wx.request({
      url: URL_get_intro,
      data: '',
      success: function (res) {
        var intro = res.data;
        //console.log(intro);
        that.setData({
          intro: intro
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '网络出了点问题，请退出重试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //console.log('用户点击确定')
            } else if (res.cancel) {
              //console.log('用户点击取消')
            }
          }
        })
      },
      complete: function (res) { },
    })
  }

})