import Audio from '../lib/Audio.js';
import PageModule from '../lib/Page';

const $pageMusic = new PageModule({
    // 播放歌曲
    onPlayer(event){
        const msg = event.currentTarget.dataset.msg;
        if (msg) {
            Audio.setSong(msg);
            this.setData({
                songs_list: msg
            });
        }
    },
    onShow(){
        // 获取歌曲信息, 使用onShow, 切换页面时可以很好的获取到当前的数据, (每一个页面都可以, 只要把这个类挂载到页面上)
        let songData = Audio.getSong();
        if (!songData) return false;
        this.setData({
            songs_list: songData
        });
    }
});

export default $pageMusic;
