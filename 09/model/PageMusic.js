import Audio from '../lib/Audio.js';
import PageModule from '../lib/Page';

const $pageMusic = new PageModule({
    // 播放歌曲
    onPlayer(event){
        const song = event;
        console.log(song);
        /*if (song) {
            Audio.setSong(song);
            this.setData({
                songsList: song
            });
        }*/
    },
    onShow(){
        // 获取歌曲信息, 使用onShow, 切换页面时可以很好的获取到当前的数据, (每一个页面都可以, 只要把这个类挂载到页面上)
        const songData = Audio.getSong();
        console.log(songData);
        this.setData(songData);
    }
});

export default $pageMusic;
