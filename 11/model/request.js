export default {
    // 请求歌单数据
    requestData() {
        if (this.data.stock) {
            wx.showToast({
                icon: 'none',
                title: '没有更多了'
            })
        };
        let url = '';
        if (/^\d{3,}/.test(this.data.requestUrl.id) || !this.data.requestUrl.id) {
            url = urlType.query + this.data.requestUrl.name;
        }
        wx.showLoading({
            title: 'loading'
        })
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.data.url,
                success: resolve,
                fail: reject
            })
        })
    },
    // 打包整理歌单数据
    codeData({data}) {
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
    }
};
