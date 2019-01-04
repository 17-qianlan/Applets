// pages/study/study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'this is a text'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      text: 'changed text'
    })
  },
  /**
   * 记住一个点: 是先显示才会开始渲染的,
   * Page只相当于一个函数, 可以改, 在里面调用this时就是Pages
   */
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
   * 生命周期函数--监听页面隐藏,
   * 页面隐藏,则是用户准备跳转到另一个页面是触发的, 相当于路由离开时触发的
   * 离开时触发
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   * 页面最多可以挂载5页(叠加), 超过5页则开始卸载,则会触发此函数
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("用户正在下拉并已经开始刷新了");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("用户已经触底了, 可以开始做一些事情了");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("用户已经开始发送链接并准备分享了,可以考虑给用户一些奖赏了");
  }
})