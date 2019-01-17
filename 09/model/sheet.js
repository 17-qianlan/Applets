import {urlType, sheet, region} from '../common/url-type';
import PageModule from '../lib/Page';

let $page = new PageModule({
    onLoad(options){
        Object.assign(this.data, {
            url: '',
            page: 1,
            row: 20,
            songs: [],
            requestUrl: {},
            stock: false
        });
        this.setData({
            requestUrl: {
                id: options.id,
                name: options.name
            }
        });
        this.requestData().then(this.codeData.bind(this));
        wx.setNavigationBarTitle({
            title: this.data.requestUrl.name
        })
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
    }
})


export default $page;