export default {
    addZero(obj){
        return obj > 9? obj : "0" + obj;
    },
    toDate(data = new Date()){
        let year = this.addZero(data.getFullYear());
        let month = this.addZero(data.getMonth() + 1);
        let day = this.addZero(data.getDate());
        return `${year}-${month}-${day}`;
    }
};
