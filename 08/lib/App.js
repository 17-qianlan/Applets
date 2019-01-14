import Event from './Event.js';

export default class AppModule extends  Event{
    constructor() {
        super();
    };
    globalData = {};
    // data()  返回
    // data('a') 获取
    // data({a: 1, b: 2}) 设置
    // data('a', 1)  设置或者修改
    data(...argument) {
        if (argument.length === 0) {
            return this.globalData;
        } else if (argument.length === 1) {
            const str = argument[0]
            if (/string/i.test(typeof str)) {
                return this.globalData[str];
            } else if (/object/i.test(typeof str)) {
                let obj = argument[0];
                for (const key in obj) {
                    this.data(key, obj[key]);
                }
            }
        } else if (argument.length === 2) {
            this.globalData[argument[0]] = argument[1];
        }
    };
    start() {
        const appExample = this;
        this.onceEvent('onLaunch', function() {
           Reflect.set(this, 'example', appExample);
        });
        App(this);
    }
}