import {urlType, sheet, region} from '../../common/url-type';
import Audio from '../../lib/Audio.js';
import Storage from '../../model/StorageSong.js';
import StorageSong from '../../model/StorageSong.js';
const $storageSong = new StorageSong('songs');

const audioStorage = new Storage('audio_storage');// 存到数据库的库名
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        songs_item: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.audio = Audio.audio;
        this.setData({
            requestUrl: {
                name: options.name
            }
        });
        if (!this.audio.paused ) {
            // this.audio.paused表示已经开始播放了
            this.setData({
                playType: 'pause'
            })
        }
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
            });
            if (!this.data.songs && this.data.songs_list) {
                this.setData({
                    songs: [this.data.songs_list]
                })
            }
        }
    },
    playerSong(event) {// 点击歌曲播放, 需要保存歌单数据
        const dataset = event.currentTarget.dataset;
        Audio.setSong(dataset.song, dataset.songs);
        this.setData({
            songs_list: dataset.song,
            playType: 'pause'
        });
    },
    onPlay(event){// 点击按钮播放, 需要获取本地歌单数据
        const dataset = event.currentTarget.dataset;
        if (this.audio.paused === undefined) {// 从未点击过播放
            // this.data.songs为空, 表示本地缓存为空, 在用户没有点歌曲详情播放的时候, 这里不会执行
            // 如果用户点击按钮播放, 那么应该给个当前的数据, 然后保存到本地
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
    submitSearch(event) {
        let q = event.detail.value.sheet;
        if (/^\s*$/.test(q)) {
            wx.showToast({
                icon: 'none',
                title: '搜索不可以为空'
            })
            return false;
        };
        $storageSong.add(q);
        wx.navigateTo({
            url: '/pages/search/list?name=' + q
        })
        this.update();
    },
    requestData() {
        if (this.data.stock) {
            wx.showToast({
                icon: 'none',
                title: '没有更多了'
            })
        }
        ;
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
    codeData({data}) {
        if (data.count_page <= data.curr_page) {
            this.setData({
                stock: true
            })
        };
        this.data.songs_item.push(...data.songs);
        this.setData({
            songs_item: this.data.songs_item
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