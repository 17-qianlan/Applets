let URL = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj'
/*{
  //请求参数, 类型全部是Number
  queryEnc: "",//关键字
  queryExt: "",//关键字
  listNum: "总页数",
  display: "总结果",
  pn: 30,//结果页数
  rn: 30,//显示页的数目
  width: ,
  height: ,
  face: ,
  istype: 2,
  tn:'baidulocal'//百度内搜索
}*/
// pages/request/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wd: '狗',
    pn: 30,
    rn: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestUrl();
  },
  requestUrl(){
    let codeUrl = `${URL}&pn=${this.data.pn}&rn=${this.data.rn}&wd=${this.data.wd}`;
    console.log(codeUrl);
    wx.request({
      url: codeUrl,
      success({ data }){
        console.log(data);
      },
      fail(err){
        console.log(err);
      }
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