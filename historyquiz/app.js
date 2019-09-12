//app.js
const URL_get_ques = require('config').URL_get_ques;
const URL_login = require('config').URL_login;


var util = require("utils/util.js")

App({

  onLaunch: function (options) {
    var that = this;
    console.log(options)
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录

    var arr = [0,0];
    for(var i= 0;i<715;i++){
      arr[i] = i+1
    }
    arr.sort(function () {
      return (0.5 - Math.random());
    })
    console.log(arr);

    that.getLogin();
    

    //获取题目
    wx.getStorage({
      key: 'questionArray',
      success: function(res) {
        //console.log("question_success");
        that.getQues();
      },
      fail: function(res) {
        //console.log("no_question");
        that.getQues();
      },
      complete: function(res) {},
    })





  },

  onShow:function(options){
console.log(options);
  },

  getQues: function () {
    var that = this;
    wx.request({
      url: URL_get_ques,
      data: {},
      success: function (res) {
        console.log(res.data);
        wx.setStorage({
          key: 'questionArray',
          data: res.data,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        //console.log(res.data);
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '连接服务器失败，请退出小程序重新尝试',
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
  },

  getLogin: function () {
    var that = this;
    wx.login({
      success: res => {
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log(res.code)
              //发起网络请求
              wx.request({//详细用法看小程序简易教程
                url: URL_login,
                data: {
                  code: res.code
                },
                success: function (res) {
                  console.log(res)

                  wx.setStorage({
                    key: "openid",//按照微信所说返回一个sessionid，但实际上应该是可以用其他来代替，因为没有cookie机制，所以这个sessionid是放在header里传过去的，只是标识用户而已，而且百度云无法生成他所说的随机数，所以这里我直接吧openid加密返回来的，数据存在数据库里
                    data: res.data.openid
                  })
                  var question = new Array();
                  let i = 0;
                  for(i;i<75;i++){
                    question[i] = Math.floor(Math.random()*158)
                  }
                  console.log(question);
                  wx.setStorage({
                    key: "questionID",//按照微信所说返回一个sessionid，但实际上应该是可以用其他来代替，因为没有cookie机制，所以这个sessionid是放在header里传过去的，只是标识用户而已，而且百度云无法生成他所说的随机数，所以这里我直接吧openid加密返回来的，数据存在数据库里
                    data: res.data.question_id
                  })
                  
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