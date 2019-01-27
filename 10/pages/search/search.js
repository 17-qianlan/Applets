import StorageSong from '../../model/StorageSong.js';
import Audio from '../../lib/Audio.js';
const $storageSong = new StorageSong('songs');
import Storage from '../../model/StorageSong.js';
const audioStorage = new Storage('audio_storage');// 存到数据库的库名
Page({
    /**
     * 页面的初始数据
     */
    data: {
        q: '',
        history: [],
        playType: 'player'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.audio = Audio.audio;
        wx.setNavigationBarTitle({
            title: '搜索'
        });
        if (!this.audio.paused ) {
            // this.audio.paused表示已经开始播放了
            this.setData({
                playType: 'pause'
            })
        }
        this.update();
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
    update() {
        this.setData({
            history: $storageSong.all(),
            q: ''
        });
    },
    del(event) {
        const name = event.currentTarget.dataset.name;
        $storageSong.delete(name);
        this.update();
    },
    playerSong(event) {
        const dataset = event.currentTarget.dataset;
        Audio.setSong(dataset.song, dataset.songs);
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