export default class Event {
    constructor() {
        Object.defineProperty(this, 'events', {
            value: {},
            enumerable: false
        })
    };

    static createEventHandle(eType, that){
        Reflect.set(that, eType, function(...argument){
            let page = this;
            let eTypeFn = Reflect.get(this.events, eType);
            eTypeFn.forEach( item => {
                item.apply(page, argument);
            })
        });
    };
    getEvent(eType){
        let eTypeFn = Reflect.get(this.events, eType);
        if (!Array.isArray(eTypeFn)) {
            eTypeFn = [];
            Reflect.set(this.events, eType, eTypeFn);
            Event.createEventHandle(eType, this);
        }
        return eTypeFn;
    };
    addEvent(eType, callback){
        let eTypeFn = this.getEvent(eType);
        eTypeFn.push(callback);
    };
    removeEvent(eType, callback){
        if (callback) {
            let eTypeFn = Reflect.get(this.events, eType);
            let index = eTypeFn.find( item => item === callback);
            // index !== -1 && eTypeFn.splice(index, 1);
            index !== -1 && setTimeout([].splice.bind(eTypeFn), 0, index, 1);
        } else {
            Reflect.set(this.events, eType, []);
        }
    };
    onceEvent(eType, callback){
        let that = this;
        const handle = function(...argument) {
            callback.apply(this, argument);
            that.removeEvent(eType, handle);
        };
        this.addEvent(eType, handle);
    }
}