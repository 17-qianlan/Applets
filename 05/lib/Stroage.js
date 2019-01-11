const whereCompare = {
    '=': (that, value) => {
        return that === value;
    },
    '<': (that, value) => {
        return that < value;
    },
    '>': (that, value) => {
        return that > value;
    },
    '>=': (that, value) => {
        return that >= value;
    },
    '<=': (that, value) => {
        return that <= value;
    },
    '!=': (that, value) => {
        console.log(that, value);
        return that != value;
    },
    'like': (that, value) => {
        return new RegExp(value, 'i').test(that);
    }
}

export default class Storage{
    // construct属性, 获取参数
    constructor(dataName){
        Object.assign(this, {
            dataName,
            cache: {
                add : []
            }
        });

    };
    // 静态方法  获取数据
    static getDataB(dataName){
        return wx.getStorageSync(dataName) || [];
    };
    // 保存
    save(){
        let db = Storage.getDataB(this.dataName);
        if (this.cache.add) {
            db.push(...this.cache.add);
        };
        wx.setStorageSync(this.dataName, db);
        this.cache.add = [];
    };
    // 查询
    find(){
        let db = Storage.getDataB(this.dataName);
        return db.find(this.whereFunction);
    };
    // 添加
    add(data){
        if (Array.isArray(data)) {
            console.log(1);
            data.forEach(item => {
                this.add(item);
            });
        } else if (/object/.test(typeof data)) {
            this.cache.add.push(data);
        } else {
            throw new Error('必须传入对象');
        }
        return this;
    };
    // 修改
    update(){

    };
    // 查询,但是不是真正的直接返回到页面的
    where(...argument){
        let [key, compare, value] = argument;
        if (!value) {
            value = compare;
            compare = '=';
        }
        const compareFn = whereCompare[compare];
        if (compareFn) {
            this.whereFunction = (item) => {
                return compareFn(item[key], value);
            }
        } else {
            throw new Error('当前查询字段非法')
        }
        return this;
    }
}