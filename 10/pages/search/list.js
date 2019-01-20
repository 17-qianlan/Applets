import {urlType, sheet, region} from '../../common/url-type';
import Audio from '../../lib/Audio.js';
import Storage from '../../model/StorageSong.js';
const audioStorage = new Storage('audio_storage');// 存到数据库的库名
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: [],
    songsList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      requestUrl: {
        name: options.name
      }
    });
    let all = audioStorage.all();
    this.setData({
      songsList: all[all.length-1]
    });
    this.requestData().then(this.codeData.bind(this)).catch(err => {
      console.log(err);
    });
    wx.setNavigationBarTitle({
      title: this.data.requestUrl.name
    });
  },
  playerSong(event){
    const dataset = event.currentTarget.dataset;
    Audio.setSong(dataset.msg);
    this.setData({
      songsList: app.globalData.songsList
    });
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
    console.log(url);
    this.setData({
      url
    });
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