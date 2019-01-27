import {urlType, sheet, region} from '../../common/url-type';
import Audio from "../../lib/Audio";
import AudioStorage from "../../model/StorageSong";
const audioStorage = new AudioStorage('audio_storage');
let app = getApp();
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
    stock: false,
    playType: 'player'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    });
    let all = audioStorage.all();
    if (all === undefined) return false;
    // 本地数据获取
    {
      all.forEach(item => {
        const data = item.data;
        if (Array.isArray(data)) {
          this.setData({
            songs_item: data,
            songs: data
          });
        } else if (/object/i.test(typeof data)) {
          this.setData({
            songs_list: data
          });
        };
      })
    }
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
    this.data.songs_item.push(...data.songs);
    this.setData({
      songs_item: this.data.songs
    });
    wx.hideLoading();
  },
  playerSong(event) {
    const dataset = event.currentTarget.dataset;
    Audio.setSong(dataset.song, dataset.songs);
    console.log(2);
    this.setData({
      songs_list: dataset.song,
      playType: 'pause'
    });
  },
  onPlay(event){
    const dataset = event.currentTarget.dataset;
    if (this.audio.paused === undefined) {// 从未点击过播放
      Audio.setSong(dataset.song, this.data.songs);
      this.setData({
        playType: 'pause'
      })
    } else if (this.audio.paused === false) {// 表示已经开始播放了
      this.audio.pause();
      this.setData({
        playType: 'player',
      })
    } else {// 表示已经暂停了要继续播放
      this.audio.play();
      this.setData({
        playType: 'pause',
      })
    }
  },
  detailsPlay(event){
    const dataset = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/item/song?song_mid=' + dataset.song['song_mid']
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