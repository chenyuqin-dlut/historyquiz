// pages/level/level.js
const URL_start = require('../../config').URL_start;
const URL_get_intro = require('../../config').URL_get_intro;
const URL_new_rank = require('../../config').URL_new_rank;
const URL_info = require('../../config').URL_info;
const URL_time = require('../../config').URL_time;
const URL_login = require('../../config').URL_login;
const URL_getcoin = require('../../config').URL_getcoin;
const URL_challengechance = require('../../config').URL_challengechance;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    next_h: '00',
    next_m: '00',
    next_s: '00',
    challengechance: 0,
    openid:'',
    level: [{
        level_id: '',
        level_right: '',
        level_all: '',
        level_state: 0, //不可答题，1可以答题，2已通过
        level_image: '',
        level_level_color: '',
        level_right_color: '',
        level_opacity: '1'
      },
      {
        level_id: '',
        level_right: '',
        level_all: '',
        level_state: 0, //不可答题，1可以答题，2已通过
        level_image: '',
        level_level_color: '',
        level_right_color: '',
        level_opacity: '1'
      },
      {
        level_id: '',
        level_right: '',
        level_all: '',
        level_state: 0, //不可答题，1可以答题，2已通过
        level_image: '',
        level_level_color: '',
        level_right_color: '',
        level_opacity: '1'
      },
      {
        level_id: '',
        level_right: '',
        level_all: '',
        level_state: 0, //不可答题，1可以答题，2已通过
        level_image: '',
        level_level_color: '',
        level_right_color: '',
        level_opacity: '1'
      },
      {
        level_id: '',
        level_right: '',
        level_all: '',
        level_state: 0, //不可答题，1可以答题，2已通过
        level_image: '',
        level_level_color: '',
        level_right_color: '',
        level_opacity: '1'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLogin();
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
    var that = this
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: URL_challengechance,
      data: {
        type: 'qu',
        openid: openid,
      },
      success: function(res) {
        that.setData({
          challengechance: res.data
        })
      },
    })
    //console.log(2);
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

  },

  startLevel: function(e) {
    //console.log(e);
    var that = this;
    var level_id = (e.currentTarget.dataset.level_id + 1) * 5;
    var level_state = e.currentTarget.dataset.level_state;
    var level_opacity = e.currentTarget.dataset.level_opacity;
        
        if (that.data.challengechance <= 0) {
          wx.showModal({
            title: '提示',
            content: '您的挑战机会已用完，请明日再战',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                //console.log('用户点击确定')
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        } else if (level_opacity == '0.5') {
          wx.showModal({
            title: '提示',
            content: '您的答题机会已用完，请等待下一次答题机会',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                //console.log('用户点击确定')
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        } else {
          if (level_state == 0) {
            wx.showModal({
              title: '提示',
              content: '请先解锁前面关卡',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  //console.log('用户点击确定')
                } else if (res.cancel) {
                  //console.log('用户点击取消')
                }
              }
            })
          } else {
            // that.writeTime();
            var openid = wx.getStorageSync('openid')
            wx.request({
              url: URL_challengechance,
              data: {
                type:'de',
                openid: openid,
                chance: -1
              },
              success:function(){
                wx.redirectTo({
                  url: "challengelevel/challengelevel?factor=" + level_id
                })
              }
            })
          }
        }
  },

  writeInfo: function() {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        //console.log(res.data);
        that.setData({
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.nickName
        })
        var avatarUrl = res.data.avatarUrl;
        var nickName = res.data.nickName;
        try {
          var openid = wx.getStorageSync('openid')
          that.setData({
            openid:openid
          })
          console.log(openid);
          if (openid) {
            //console.log(openid);
            wx.request({
              url: URL_info,
              data: {
                avatarUrl: avatarUrl,
                nickName: nickName,
                openid: openid
              },
              success: function(res) {
                console.log(res.data);
                if (res.data) {
                  wx.setStorage({
                    key: 'levelRight',
                    data: res.data,
                    success: function(res) {
                      that.getLevel();
                    }
                  })

                } else {
                  wx.showModal({
                    title: '提示',
                    content: '出了一点问题，请退出小程序重新尝试',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {
                        //console.log('用户点击确定')
                      } else if (res.cancel) {
                        //console.log('用户点击取消')
                      }
                    }
                  })
                }
              },
              fail: function(res) {
                wx.showModal({
                  title: '提示',
                  content: '连接服务器失败，请退出小程序重新尝试',
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) {
                      //console.log('用户点击确定')
                    } else if (res.cancel) {
                      //console.log('用户点击取消')
                    }
                  }
                })
              },
              complete: function(res) {},
            })
          }
        } catch (e) {
          console.log(e);
          // Do something when catch error
        }
      },
      fail: function(res) {

      },
      complete: function(res) {},
    })
  },

  getTime: function() {
    var that = this;
    try {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        //console.log(openid);
        wx.request({
          url: URL_time,
          data: {
            openid: openid,
            time_type: 'get',
            //time: 0
          },
          success: function(res) {
            console.log(res.data);
            var next_time = res.data;

            var next_h = parseInt(next_time / 60 / 60);
            //console.log(next_h);
            if (next_h < 10) {
              next_h = '0' + next_h;
            }
            var next_m = parseInt((next_time - next_h * 60 * 60) / 60);
            if (next_m < 10) {
              next_m = '0' + next_m;
            }
            var next_s = next_time - next_h * 60 * 60 - next_m * 60;
            if (next_s < 10) {
              next_s = '0' + next_s;
            }

            var level = that.data.level;

            if (next_time <= 0) {
              for (var i = 0; i < 5; i++) {
                level[i]['level_opacity'] = '1';
              }
            } else {
              for (var i = 0; i < 5; i++) {
                level[i]['level_opacity'] = '1';
              }
            }

            that.setData({
              level: level
            })

            that.setData({
              next_h: next_h,
              next_m: next_m,
              next_s: next_s
            })

            that.timeCountDown();
            //console.log(res.data);
          },
          fail: function(res) {
            wx.showModal({
              title: '提示',
              content: '连接服务器失败，请退出小程序重新尝试',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  //console.log('用户点击确定')
                } else if (res.cancel) {
                  //console.log('用户点击取消')
                }
              }
            })
          },
          complete: function(res) {},
        })
      }
    } catch (e) {
      console.log(e);
      // Do something when catch error
    }
  },

  writeTime: function() {
    var that = this;
    try {
      var openid = wx.getStorageSync('openid')
      if (openid) {
        //console.log(openid);
        wx.request({
          url: URL_time,
          data: {
            openid: openid,
            time_type: 'write',
            //time: 0
          },
          success: function(res) {
            console.log(res.data);
            that.setData({
              next_h: '02',
              next_m: '00',
              next_s: '00'
            })
            that.timeCountDown();
            //console.log(res.data);
          },
          fail: function(res) {
            wx.showModal({
              title: '提示',
              content: '连接服务器失败，请退出小程序重新尝试',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  //console.log('用户点击确定')
                } else if (res.cancel) {
                  //console.log('用户点击取消')
                }
              }
            })
          },
          complete: function(res) {},
        })
      }
    } catch (e) {
      console.log(e);
      // Do something when catch error
    }
  },

  timeCountDown: function() {
    var that = this;

    var myInterval = setInterval(function() {

      var next_h = parseInt(that.data.next_h);
      var next_m = parseInt(that.data.next_m);
      var next_s = parseInt(that.data.next_s);
      var next_time = next_h * 60 * 60 + next_m * 60 + next_s;

      next_time--;

      next_h = parseInt(next_time / 60 / 60);
      //console.log(next_h);
      if (next_h < 10) {
        next_h = '0' + next_h;
      }
      next_m = parseInt((next_time - next_h * 60 * 60) / 60);
      if (next_m < 10) {
        next_m = '0' + next_m;
      }
      next_s = next_time - next_h * 60 * 60 - next_m * 60;
      if (next_s < 10) {
        next_s = '0' + next_s;
      }

      if (next_time < 0) {
        var level = that.data.level;
        for (var i = 0; i < 5; i++) {
          level[i]['level_opacity'] = '1';
        }
        clearInterval(myInterval);
      } else {
        that.setData({
          next_h: next_h,
          next_m: next_m,
          next_s: next_s,
        })
      }

    }, 1000)
  },

  showtip: function() {
    var content = "挑战模式中，答对加金币，答错减金币，总共设置五种难度，每栏从左到右的数字依次是题数、答对加金币数、答错减金币数，答题限时为总题数*30s，请大家把握机会";
    wx.showModal({
      title: '挑战说明',
      content: content,
      showCancel: false,
      success: function(res) {}
    })
  },

  getLevel: function() {
    var that = this;
    wx.getStorage({
      key: 'levelRight',
      success: function(res) {
        console.log(res.data);
        var level_right_array = [5, 10, 15, 20, 25];
        var level = that.data.level;

        for (var i = 0; i < 5; i++) {
          level[i]['level_id'] = i;
          level[i]['level_right'] = level_right_array[i];
          level[i]['level_all'] = i * 5 + 5;
        }

        //console.log(level);

        if (level[0]['level_right'] / level[0]['level_all'] >= 0.8 || true) {
          level[0]['level_state'] = 2;
          level[1]['level_state'] = 1;
          level[0]['level_image'] = "/images/4.png";
          level[1]['level_image'] = "/images/4.png";
          level[0]['level_level_color'] = "#F48B31";
          level[1]['level_level_color'] = "#F48B31";
          level[0]['level_right_color'] = "#F2963A";
          level[1]['level_right_color'] = "#F2963A";
          if (level[1]['level_right'] / level[1]['level_all'] >= 0.8 || true) {
            level[1]['level_state'] = 2;
            level[2]['level_state'] = 1;
            level[1]['level_image'] = "/images/4.png";
            level[2]['level_image'] = "/images/4.png";
            level[1]['level_level_color'] = "#F48B31";
            level[2]['level_level_color'] = "#F48B31";
            level[1]['level_right_color'] = "#F2963A";
            level[2]['level_right_color'] = "#F2963A";
            if (level[2]['level_right'] / level[2]['level_all'] >= 0.8 || true) {
              level[2]['level_state'] = 2;
              level[3]['level_state'] = 1;
              level[2]['level_image'] = "/images/4.png";
              level[3]['level_image'] = "/images/4.png";
              level[2]['level_level_color'] = "#F48B31";
              level[3]['level_level_color'] = "#F48B31";
              level[2]['level_right_color'] = "#F2963A";
              level[3]['level_right_color'] = "#F2963A";
              if (level[3]['level_right'] / level[3]['level_all'] >= 0.8 || true) {
                level[3]['level_state'] = 2;
                level[4]['level_state'] = 1;
                level[3]['level_image'] = "/images/4.png";
                level[4]['level_image'] = "/images/4.png";
                level[3]['level_level_color'] = "#F48B31";
                level[4]['level_level_color'] = "#F48B31";
                level[3]['level_right_color'] = "#F2963A";
                level[4]['level_right_color'] = "#F2963A";
                if (level[4]['level_right'] / level[4]['level_all'] >= 0.8 || true) {
                  level[4]['level_state'] = 2;
                  level[4]['level_image'] = "/images/4.png";
                  level[4]['level_level_color'] = "#F48B31";
                  level[4]['level_right_color'] = "#F2963A";

                } else {
                  level[4]['level_state'] = 1;
                  level[4]['level_image'] = "/images/4.png";
                  level[4]['level_level_color'] = "#F48B31";
                  level[4]['level_right_color'] = "#F2963A";
                }
              } else {
                level[3]['level_state'] = 1;
                level[4]['level_state'] = 0;
                level[3]['level_image'] = "/images/4.png";
                level[4]['level_image'] = "/images/5.png";
                level[3]['level_level_color'] = "#F48B31";
                level[4]['level_level_color'] = "#666";
                level[3]['level_right_color'] = "#F2963A";
                level[4]['level_right_color'] = "#999";
              }
            } else {
              level[2]['level_state'] = 1;
              level[3]['level_state'] = 0;
              level[4]['level_state'] = 0;
              level[2]['level_image'] = "/images/4.png";
              level[3]['level_image'] = "/images/5.png";
              level[4]['level_image'] = "/images/5.png";
              level[2]['level_level_color'] = "#F48B31";
              level[3]['level_level_color'] = "#666";
              level[4]['level_level_color'] = "#666";
              level[2]['level_right_color'] = "#F2963A";
              level[3]['level_right_color'] = "#999";
              level[4]['level_right_color'] = "#999";
            }
          } else {
            level[1]['level_state'] = 1;
            level[2]['level_state'] = 0;
            level[3]['level_state'] = 0;
            level[4]['level_state'] = 0;
            level[1]['level_image'] = "/images/4.png";
            level[2]['level_image'] = "/images/5.png";
            level[3]['level_image'] = "/images/5.png";
            level[4]['level_image'] = "/images/5.png";
            level[1]['level_level_color'] = "#F48B31";
            level[2]['level_level_color'] = "#666";
            level[3]['level_level_color'] = "#666";
            level[4]['level_level_color'] = "#666";
            level[1]['level_right_color'] = "#F2963A";
            level[2]['level_right_color'] = "#999";
            level[3]['level_right_color'] = "#999";
            level[4]['level_right_color'] = "#999";
          }
        } else {
          level[0]['level_state'] = 1;
          level[1]['level_state'] = 0;
          level[2]['level_state'] = 0;
          level[3]['level_state'] = 0;
          level[4]['level_state'] = 0;
          level[0]['level_image'] = "/images/4.png";
          level[1]['level_image'] = "/images/5.png";
          level[2]['level_image'] = "/images/5.png";
          level[3]['level_image'] = "/images/5.png";
          level[4]['level_image'] = "/images/5.png";
          level[0]['level_level_color'] = "#F48B31";
          level[1]['level_level_color'] = "#666";
          level[2]['level_level_color'] = "#666";
          level[3]['level_level_color'] = "#666";
          level[4]['level_level_color'] = "#666";
          level[0]['level_right_color'] = "#F2963A";
          level[1]['level_right_color'] = "#999";
          level[2]['level_right_color'] = "#999";
          level[3]['level_right_color'] = "#999";
          level[4]['level_right_color'] = "#999";
        }
        console.log(level);

        that.setData({
          level: level
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getLogin: function() {
    var that = this;
    wx.login({
      success: res => {
        wx.login({
          success: function(res) {
            if (res.code) {
              //console.log(res.code);
              //发起网络请求
              wx.request({ //详细用法看小程序简易教程
                url: URL_login,
                data: {
                  code: res.code
                },
                success: function(res) {
                  wx.setStorage({
                    key: "openid", //按照微信所说返回一个sessionid，但实际上应该是可以用其他来代替，因为没有cookie机制，所以这个sessionid是放在header里传过去的，只是标识用户而已，而且百度云无法生成他所说的随机数，所以这里我直接吧openid加密返回来的，数据存在数据库里
                    data: res.data.openid,
                    success: function() {
                      that.writeInfo();
                      that.getTime();
                    }
                  })
                  wx.setStorage({
                    key: "questionID", //按照微信所说返回一个sessionid，但实际上应该是可以用其他来代替，因为没有cookie机制，所以这个sessionid是放在header里传过去的，只是标识用户而已，而且百度云无法生成他所说的随机数，所以这里我直接吧openid加密返回来的，数据存在数据库里
                    data: res.data.question_id
                  })
                  //console.log(res.data);
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
  }


})