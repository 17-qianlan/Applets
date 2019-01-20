export default class Banner {
    constructor(page) {
        Reflect.set(page, 'actionsBanner', Banner.actionsBanner);
    };
    static actionsBanner(event) {
        const action = event.currentTarget.dataset.action;
        if (action.atype === 0) {
            wx.navigateTo({
                url: '/pages/list/list?id='+ action.data.id + '&name=' + action.data.name
            });
        }
    };
    getBanner(){
        const data = [];
        // banner图的类型有多种,有的是跳转专题,有的单曲推荐
        data.push({
            src: "//y.gtimg.cn/music/common/upload/MUSIC_FOCUS/595982.jpg?max_age=2592000",
            atype : 0,//专题
            data : {
                id : 108,
                name: "美国公告牌榜"
            }
        });
        data.push({
            src: 'http://p1.music.126.net/eutlOcSlh-dtpWq328R6bQ==/109951163615791721.jpg',
            action: 1 // 这里是专题, 跳转方式, 现在我还不知道怎么用
        });
        data.push({
            src: 'http://p1.music.126.net/fklp8j8RXOys1RyEbC00iA==/109951163621954602.jpg',
            action: 1 // 这里是专题, 跳转方式, 现在我还不知道怎么用
        });
        return new Promise((resolve, reject) => {
            resolve(data);
        })
    };
}