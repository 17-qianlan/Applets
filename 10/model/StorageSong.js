import Storage from '../lib/Stroage';

export default class StorageSong extends Storage{
    constructor(query) {
        super(query);
    };
    add(data) {
        // 保存前先去查找有没有相同的, 有相同的就不保存了
        if (this.where('name', data).find()) {
            this.delete(data);
        }
        super.add({
            name: data,
            time: new Date().getTime()
        }).save();
    };
    all(){
        this.sequence('time', 'desc');
        // 只要这个执行完成存在于类里边了
        // super表示继承类的里边的方法, 可以在子类里边扩展
        const db = super.all();
        const data = db.splice(0, 10);
        // console.log(db);
        db.forEach(item => {
            this.delete(item.name);
        })
        return data;
    };
    delete(item) {
        this.where('name', item);
        super.delete().save();
    }
}