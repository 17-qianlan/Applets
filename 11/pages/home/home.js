import {urlType, sheet, region} from '../../common/url-type';
import AudioStorage from "../../model/StorageSong";
import Audio from '../../lib/Audio.js';
import Banner from '../../model/Banner.js';
import music from '../../model/Music.js';
import request from '../../model/request.js';
let app = getApp();
const banner = new Banner();
const audioStorage = new AudioStorage('audio_storage');
Page(Object.assign({

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
        songs_list: {},
        playType: 'icon-qiyong',
        isFirst: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.audio = Audio.audio;
        banner.getBanner().then(data => {
            this.setData({
                banner: data
            });
        });
        this.setData({assort: region});
        // 这里的url只使用了一次, 所以可以直接设置到页面数据, 不比做其他的判断
        this.setData({
            url: urlType.topid + this.data.requestUrl.id + '/p/' + this.data.page + '/r/' + this.data.row
        });
        this.getSheet().then(this.setSheets.bind(this));
        audioStorage.getLocalSongsData(this);
    },
    morePage() {
        this.data.page++;
        this.requestData().then(this.codeData.bind(this));
    },
    actionsBanner(event) {
        const action = event.currentTarget.dataset.action;
        if (action.atype === 0) {
            wx.navigateTo({
                url: '/pages/list/list?id=' + action.data.id + '&name=' + action.data.name
            });
        }
    },
    // 获取歌单
    getSheet() {
        const sheetPromise = [];
        sheet.forEach(item => {
            const p = new Promise((resolve, reject) => {
                wx.request({
                    url: urlType.topid + item.id,
                    success: resolve,
                    fail: reject
                })
            });
            sheetPromise.push(p);
        });
        return Promise.all(sheetPromise);
    },
    setSheets(argument) {
        const sheetData = [];
        argument.forEach((data, index) => {
            sheetData.push(Object.assign({
                songs: data.data.songs
            }, sheet[index]));
        })
        this.setData({
            song: sheetData
        })
        // console.log(this.data.song);
    }
    /*/!**
     * 生命周期函数--监听页面初次渲染完成
     *!/
    onReady: function () {

    },

    /!**
     * 生命周期函数--监听页面显示
     *!/
    onShow: function () {

    },

    /!**
     * 生命周期函数--监听页面隐藏
     *!/
    onHide: function () {

    },

    /!**
     * 生命周期函数--监听页面卸载
     *!/
    onUnload: function () {

    },

    /!**
     * 页面相关事件处理函数--监听用户下拉动作
     *!/
    onPullDownRefresh: function () {

    },

    /!**
     * 页面上拉触底事件的处理函数
     *!/
    onReachBottom: function () {

    },

    /!**
     * 用户点击右上角分享
     *!/
    onShareAppMessage: function () {

    }*/
}, music, request));