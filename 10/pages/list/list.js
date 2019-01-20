import {urlType, sheet, region} from '../../common/url-type';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    page: 1,
    row: 20,
    songs: [],
    banner: [],
    requestUrl: {},
    stock: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      requestUrl: {
        id: options.id,
        name: options.name
      }
    });
    this.requestData().then(this.codeData.bind(this)).catch(err => {
      console.log(err);
    });
    wx.setNavigationBarTitle({
      title: this.data.requestUrl.name
    })
  },
  requestData() {
    if (this.data.stock) {
      wx.showToast({
        icon: 'none',
        title: '没有更多了'
      })
    };
    let url = '';
    if (/^\d{3,}/.test(this.data.requestUrl.id) || !this.data.requestUrl.id) {
      url = urlType.query + this.data.requestUrl.name;
    } else {
      url = urlType.topid + this.data.requestUrl.id + '/p/' + this.data.page + '/r/' + this.data.row;
    }
    this.setData({
      url
    });
    console.log(this.data.url);
    wx.showLoading({
      title: 'loading'
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.data.url,
        success: resolve,
        fail: reject
      })
    })
  },
  codeData({data}){
    if (data.count_page <= data.curr_page) {
      this.setData({
        stock: true
      })
    };
    this.data.songs.push(...data.songs);
    this.setData({
      songs: this.data.songs
    });
    wx.hideLoading();
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