import until from "../../untils/untils";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timestamp: '',
    picker: {
      beginCity:"重庆西",
      endCity:"昆明南",
      fromCity:"重庆西",
      fromTime:"14:02",
      num:"G2877",
      ticketInfo:{
        firstseat:{
          downPrice:0,
          midPrice:0,
          price:564,
          ticketName:"一等座",
          ticketNum:"19",
          upPrice:0,
        },
        secondseat:{
          downPrice:0,
          midPrice:0,
          price:341.5,
          ticketName:"二等座",
          ticketNum:"0",
          upPrice:0,
        },
        specialseat:{
          downPrice:0,
          midPrice:0,
          price:636.5,
          ticketName:"特等座",
          ticketNum:"0",
          upPrice:0,
        }
      },
      toCity:"昆明南",
      toTime:"19:02",
      usedTime:300,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let val = options;
    let requestDate = until.requestDate();
    requestDate.then(({ header }) => {
      let date = until.toDate(0,new Date(header.Date))
      this.sendDate(date);
    }).catch(err => {
      console.log(err);
    })
    let requestPromise = until.trainRequest(val, this.data.timestamp);
    requestPromise.then(data => {
      console.log(data);
      /*let body = data["showapi_res_body"];
      let train = body.trains;
      console.log(body);
      console.log(train);*/
    }).catch( err => {
      console.log(err);
    });
  },
  // 发送请求, 返回一个Promise
  sendDate(date){
    this.setData({
      timestamp: date
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

  }
})