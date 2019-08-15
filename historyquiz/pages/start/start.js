// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getIntro();
    
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

  toapply:function(){
    wx.showModal({
      title: '提示',
      content: '请确保6月12日晚能到山上礼堂参加现场决赛，若无法到场请勿报名。',
      confirmText:'我能到场',
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

  bindGetUserInfo: function (e) {//现在获取用户信息是调用这个button，详情见简易教程
    var that = this;
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.request({
        url: 'https://dutcmc.com/mp/xiaoshi/backstage/1.0/start.php',
        data: '',
        success: function (res) {
          if (res.data == 1) {
            wx.setStorage({//将用户信息缓存起来，下次调用
              key: "userInfo",
              data: e.detail.userInfo,
              success: function () {
                wx.redirectTo({
                  url: '/pages/index/index'
                })
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '活动将于4月15日正式开始哟',
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
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请允许获取授权获得到您的昵称等信息作为获奖凭证',
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
      url: 'https://dutcmc.com/mp/xiaoshi/backstage/1.0/get_intro.php',
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