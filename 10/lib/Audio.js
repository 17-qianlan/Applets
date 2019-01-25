// import App from './App.js';
import Storage from './Stroage.js';
const audioStorage = new Storage('audio_storage');// 存到数据库的库名
const audio = wx.getBackgroundAudioManager();
let app = getApp();
export default class Audio{
    constructor(data) {

    };
    // 使用静态方法可以保证每次数据使用都可以拿到最新的状态, 只有有数据引用过或者修改过, 他都会修改
    static audio = audio;
    // 播放的音乐
    static song = {};
    // 歌单
    static songs = [];
    // 设置歌单和歌曲
    static setSong(song, songs) {
        const AudioAttr = {
            // src: urlType.music,
            src: " https://api.bzqll.com/music/tencent/url?key=579621905&id="+song['song_mid'],
            title: song.song_name || song.title,
            epName: song.album_name || song.epName,// 专辑
            singer: song.song_orig || song.singer, // 歌手
            coverImgUrl: song.album_min || song.coverImgUrl, // 封面
            song_mid: song['song_mid'],
            song_big: song['album_big'] // 大图
        }
        // 设置了audio.src会自动播放   合并到audio里, 因为audio也是个对象
        Object.assign(audio, AudioAttr);
        Audio.saveSong(AudioAttr, songs);
    }
    // 保存歌曲信息(缓存)
    static saveSong(song, songs) {
        app.globalData.songsList = song;
        app.globalData.songs = songs;
        const type = {song, songs};
        const trigger = item => {
            if (audioStorage.where('type', item).find()) {
                audioStorage.where('type', item).update({
                    type: item,
                    data: type[item],
                    time: new Date().getTime()
                }).save();
            } else {
                audioStorage.add({
                    type: item,
                    data: type[item],
                    time: new Date().getTime()
                }).save();
            }
        };
        Object.keys(type).forEach(trigger);
    }
};
