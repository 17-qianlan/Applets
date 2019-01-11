import until from "../../untils/untils";
import dataJson from '../../untils/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timestamp: '',
    picker: [],
    msg: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let val = options;
    let requestDate = until.requestDate();
    requestDate.then(({ header }) => {
      console.log(new Date(header.Date));
      let date = until.toDate(new Date(header.Date));
      this.sendDate(date.dateTime);
      console.log(date.formatterDateTime);
      this.ReceiveData(val, date.formatterDateTime);
    }).catch(err => {
      console.log(err);
    })
  },
  // 发送请求, 返回一个Promise
  sendDate(date){
    this.setData({
      timestamp: date
    })
  },
  ReceiveData(val, date){
    let requestPromise = until.trainRequest(val, date);
    requestPromise.then(data => {
      let body = data.data["showapi_res_body"];
      let {trains} = body;
      let {msg} = body;
      if (msg === '查询失败,未找到相关信息!'){
        this.setData({
          msg: true
        })
      } else {
        let train = body.trains;
        this.setData({
          picker: until.arrange(train)
        })
        // console.log(this.data.picker);
      }
    }).catch( err => {
      console.log(err);
    });
    /*this.setData({
      picker: until.arrange(dataJson.train)
    })*/
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