import App from './App.js';
import Storage from './Stroage';

const audioStorage = new Storage('audio_storage');
const audio = wx.getBackgroundAudioManager();

export default class Audio{
    constructor(data) {

    };
    static audio = audio;
    // 播放的音乐
    static song = {};
    // 歌单
    static songs = [];
    // 设置歌单和歌曲
    static setSong(song, songs) {
        // 歌曲的相关信息保存
        const AudioAttr = {

        }
        // 设置了audio.src会自动播放
        Object.assign(audio, AudioAttr);
    }
};
