export default class Banner {
    constructor(page) {
        Reflect.set(page, 'actionsBanner', Banner.actionsBanner);
    };
    static actionsBanner(event) {
        console.log(event);
    };
    getBanner(){
        const data = [];
        // banner图的类型有多种,有的是跳转专题,有的单曲推荐
        data.push({
            src: 'http://p1.music.126.net/ulW4yJjxB8eAvInYOobNLg==/109951163621926009.jpg',
            action: 1 // 这里是专题, 跳转方式, 现在我还不知道怎么用
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