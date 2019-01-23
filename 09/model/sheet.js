import PageModule from '../lib/Page';
import StorageSong from './StorageSong.js';
const $storageSong = new StorageSong('songs');
let $page = new PageModule({
    data: {
        url: '',
        page: 1,
        row: 20,
        songs: [],
        requestUrl: {},
        stock: false
    },
    requestData() {
        if (this.data.stock) {
            wx.showToast({
                icon: 'none',
                title: '没有更多了'
            })
        };
        wx.showLoading({
            title: 'loading'
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.data.url,
                success: resolve,
                fail: reject
            })
        })
    },
    codeData({data}){
        if (data.count_page <= data.curr_page) {
            this.setData({
                stock: true
            })
        };
        this.data.songs.push(...data.songs);
        this.setData({
            songs: this.data.songs
        });
        wx.hideLoading();
    },
    morePage(){
        this.data.page++;
        this.requestData().then(this.codeData.bind(this));
    },
    submitSearch(event) {
        let q = event.detail.value.sheet;
        if (/^\s*$/.test(q)) {
            wx.showToast({
                icon: 'none',
                title: '搜索不可以为空'
            })
            return false;
        };
        $storageSong.add(q);
        wx.navigateTo({
            url: '/pages/search/list?name=' + q
        });
    },
})

export default $page;