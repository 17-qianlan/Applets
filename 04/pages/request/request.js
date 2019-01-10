import until from '../../untils/untils.js';// 绝对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toDate: '',
    start: '',
    chanceStartTime: '',
    chanceEndTime: '',
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let requestDate = until.requestDate();
    requestDate.then(({ header }) => {
      let date = until.toDate(0,new Date(header.Date))
      this.initDate(date);
    }).catch(err => {
      console.log(err);
    })
  },
  //选择后触发
  bindDateChange(e){
    let val = e.detail.value;
    this.setData({
      chanceStartTime: val,
      start: val,
      chanceEndTime: val
    })
  },
  bindDateEndChange(e) {
    let val = e.detail.value;
    this.setData({
      chanceEndTime: val
    })
  },
  query(e){
    let val = e.detail.value;
    let arr = Object.values(val).filter(item => item);
    if (arr.length > 3) {
      let url = this.codeUrl(val);
      wx.navigateTo({
        url : '/pages/list/list?' + url
      })
    }
  },
  initDate(date){
    this.setData({
      start: date,
      endTime: date
    })
  },
  // 发送请求
  codeUrl(val){
    return Object.keys(val).map(item => item + '=' + val[item]).join('&');

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