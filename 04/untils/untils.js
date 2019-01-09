export default {
    addZero(obj){
        return obj > 9? obj : "0" + obj;
    },
    toDate(isSeconds,data = new Date()){
        let year = this.addZero(data.getFullYear());
        let month = this.addZero(data.getMonth() + 1);
        let day = this.addZero(data.getDate());
        let hours = this.addZero(data.getHours());
        let minutes = this.addZero(data.getMinutes());
        let seconds = this.addZero(data.getSeconds());
        let dateTime = '';
        if (!isSeconds) {
            dateTime = `${year}-${month}-${day}`;
        } else {
            dateTime = `${year} ${month} ${day} ${hours} ${minutes} ${seconds}`;
        }
        return dateTime;
    },
};
