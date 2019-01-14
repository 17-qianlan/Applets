export default class Event {
    constructor() {
        Object.defineProperty(this, 'events', {
            value: {},
            enumerable: false
        })
    };
    // 函数在这里执行
    static createEventHandle(eType, that){
        Reflect.set(that, eType, function(...argument){
            console.log(argument);
            let page = this;
            let eTypeFn = Array.from(Reflect.get(that.events, eType));
            (function recur(){
                let fn = eTypeFn.shift();
                fn && fn.apply(page, argument);
                eTypeFn.length && recur();
            })()
            /*eTypeFn.forEach( item => {
                item.apply(page, argument);
            })*/
        })
    };
    // 获取
    getEvent(eType) {
        let eTypeFn = Reflect.get(this.events, eType);
        if (!Array.isArray(eTypeFn)) {// 为空时不是数组, 所以得让他变成数组
            eTypeFn = [];
            Reflect.set(this.events,eType, eTypeFn);
            Event.createEventHandle(eType, this);
        }
        return eTypeFn;
    };
    // 添加
    addEvent(eType, callback) {
        const eTypeFn = this.getEvent(eType);
        eTypeFn.push(callback);
    };
    // 移除
    removeEvent(eType, callback) {
        if (callback) {
            let eTypeFn = Reflect.get(this.events, eType);
            let index = eTypeFn.findIndex( item => item === callback);
            index !== -1 && eTypeFn.splice(index, 1);
            // index !== -1 && setTimeout([].splice.bind(eTypeFn), 0, index, 1);
        } else {
            // 清空事件队列
            Reflect.set(this.events, eType, []);
        }
    };
    // 只执行一次
    onceEvent(eType, callback) {
        let that = this;
        const handle = function(...argument) {
            callback.apply(this, argument);
            that.removeEvent(eType, handle);
        };
        this.addEvent(eType, handle);
    };
}