import Event from './Event.js';
let app = getApp();
export default class PageModule extends Event {
    constructor(data) {
        super();
        let that = this;
        // 这个是挂载this对象到page上, 方便需要时获取, 而且要写在这里, 否则app的值有可能是undefined
        // 因为有个先执行, 后执行的过程(在APP内)
        // 还有可以携带参数到需要的页面, 比如router, 现在是在哎app里执行, 是可以在哪儿拿到route的(app.page.page)
        this.onceEvent('onLoad', function() {
            Reflect.set(app, 'page', {
                example: that,
                page: this,
                route: this.route
            });
        });
        data && this.extends(data);
    };

    static select(obj) {
        const events = {};
        const data = {};
        Object.keys(obj).forEach(item => {
            if (/function/i.test(typeof item)) {
                events[item] = obj[item];
            } else {
                data[item] = obj[item];
            }
        });
        return {events, data};
    };

    exports(...argument) {
        argument = argument.length? argument : Object.keys(this.events); // 默认返回全部事件
        let events = {};
        argument.forEach(item => {
            if (/function/i.test(typeof this[item])) {
                events[item] = this[item];
            } else {
                throw new Error(`没有${item}事件`);
            }
        })
        return events;
    };
    extends(obj) {
        let {events, data} = PageModule.select(obj);
        for (const eKey in events) {
            this.addEvent(eKey, events[eKey]);
        }

        Object.assign(this, data);
    }
    start(data) {
        data && this.extends(data);
        Page(this);
    }
}