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
      let date = until.toDate(0,new Date(header.Date));
      console.log(date);
      this.sendDate(date);
    }).catch(err => {
      console.log(err);
    })
    this.ReceiveData(val);
  },
  // 发送请求, 返回一个Promise
  sendDate(date){
    this.setData({
      timestamp: date
    })
  },
  ReceiveData(val){
    let requestPromise = until.trainRequest(val, this.data.timestamp);
    requestPromise.then(({data}) => {
      console.log(data);
      let body = data["showapi_res_body"];
      let {msg} = body;
      if (msg === '查询失败,未找到相关信息!'){
        this.setData({
          msg: true
        })
      } else {
        let train = body.trains;
        this.setData({
          picker: train
        })
        console.log(this.data.picker);
      }
    }).catch( err => {
      console.log(err);
    });
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