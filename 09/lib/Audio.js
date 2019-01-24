import App from './App.js';
import Storage from './Stroage';
import {urlType} from '../common/url-type';

const audioStorage = new Storage('audio_storage');// 存到数据库的库名
const audio = wx.getBackgroundAudioManager();
export default class Audio{
    constructor(data) {

    };
    // 使用静态方法可以保证每次数据使用都可以拿到最新的状态, 只有有数据引用过或者修改过, 他都会修改
    static audio = audio;
    // 播放的音乐
    static song = null;
    // 歌单
    static songs = null;
    // 设置歌单和歌曲
    static setSong(song, songs) {
        const AudioAttr = {
            // src: urlType.music,
            src: " https://api.bzqll.com/music/tencent/url?key=579621905&id="+song['song_mid'],
            title: song.song_name || song.title,
            epName: song.album_name || song.epName,// 专辑
            singer: song.song_orig || song.singer, // 歌手
            coverImgUrl: song.album_min || song.coverImgUrl, // 封面
            song_mid: song['song_mid'], // mid值, 可以靠这个播放音乐
            album_big: song['album_big']// 大图
        }
        Audio.saveSong(AudioAttr, songs);
        // 设置了audio.src会自动播放   合并到audio里, 因为audio也是个对象
        Object.assign(audio, AudioAttr);
    };
    // 保存歌曲信息(缓存)
    static saveSong(song, songs) {
        // 保存到类, 可以让用户第一次进来获取到相关的数据 Audio['soon']
        // 只会在第一次执行的时候绑定一次
        App.assign({songs_list: song});// 这个数据会同步到data上面, app.assign会在任何页面上调用并设置song方法
        if (audioStorage.where('type', 'data').find()) {
            audioStorage.where('type', 'data').update({
                data: song,
                time: new Date().getTime()
            }).save();
        } else {
            audioStorage.add({
                type: 'data',
                data: song,
                time: new Date().getTime()
            }).save();
        }
    };
    static getSong(){
       let data =  audioStorage.where('type', 'data').find().data;
        if (!data) {
            data = Audio['song'];
       }
       return data;
    };
};
