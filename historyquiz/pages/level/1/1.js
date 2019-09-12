// pages/mission/1/1.js
const URL_submit = require('../../../config').URL_submit;
const URL_addcoin = require('../../../config').URL_addcoin;

var touchDot = 0; //触摸时的原点
var time = 0; //  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = ""; // 记录/清理 时间记录
var nthMax = 5; //活动菜单的最大个数
var tmpFlag = true; // 判断左右华东超出菜单最大值时不再执行滑动事件

Page({
  /**
   * 页面的初始数据
   */
  data: {
    question_num: 5,
    question: [],
    current_index: 0,
    switch_style: '',
    submit_hidden: true,
    tips_hidden: false,
    time: '900',
    stop: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    that.fillQues();
    that.timeCountDown();
    //var 
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
    this.setData({
      stop: 'stop',
    })
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

  fillQues: function() {
    var that = this;
    try {
      var question_id = wx.getStorageSync('questionID')
    } catch (e) {
      // Do something when catch error
    }
    try {
      var question_array = wx.getStorageSync('questionArray')
    } catch (e) {
      // Do something when catch error
    }

    //console.log(question_id);
    //console.log(question_array);

    var question = Array();
    var question_num = that.data.question_num;
    for (var i = 0; i < question_num; i++) {
      var id = Math.floor(Math.random() * 590) + 1;
      if (question_array[id - 1][8] == 1) {
        var question_item = {
          type: question_array[id - 1][8],
          index: '',
          id: '',
          q: '',
          a: '',
          b: '',
          c: '',
          d: '',
          right: '',
          choose: '',
          a_icon: '/images/a.png',
          b_icon: '/images/b.png',
          c_icon: '/images/c.png',
          d_icon: '/images/d.png',
        }
        // var id = question_id[i];
        question_item['index'] = i;
        question_item['id'] = id;
        question_item['q'] = question_array[id - 1][1];
        question_item['a'] = question_array[id - 1][2];
        question_item['b'] = question_array[id - 1][3];
        question_item['c'] = question_array[id - 1][4];
        question_item['d'] = question_array[id - 1][5];
        question_item['right'] = question_array[id - 1][7];
        question_item['choose'] = '';
        question[i] = question_item;
      } else if (question_array[id - 1][8] == 2) {
        var question_item = {
          type: question_array[id - 1][8],
          index: '',
          id: '',
          q: '',
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          right: '',
          choose: '',
          a_icon: '/images/a.png',
          b_icon: '/images/b.png',
          c_icon: '/images/c.png',
          d_icon: '/images/d.png',
          e_icon: '/images/e.png',
        }
        // var id = question_id[i];
        question_item['index'] = i;
        question_item['id'] = id;
        question_item['q'] = question_array[id - 1][1];
        question_item['a'] = question_array[id - 1][2];
        question_item['b'] = question_array[id - 1][3];
        question_item['c'] = question_array[id - 1][4];
        question_item['d'] = question_array[id - 1][5];
        question_item['e'] = question_array[id - 1][6];
        question_item['right'] = question_array[id - 1][7];
        question_item['choose'] = '';
        question[i] = question_item;

      } else if (question_array[id - 1][8] == 3) {
        var question_item = {
          type: question_array[id - 1][8],
          index: '',
          id: '',
          q: '',
          a: '',
          b: '',
          c: '',
          d: '',
          right: '',
          choose: '',
          a_icon: '/images/a.png',
          b_icon: '/images/b.png',
          c_icon: '/images/c.png',
          d_icon: '/images/d.png',
        }
        // var id = question_id[i];
        question_item['index'] = i;
        question_item['id'] = id;
        question_item['q'] = question_array[id - 1][1];
        question_item['a'] = question_array[id - 1][2];
        question_item['b'] = question_array[id - 1][3];
        question_item['c'] = question_array[id - 1][4];
        question_item['d'] = question_array[id - 1][5];
        question_item['right'] = question_array[id - 1][7];
        question_item['choose'] = '';
        question[i] = question_item;
      } else if (question_array[id - 1][8] == 4) {
        var question_item = {
          type: question_array[id - 1][8],
          index: '',
          id: '',
          q: '',
          t: '',
          f: '',
          right: '',
          choose: '',
          t_icon: '/images/t.png',
          f_icon: '/images/f.png',
        }
        // var id = question_id[i];
        question_item['index'] = i;
        question_item['id'] = id;
        question_item['q'] = question_array[id - 1][1];
        question_item['t'] = '正确';
        question_item['f'] = '错误';
        question_item['right'] = question_array[id - 1][7];
        question_item['choose'] = '';
        question[i] = question_item;
      } else if (question_array[id - 1][8] == 5) {
        var question_item = {
          type: question_array[id - 1][8],
          index: '',
          id: '',
          q: '',
          a: '',
          right: '',
          choose: '',
        }
        // var id = question_id[i];
        question_item['index'] = i;
        question_item['id'] = id;
        question_item['q'] = question_array[id - 1][1];
        question_item['a'] = question_array[id - 1][2];
        question_item['right'] = question_array[id - 1][7];
        question_item['choose'] = '';
        question[i] = question_item;
      }

    }
    //console.log(question);
    that.setData({
      question: question
    })
  },

  choose: function(e) {
    //console.log(e);
    var that = this;
    var question = that.data.question;
    //console.log(question);
    if (e.currentTarget.dataset.option == 'A') {
      question[e.currentTarget.dataset.index]['choose'] = 'A';
      question[e.currentTarget.dataset.index]['a_icon'] = '/images/as.png';
      question[e.currentTarget.dataset.index]['b_icon'] = '/images/b.png';
      question[e.currentTarget.dataset.index]['c_icon'] = '/images/c.png';
      question[e.currentTarget.dataset.index]['d_icon'] = '/images/d.png';
    } else if (e.currentTarget.dataset.option == 'B') {
      question[e.currentTarget.dataset.index]['choose'] = 'B';
      question[e.currentTarget.dataset.index]['a_icon'] = '/images/a.png';
      question[e.currentTarget.dataset.index]['b_icon'] = '/images/bs.png';
      question[e.currentTarget.dataset.index]['c_icon'] = '/images/c.png';
      question[e.currentTarget.dataset.index]['d_icon'] = '/images/d.png';
    } else if (e.currentTarget.dataset.option == 'C') {
      question[e.currentTarget.dataset.index]['choose'] = 'C';
      question[e.currentTarget.dataset.index]['a_icon'] = '/images/a.png';
      question[e.currentTarget.dataset.index]['b_icon'] = '/images/b.png';
      question[e.currentTarget.dataset.index]['c_icon'] = '/images/cs.png';
      question[e.currentTarget.dataset.index]['d_icon'] = '/images/d.png';
    } else {
      question[e.currentTarget.dataset.index]['choose'] = 'D';
      question[e.currentTarget.dataset.index]['a_icon'] = '/images/a.png';
      question[e.currentTarget.dataset.index]['b_icon'] = '/images/b.png';
      question[e.currentTarget.dataset.index]['c_icon'] = '/images/c.png';
      question[e.currentTarget.dataset.index]['d_icon'] = '/images/ds.png';
    }

    that.setData({
      question: question
    })

  },

  fivechoose: function(e) {
    //console.log(e);
    var that = this;
    var question = that.data.question;
    //console.log(question);
    var ifchosen = that.isChoose(e.currentTarget.dataset.index, e.currentTarget.dataset.option);
    console.log(ifchosen)
    if (ifchosen == -1) {
      that.insertChoose(e.currentTarget.dataset.index, e.currentTarget.dataset.option)
      if (e.currentTarget.dataset.option == 'A') {
        question[e.currentTarget.dataset.index]['a_icon'] = '/images/as.png';

      } else if (e.currentTarget.dataset.option == 'B') {
        question[e.currentTarget.dataset.index]['b_icon'] = '/images/bs.png';

      } else if (e.currentTarget.dataset.option == 'C') {
        question[e.currentTarget.dataset.index]['c_icon'] = '/images/cs.png';
      } else if (e.currentTarget.dataset.option == 'D') {
        question[e.currentTarget.dataset.index]['d_icon'] = '/images/ds.png';
      } else {
        question[e.currentTarget.dataset.index]['e_icon'] = '/images/es.png';
      }
    } else {
      that.cancelChoose(e.currentTarget.dataset.index, e.currentTarget.dataset.option)
      if (e.currentTarget.dataset.option == 'A') {
        question[e.currentTarget.dataset.index]['a_icon'] = '/images/a.png';

      } else if (e.currentTarget.dataset.option == 'B') {
        question[e.currentTarget.dataset.index]['b_icon'] = '/images/b.png';

      } else if (e.currentTarget.dataset.option == 'C') {
        question[e.currentTarget.dataset.index]['c_icon'] = '/images/c.png';
      } else if (e.currentTarget.dataset.option == 'D') {
        question[e.currentTarget.dataset.index]['d_icon'] = '/images/d.png';
      } else {
        question[e.currentTarget.dataset.index]['e_icon'] = '/images/e.png';
      }
    }
    that.setData({
      question: question
    })

  },

  fourchoose: function(e) {
    //console.log(e);
    var that = this;
    var question = that.data.question;
    //console.log(question);
    var ifchosen = that.isChoose(e.currentTarget.dataset.index, e.currentTarget.dataset.option);
    console.log(ifchosen)
    if (ifchosen == -1) {
      that.insertChoose(e.currentTarget.dataset.index, e.currentTarget.dataset.option)
      if (e.currentTarget.dataset.option == 'A') {
        question[e.currentTarget.dataset.index]['a_icon'] = '/images/as.png';

      } else if (e.currentTarget.dataset.option == 'B') {
        question[e.currentTarget.dataset.index]['b_icon'] = '/images/bs.png';

      } else if (e.currentTarget.dataset.option == 'C') {
        question[e.currentTarget.dataset.index]['c_icon'] = '/images/cs.png';
      } else {
        question[e.currentTarget.dataset.index]['d_icon'] = '/images/ds.png';
      }
    } else {
      that.cancelChoose(e.currentTarget.dataset.index, e.currentTarget.dataset.option)
      if (e.currentTarget.dataset.option == 'A') {
        question[e.currentTarget.dataset.index]['a_icon'] = '/images/a.png';

      } else if (e.currentTarget.dataset.option == 'B') {
        question[e.currentTarget.dataset.index]['b_icon'] = '/images/b.png';

      } else if (e.currentTarget.dataset.option == 'C') {
        question[e.currentTarget.dataset.index]['c_icon'] = '/images/c.png';
      } else {
        question[e.currentTarget.dataset.index]['d_icon'] = '/images/d.png';
      }
    }
    that.setData({
      question: question
    })

  },

  judgechoose: function(e) {
    //console.log(e);
    var that = this;
    var question = that.data.question;
    //console.log(question);
    if (e.currentTarget.dataset.option == 't') {
      question[e.currentTarget.dataset.index]['choose'] = 't';
      question[e.currentTarget.dataset.index]['t_icon'] = '/images/ts.png';
      question[e.currentTarget.dataset.index]['f_icon'] = '/images/f.png';
    } else if (e.currentTarget.dataset.option == 'f') {
      question[e.currentTarget.dataset.index]['choose'] = 'f';
      question[e.currentTarget.dataset.index]['t_icon'] = '/images/t.png';
      question[e.currentTarget.dataset.index]['f_icon'] = '/images/fs.png';
    }

    that.setData({
      question: question
    })

  },

  inputvalue: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
    var question = that.data.question;
    var nowvalue = e.detail.value
    console.log(nowvalue)
    question[e.currentTarget.dataset.index]['choose'] = nowvalue
    that.setData({
      question: question
    })

  },

  isChoose: function(index, option) {
    console.log(index)
    console.log(option)
    var that = this;
    var chosen = that.data.question[index]['choose'];
    console.log(chosen)
    var nowindex = chosen.lastIndexOf(option);
    console.log(nowindex)
    return nowindex;
  },

  insertChoose: function(index, option) {
    console.log(index)
    console.log(option)
    var that = this;
    var question = that.data.question;
    var chosen = question[index]['choose'];
    if (chosen == "" || chosen == null || chosen == undefined) { // "",null,undefined
      console.log("为空");
      question[index]['choose'] = option;
    } else {
      var finalindex = 0;
      for (var i = 0; i < chosen.length; i++) {
        console.log(chosen[i])
        if (option > chosen[i]) {
          finalindex = i;
        }
      }
      if (finalindex == 0) {
        if (option > chosen[finalindex]) {
          chosen = chosen.slice(0, finalindex + 1) + option + chosen.slice(finalindex + 1) //'abcde'
        } else {
          chosen = chosen.slice(0, finalindex) + option + chosen.slice(finalindex) //'abcde'
        }
      } else {
        chosen = chosen.slice(0, finalindex + 1) + option + chosen.slice(finalindex + 1) //'abcde'
      }
      console.log(chosen)
      question[index]['choose'] = chosen;
    }
    that.setData({
      question: question
    })
  },

  cancelChoose: function(index, option) {
    var that = this;
    var question = that.data.question;
    var chosen = question[index]['choose'];
    chosen = chosen.replace(option, "");
    console.log(chosen)
    question[index]['choose'] = chosen;
    that.setData({
      question: question
    })
  },


  submit: function(e) {
    var that = this;
    var question = that.data.question;
    console.log(question);
    var right = 0;
    for (var i = 0; i < question.length; i++) {
      if (question[i]['choose'] == question[i]['right']) {
        right++;
      }
    }
    try {
      var openid = wx.getStorageSync('openid')
    } catch (e) {
      // Do something when catch error
    }
    console.log(right);
    wx.request({
      url: URL_submit,
      data: {
        openid: openid,
        level: 1,
        right: right
      },
      success: function(res) {
        console.log(res.data);
        var content = "您答对了" + right + "道题，获得了" + right * 10 + "个金币，点击确认返回主菜单";
        wx.showModal({
          title: '提示',
          content: content,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              //console.log('用户点击确定')
              wx.redirectTo({
                url: '/pages/index/index',
              })
            } else if (res.cancel) {
              //console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.request({
      url: URL_addcoin,
      data: {
        openid: openid,
        right: right * 10
      },
    })

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