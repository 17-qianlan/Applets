import StorageSongs from '../../model/StorageSong.js';
const audioStorage = new StorageSongs('audio_storage');
import Audio from '../../lib/Audio.js';
import {urlType} from "../../common/url-type.js";

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
        isAlreadyPlay: false,
        isLyrics: 'singer',
        lyric_item: {
            current: 0,
            multiple: 10,
            currentIndex: 0,
            duration: 300
        }
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
        // const mid = options.song_mid;
        this.audio = Audio.audio;
        this.lyric_item = this.data.lyric_item;
        if (this.audio.paused === false) {// 条件判断必须这么写
            // this.audio.paused表示已经开始播放了
            this.setData({
                playType: 'icon-zanting'
            });
        }
        const addEvents = ['onError', 'onWaiting', 'onCanplay', 'onPause', 'onSeeking', 'onTimeUpdate', 'onEnded', 'onNext', 'onPrev'];
        const trigger = e => {
            // 这里注意this指向问题
            Reflect.apply(this.audio[e], this, [(...argument) => {
                Reflect.has(this, e) && Reflect.apply(this[e], this, argument);
            }]);
        };
        addEvents.forEach(trigger);

        // 标题颜色
        //wx.setNavigationBarColor()
        let all = audioStorage.all();
        if (all === undefined) return false;
        // 本地数据获取 在需要本地缓存里的数据时, 请把他们都写到这的后面去, 这样才可以获取到数据
        {
            let index = 0;
            if (Array.isArray(all[index].data)) {
                this.setData({
                    songs_item: all[index].data
                });
            };
            ++index;
            if (/object/i.test(typeof all[index].data)) {
                this.setData({
                    songs_list: all[index].data
                });
            };
        }
        // 标题
        wx.setNavigationBarTitle({
            title: this.data.songs_list.title
        });
	    if (this.data.songs_item) {
            this.setData({
                current: this.data.songs_item.findIndex(item => {
                    return this.data.songs_list.title === item.song_name;
                })
            })
        }
        this.requestLyrics();
    },
    switchTab(){
        console.log(1);
        this.setData({
            isLyrics: this.data.isLyrics === 'singer'? 'singer' : 'lyrics'
        })
    },
    closeTab(){
        this.setData({
            openTabBoolean: true,
            closeTabBoolean: false
        });
    },
    setSeek(event){
        const time = event.detail.value;
        this.audio.seek(time);
    },
    openTab(){
	    this.setData({
            closeTabBoolean: true,
            openTabBoolean: false,
        })
    },
    onPlay(event){
	    // audio.paused === undefined true表示没有开始播放 false表示已经开始播放了
        if (this.audio.paused === undefined) {
            const dataset = event.currentTarget.dataset;
            if (!dataset.song) {
                // 这里边只可以是第一次点击播放本地缓存的才行, 只要切换歌曲就不可以再执行里边的代码了
                Audio.setSong(this.data.songs_list, this.data.songs_msg);
                this.setData({
                    playType: 'icon-zanting'
                })
            } else {
                this.setData({
                    songs_list: dataset.song
                })
                wx.setNavigationBarTitle({
                    title: this.data.songs_list.title
                })
                Audio.setSong(dataset.song, dataset.songs);
                // this.closeTab();
                this.setData({
                    playType: 'icon-zanting'
                })
            }
        } else if (this.audio.paused === true) {// 播放暂停, 需要重新开始播放
            this.audio.play();
            this.setData({
                playType: 'icon-zanting'
            })
        } else {
            this.audio.pause();
            this.setData({
                playType: 'icon-bofang'
            })
        }
    },
    playerSong(event) {
        const dataset = event.currentTarget.dataset;
        Audio.setSong(dataset.song, dataset.songs);
        this.setData({
            songs_list: dataset.song,
            playType: 'pause'
        });
        this.setData({
            current: dataset.songs.findIndex(item => {
                return dataset.song.song_name === item.song_name;
            })
        })
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
        if (!this.data.lyrics && !this.data.lyrics[0]) {
            return false;
        };
        // 歌曲开始播放所获取的秒数, 但是歌词返回的是毫秒数, 所以要乘以1000, 并取整
        let currentTime = ~~(this.audio.currentTime*1000);
        let currentIndex = this.data.lyrics.findIndex(item => {
            return item.millisecond >= currentTime;
        });
        const lyrics = this.data.lyrics;
        const len = lyrics.length-1;
        if (currentTime >= lyrics[len].millisecond) {
            currentIndex = len;
        } else {
            currentIndex = Math.max(0, --currentIndex);
        }
        let current = Math.max(0, currentIndex - ~~(this.lyric_item.multiple/2));
        // 是否到达最后一页
        current = Math.min(current, len+1 - this.lyric_item.multiple);
        this.setData({
            lyric_item: Object.assign(this.lyric_item, {currentIndex, current})
        })
    },
    nextPlay(){
        const len = this.data.songs_item.length;
        this.setData({
            current: len-2 < this.data.current? 0 : ++this.data.current
        });
        Audio.setSong(this.data.songs_item[this.data.current], this.data.songs_item);
    },
    prevPlay(){
        const len = this.data.songs_item.length;
        this.setData({
            current: this.data.current === 0 ? len-1 : --this.data.current
        });
        Audio.setSong(this.data.songs_item[this.data.current], this.data.songs_item)
    },
    requestLyrics(){// 最开始是在onLoad里执行
        const url = urlType.lyrics + this.data.songs_list['song_mid'];
        new Promise((resolve, reject) => {
            wx.request({
                url,
                success: resolve,
                fail: reject
            })
        }).then( ({data}) => {
            const lyrics = data.lyric;
            this.setData({
                lyrics
            })
        }).catch(err => {
            console.log(err);
        })
        // console.log(this.data.lyrics);
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