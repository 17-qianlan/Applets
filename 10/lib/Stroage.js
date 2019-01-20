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
        this.index = 0;
    };
    // 静态方法  获取数据
    static getDataB(dataName) {
        return wx.getStorageSync(dataName) || [];
    };
    // 提示在在查询前必须调用where函数
    static getWhere(actions) {
        if (this.whereFunction){
            const whereFunction = this.whereFunction;
            this.whereFunction = null;
            return whereFunction;
        } else {
            throw new Error(`在使用${actions}请先调用where函数`);
        }
    };
    // 保存
    save(){
        let db = Storage.getDataB(this.dataName);
        // 删除
        if (this.cache.delete) {
            /*for (const itm of this.cache.delete) {
                db = db.filter( item => {
                    return !itm(item);
                });

            };*/
            db = db.filter(item => {
                return !this.cache.delete.where(item);
            })
        };
        // 更新 缓存
        if (this.cache.update) {
            db.forEach(item => {
                if (this.cache.update.where(item)) {
                    // 接收到一个布尔值
                    // 这里使用的是合并, 也就是在有是修改, 否则添加, 删除使用的是delete
                    Object.assign(item, this.cache.update.data);
                }
            });
        };
        //保存 缓存
        if (this.cache.add) {
            db.push(...this.cache.add);
        };
        wx.setStorageSync(this.dataName, db);
        this.cache.add = [];
    };
    // 查询
    find(){
        let data = Storage.getDataB(this.dataName);
        this.sortFn && data.sort(this.sortFn);
        return data.find(Storage.getWhere.call(this, 'find'));
    };
    // 查询所有
    all() {
        const data = Storage.getDataB(this.dataName);
        this.sortFn && data.sort(this.sortFn);
        return data;
    };
    // 查找返回多个
    select(){
        let db = Storage.getDataB(this.dataName);
        let data = db.filter(Storage.getWhere.call(this, 'select'));
        this.sortFn && data.sort(this.sortFn);
        return this.spliceArr ? data.slice(...this.spliceArr) : data;
    };
    // sort 排序  asc 升序 desc 降序
    sequence(key, sort='asc') {
        this.sortFn = ((a, b) => {
            return /desc/i.test(sort)? b[key] - a[key] : a[key] - b[key];
        })
        return this;
    };
    // 添加
    add(data){
        if (Array.isArray(data)) {
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
    update(data){
        if (/object/.test(typeof data)) {
            this.cache.update = {
                data,
                where: Storage.getWhere.call(this, 'update')
            }
        }
        return this;
    };
    // 查询,但不是真正的直接返回到页面的
    where(...data){
        /*this.whereArr = [];
        let strFirst = data.split('&');
        let arr = [];
        for (const item of strFirst) {
            arr.push(item.split(','));
        };
        for (const item of arr) {
            let [key, compare, value] = item;
            if (value === undefined) {
                value = compare;
                compare = '=';
            }
            if (!(/NaN/.test(value*1))) {
                value *= 1;
            }
            const compareFn = whereCompare[compare];
            if (compareFn) {
                this.whereArr.push((itm) => {
                    return compareFn(itm[key], value);
                })
            } else {
                throw new Error('当前查询字段非法');
            }
        };*/
        let [key, compare, value] = data;
        if (/object/.test(typeof key)) {
            for (const dataKey in key) {
                if (Array.isArray(key[dataKey])) {
                    this.where(dataKey, ...key[dataKey]);
                } else {
                    this.where(dataKey, key[dataKey]);
                }
            }
            return this;
        };
        if ( value === undefined) {
            value = compare;
            compare = '=';
        }
        const compareFn = whereCompare[compare];
        /*if (compareFn) {
            this.whereFunction = (item) => {
                return compareFn(item[key], value);// 这里的这个return是返回给fin使用的
            }
        }*/
        if (!this.whereFunction) {
            const whereFunction = (item) => {
                let compareNum = 0;
                whereFunction.compare.forEach(compare => {
                    // console.log(item[compare.key], compare.value);
                    compareNum += ~~compare.compareFn(item[compare.key], compare.value);
                })
                return compareNum === whereFunction.compare.length;
            }
            // 这里为什么要这么写呢, 因为是要为whereFunction定义一个数组来存数据
            // 但是如果在const里定义, 会每次执行时覆盖, 全部清空, 这样每次遍历就都是个空数组了
            // 这里只是定义, 并不会立即执行, 所以并不会有什么影响
            whereFunction.compare = [];
            this.whereFunction = whereFunction;
            this.index ++;
        }
        this.whereFunction.compare.push({
            key, value, compareFn
        })
        // console.log(this.index);
        return this;
    };
    // 分页返回
    limit(start, end){
        if ( end === undefined) {
            end = start;
            start = 0;
        } else {
            --start;
            end += start;
        }
        this.spliceArr = [start, end];
        return this;
    };

    delete() {
        this.cache.delete = {
            where: Storage.getWhere.call(this, 'delete')
        }
        /*this.cache.delete = [];
        for (const itm of this.whereArr) {
            this.cache.delete.push(Storage.getWhere.call(this, 'delete', itm));
        }*/
        return this;
    };
}