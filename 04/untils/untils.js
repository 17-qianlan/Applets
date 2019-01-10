export default {
    addZero(obj){
        return obj > 9? obj : "0" + obj;
    },
    toDate(isSeconds, date = new Date()){
        let year = this.addZero(date.getFullYear());
        let month = this.addZero(date.getMonth() + 1);
        let day = this.addZero(date.getDate());
        let hours = this.addZero(date.getHours());
        let minutes = this.addZero(date.getMinutes());
        let seconds = this.addZero(date.getSeconds());
        let dateTime = '';
        if (!isSeconds) {
            dateTime = `${year}-${month}-${day}`;
        } else {
            dateTime = `${year} ${month} ${day} ${hours} ${minutes} ${seconds}`;
        }
        return dateTime;
    },
    requestDate(){
        return new Promise((resolve, reject) => {
            wx.request({
                type: 'get',
                url: "https://www.baidu.com",
                method: 'HEAD',
                success: resolve,
                fail: reject
            })
        })
    },
    trainRequest(val, date){
        return new Promise((resolve, reject) => {
            wx.request({
                type: 'post',
                url: 'http://route.showapi.com/909-1',
                dataType: 'json',
                data: {
                    'showapi_timestamp': date,
                    'showapi_appid': '62699', // appid
                    'showapi_sign': '3fe9fafa5a6f477fbec7473ed115e9f1',  // 密钥
                    'from': val['from-station'],
                    'to': val['to-station'],
                    'trainDate': val['startTime']
                },
                success: resolve,
                fail: reject
            });
        });
    },
};
