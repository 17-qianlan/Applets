import PageModule from '../lib/Page';
import {urlType, sheet, region} from '../common/url-type';
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
        })
        const url = urlType.topid + this.data.requestUrl.id + '/p/' + this.data.page + '/r/' + this.data.row;
        return new Promise((resolve, reject) => {
            wx.request({
                url,
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
    more(){
        console.log(this.data.url);
    }
})

export default $page;