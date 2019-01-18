import Storage from '../lib/Stroage';

export default class StorageSong extends Storage{
    constructor(query) {
        super(query);
    };
    add(data) {
        // 保存前先去查找有没有相同的, 有相同的就不保存了
        if (super.where('name', data).find()) {
            super.where('name', data).delete().save();
        }
        super.add({
            name: data,
            time: new Date().getTime()
        }).save();
    };
    all(){
        let db = super.sequence('time', 'desc').all();
        const data = db.splice(0, 10);
        return data;
    }
}