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
        songsList: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        wx.setNavigationBarTitle({
            title: '搜索'
        });
        let all = audioStorage.all();
        if (all.length) {
            console.log(all.length);
            this.setData({
                songsList: all[all.length - 1].data
            });
        }
        this.update();
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
        let song = event.currentTarget.dataset.id;
        Audio.setSong(song);
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