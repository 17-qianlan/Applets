// pages/template/image.js
let URL = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&';
//word=狗
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    height: [],
    wd: '',
    pn: 30,
    rn: 30,
    list: 4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request();
    this.formatData();
  },
  //准备和格式化数据格式
  formatData(){
    this.data.images = new Array(this.data.list).fill([]).map( () => []);
    this.data.height = new Array(this.data.list).fill(0);
    let min = Math.min(...this.data.height);
  },
  //整合url, 准备请求
  request(){
    let url = URL + 'pn'+this.data.pn+'&rn='+this.data.rn+'&wd='+(this.data.wd || '狗狗');
    console.log(url);
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