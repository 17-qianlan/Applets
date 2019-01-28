import Audio from "../lib/Audio";
import {urlType} from "../common/url-type";

export default {
    // 点击歌曲详情播放
    playerSong(event) {
        // audio.paused === undefined true表示没有开始播放 false表示已经开始播放了
        const dataset = event.currentTarget.dataset;
        Audio.setSong(dataset.song, dataset.songs);
        this.setData({
            playType: 'icon-zanting',
            songs_list: dataset.song
        })
    },
    // 点击播放按钮播放
    onPlay(event){
        const dataset = event.currentTarget.dataset;
        if (this.audio.paused === undefined) {// 从未点击过播放
            Audio.setSong(dataset.song, this.data.songs);
            this.setData({
                playType: 'icon-zanting'
            })
        } else if (this.audio.paused === false) {// 表示已经开始播放了
            this.audio.pause();
            this.setData({
                playType: 'icon-bofang',
            })
        } else {// 表示已经暂停了要继续播放
            this.audio.play();
            this.setData({
                playType: 'icon-zanting',
            })
        }
    },
    // 跳转到歌曲(播放页面)详情页
    detailsPlay(event){
        const dataset = event.currentTarget.dataset;
        wx.navigateTo({
            url: '/pages/item/song?song_mid=' + dataset.song['song_mid']
        })
    },
    // 检测是否已经开始播放了
    isStartPlay(){
        if (this.audio.paused === false) {// 条件判断必须这么写
            // this.audio.paused表示已经开始播放了
            this.setData({
                playType: 'icon-zanting'
            });
        }
    },
    // 歌曲详情页的下一曲
    nextPlay(){
        const len = this.data.songs_item.length;
        this.setData({
            index: len-2 < this.data.index? 0 : ++this.data.index
        });
        Audio.setSong(this.data.songs_item[this.data.index], this.data.songs_item);
    },
    // 歌曲详情页的上一曲
    prevPlay(){
        const len = this.data.songs_item.length;
        this.setData({
            index: this.data.index === 0 ? len-1 : --this.data.index
        });
        Audio.setSong(this.data.songs_item[this.data.index], this.data.songs_item)
    },

};
