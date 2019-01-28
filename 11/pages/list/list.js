import {urlType, sheet, region} from '../../common/url-type';
import Audio from "../../lib/Audio";
import AudioStorage from "../../model/StorageSong";
import music from '../../model/Music.js';
import request from '../../model/request.js';

const audioStorage = new AudioStorage('audio_storage');
let app = getApp();
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
        playType: 'icon-bofang'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.audio = Audio.audio;
        this.setData({
            requestUrl: {
                id: options.id,
                name: options.name
            }
        });
        this.requestData().then(this.codeData.bind(this)).catch(err => {
            console.log(err);
        });
        // 标题
        wx.setNavigationBarTitle({
            title: this.data.requestUrl.name
        });
        audioStorage.getLocalSongsData(this);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /*/!**
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