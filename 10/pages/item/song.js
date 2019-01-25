Page({

	/**
	 * 页面的初始数据
	 */
	data: {
        current: 0,
        closeTabBoolean: false,
        openTabBoolean: false,
        songs_msg : {},
        playType: 'icon-bofang',
        isAlreadyPlay: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
        this.audio = wx.getBackgroundAudioManager();
        this.globalData = getApp().globalData;
        this.setData({
            songs_msg: {
                src: 'https://api.bzqll.com/music/tencent/url?key=579621905&id=003neI902C7eqX',
                title: 'Sing Me to Sleep',
                epName:	'Sing Me to Sleep',
                singer:	'Alan Walker',
                coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R90x90M0000032bxR52m4cgY.jpg',
                song_mid: '003neI902C7eqX',
                song_big: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000032bxR52m4cgY.jpg'
            }
        });
        const addEvents = ['onError', 'onWaiting', 'onCanplay', 'onPause', 'onSeeking', 'onTimeUpdate', 'onEnded', 'onNext', 'onPrev'];
        const trigger = e => {
            Reflect.apply(this.audio[e], this, [(...argument) => {
                Reflect.has(this, e) && Reflect.apply(this[e], this, argument);
            }]);
        };
        addEvents.forEach(trigger);
	},
    closeTab(){
        this.setData({
            openTabBoolean: true,
            closeTabBoolean: false
        });
    },
    openTab(){
	    this.setData({
            closeTabBoolean: true,
            openTabBoolean: false,
        })
    },
    onPlay(){
	    if (!this.data.isAlreadyPlay) {
            this.audio.src = this.data.songs_msg.src;
            this.audio.title = this.data.songs_msg.title;
            this.setData({
                isAlreadyPlay: true,
                playType: 'icon-zanting'
            })
            return false;
        }
	    if (this.data.playType === 'icon-zanting') {
            this.setData({
                playType: 'icon-bofang'
            });
            this.audio.pause();

        } else {
            this.audio.play();
            this.setData({
                playType: 'icon-zanting'
            });
        }
    },
    onTimeUpdate(){
        const update = {
            duration: this.audio.duration,
            currentTime: this.audio.currentTime,
            paused: this.audio.paused,
            buffered: this.audio.buffered
        };
        let obj = Object.assign(this.data.songs_msg, update);
        this.setData({
            songs_msg: obj
        });
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