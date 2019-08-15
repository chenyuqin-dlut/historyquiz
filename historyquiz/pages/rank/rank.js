// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveImgBtnHidden: false,
    openSettingBtnHidden: true,
    level: '',
    ans_right: '',
    ans_wrong: '',
    scores: '',
    rank: '',
    rank_all: [],
    rank_my: [],
    qrCodePath: '/images/shareimage.png',
    backgroundPicPath: '/images/1.png',
    shareImgSrc: '',
    share_hidden: true
  },

  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRank();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //onShow: function () {

  //},

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
  onShareAppMessage: function (options) {
    console.log(options);
    var that = this;
    var rank_my = that.data.rank_my;
    return {
      title: "我在大连理工大学70周年校史校情知识竞赛小程序中得到了 " + rank_my['right'] + " 枚金币，排在第 " + (rank_my['rank'] + 1) + " 名",
      path: '/pages/start/start',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  getRank: function () {
    var that = this;
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: 'https://dutcmc.com/mp/xiaoshi/backstage/1.0/rank1.php',
      data: {
        openid: openid
      },
      success: function (res) {
        var rank_all = res.data.rank_all;
        var rank_my = res.data.rank_my;
        that.setData({
          rank_my: rank_my,
          rank_all: rank_all
        })
        wx.showToast({
          title: '加载排名完毕',
          icon: 'success',
          duration: 1000
        })
        console.log(res.data);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  drawImage: function () {
    //console.log(1);
    var that = this;
    const ctx = wx.createCanvasContext('myCanvas')
    //var imgPath = '/images/intro.png'
    var bgImgPath = '/images/canvas1.png';
    var rank_my = that.data.rank_my;
    if(rank_my['right']){
      that.setData({
        share_hidden: false
      })
      //console.log(rank_my);
      var avatar_url = rank_my['avatar_url'];
      wx.downloadFile({
        url: avatar_url, 
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          var avatar_temp_url = res.tempFilePath;
          //console.log(filePath);
          //console.log(avatar_url);
          var rank = rank_my['rank'] + 1;
          var right = rank_my['right'];
          ctx.drawImage(bgImgPath, 0, 0, 1080, 1440);
          ctx.drawImage(avatar_temp_url, 75, 572, 160, 160);

          // ctx.setFontSize(60)
          // ctx.setFillStyle('#ebcb57')
          // ctx.fillText(right, 250, 965)

          // ctx.setFontSize(60)
          // ctx.setFillStyle('#bf2323')
          // ctx.fillText(rank, 210, 1045)

          //ctx.drawImage(imgPath, 30, 550, 60, 60);
          //ctx.drawImage(bgImgPath, 30, 550, 60, 60);
          //ctx.drawImage(imgPath, 410, 610, 160, 160);

          ctx.draw(false, function () {
            wx.canvasToTempFilePath({
              destWidth: 750,
              destHeight: 1000,
              canvasId: 'myCanvas',
              success: function (res) {
                //console.log(res.tempFilePath);
                that.setData({
                  shareImgSrc: res.tempFilePath
                })

              },
              fail: function (res) {
                console.log(res)
              }
            })
          })
        }
      })
      
    } else {
      wx.showModal({
        title: '提示',
        content: '请等待排名加载完毕后重新点击分享到朋友圈',
        showCancel: false,
        confirmText: '确认',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      })
    }
  },

  saveImage: function () {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.shareImgSrc,
      success(res) {
        that.hideShareImg()
        wx.showModal({
          title: '存图成功',
          content: '图片成功保存到相册了，分享到朋友圈吧',
          showCancel: false,
          confirmText: '好哒',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      },
      fail: (err) => {
        that.hideShareImg()
        that.setData({
          saveImgBtnHidden: true,
          openSettingBtnHidden: false
        })


        console.log(err)
        wx.hideLoading()
        that.setData({
          canvasHidden: true,
          share_hidden: true,
        })
      }
    })
  },

  // saveImage: function () {
  //   var that = this;
  //   wx.saveImageToPhotosAlbum({
  //     // filePath: that.data.shareImgSrc,
  //     // success(res) {
  //     //   that.hideShareImg()
  //     //   wx.showModal({
  //     //     title: '存图成功',
  //     //     content: '图片成功保存到相册了，分享到朋友圈吧',
  //     //     showCancel: false,
  //     //     confirmText: '好哒',
  //     //     success: function (res) {
  //     //       if (res.confirm) {
  //     //         console.log('用户点击确定');
  //     //       }
  //     //     }
  //     //   })
  //     // }
  //     filePath: that.data.FilePath,
  //     //保存成功失败之后，都要隐藏画板，否则影响界面显示。
  //     success: (res) => {
  //       console.log(res)
  //       wx.hideLoading()
  //       that.setData({
  //         share_hidden: true,
  //         canvasHidden: true
  //       })
  //     },
  //     fail: (err) => {
  //       that.setData({
  //         saveImgBtnHidden: true,
  //         openSettingBtnHidden: false
  //       })


  //       console.log(err)
  //       wx.hideLoading()
  //       that.setData({
  //         canvasHidden: true,
  //         share_hidden: true,
  //       })
  //     }

  //   })
  // },

  handleSetting: function (e) {
    let that = this;
    // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      that.setData({
        saveImgBtnHidden: true,
        openSettingBtnHidden: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您已授权，赶紧将图片保存在相册中吧！',
        showCancel: false
      })
      that.setData({
        saveImgBtnHidden: false,
        openSettingBtnHidden: true
      })
    }
  },

  hideShareImg: function(){
    this.setData({
      share_hidden: true
    })
  }

})