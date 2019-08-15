// pages/mission/1/1.js
var touchDot = 0; //触摸时的原点
var time = 0; //  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = ""; // 记录/清理 时间记录
var nthMax = 1; //活动菜单的最大个数
var tmpFlag = true; // 判断左右华东超出菜单最大值时不再执行滑动事件

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array1: ['中共党员', '中共预备党员', '共青团员', '民主党派', "群众"],
    index1: 0,
    array2: ['在校生', '教职工', '校友'],
    index2: 0,
    question_num: 1,
    question: [],
    current_index: 0,
    switch_style: '',
    submit_hidden: true,
    tips_hidden: false,
    time: '99999',
    stop: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    //var 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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



  formSubmit: function(e) {
    var that = this;
    console.log("swss");
    console.log(e.detail.value.identity);
    wx.showModal({
      title: '提示',
      content: '请确保6月12日晚能到山上礼堂参加现场决赛，若无法到场请勿报名。',
      confirmText: '我能到场',
      confirmColor: '#ff0000',
      success: function(res) {
        if (res.confirm) {
          var openid = wx.getStorageSync('openid');
          wx.request({
            url: 'https://dutcmc.com/mp/xiaoshi/backstage/1.0/apply.php',
            data:({
              openid:openid,
              faculty:e.detail.value.faculty,
              identity: e.detail.value.identity,
              name: e.detail.value.name,
              phone: e.detail.value.phone,
              public: e.detail.value.public
            }),
            success:function(res){
              console.log(res)
              wx.showModal({
                title: '报名成功',
                content: '报名成功，祝您取得好成绩！',
                showCancel:false,
                success:function(res){
                  if(res.confirm){
                    wx.redirectTo({
                      url: '../start/start',
                    })
                  }

                }
              })
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    // wx.request({
    //   url: 'https://dutcmc.com/mp/xiaoshi/backstage/1.0/addcoin.php',
    //   data: {
    //     openid: openid,
    //     right: right * 10
    //   },
    // })

  },


  timeCountDown: function() {
    var that = this;
    //console.log(stop);
    var myInterval = setInterval(function() {
      var stop = that.data.stop;
      //console.log(stop);
      if (stop == 'stop') {
        clearInterval(myInterval);
        //console.log(stop);
      } else {
        var time = that.data.time;
        time--;
        // console.log("关卡一" + time);
        if (time < 0) {
          clearInterval(myInterval);
          that.submit();
        } else {
          that.setData({
            time: time
          })
        }
      }
    }, 1000)
  },

  switchQues: function(current_index) {
    var that = this;

    var translate_height = -current_index * 100 + "%";
    //console.log(translate_height);
    var switch_style = "transition: transform 1s, visibility 1s; transform: translate(0," + translate_height + ");";

    that.setData({
      current_index: current_index,
      switch_style: switch_style
    })
  },

  // 触摸开始事件
  touchStart: function(e) {
    touchDot = e.touches[0]; // 获取触摸时的原点
    // 使用js计时器记录时间    
    interval = setInterval(function() {
      time++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function(e) {
    console.log(e)
    var that = this;
    var nth = that.data.current_index;
    var touchMove = e.touches[0];

    //向上滑动
    if (touchMove.pageY - touchDot.pageY <= -40 && time < 10) {
      nth++;
      if (tmpFlag && nth < nthMax) { //每次移动中且滑动时不超过最大值 只执行一次
        tmpFlag = false;
        //console.log(nth);
        that.switchQues(nth);
        that.setData({
          tips_hidden: true
        })
        if (nth + 1 >= nthMax) {
          that.setData({
            submit_hidden: false,
          })
        }
      } else if (tmpFlag && nth >= nthMax) {
        wx.showToast({
          title: '已到最后一题了',
          icon: 'success',
          duration: 1000
        })
        tmpFlag = false;
      } else {

      }
    }
    //向下滑动
    if (touchMove.pageY - touchDot.pageY >= 40 && time < 10) {
      nth--;
      if (tmpFlag && nth >= 0) { //每次移动中且滑动时不超过最大值 只执行一次
        tmpFlag = false;
        //console.log(nth);
        that.switchQues(nth);
        that.setData({
          submit_hidden: true
        })
      } else if (tmpFlag && nth < 0) {
        wx.showToast({
          title: '这是第一题',
          icon: 'success',
          duration: 1000
        })
        tmpFlag = false;
      } else {

      }
    }
    // touchDot = touchMove; //每移动一次把上一次的点作为原点（好像没啥用）
  },
  // 触摸结束事件
  touchEnd: function(e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
    tmpFlag = true; // 回复滑动事件
  },


})