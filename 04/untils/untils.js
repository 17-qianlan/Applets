let {values, keys, entries} = Object;

export default {
    addZero(obj){
        return obj > 9? obj : "0" + obj;
    },
    toDate(date){
        let year = this.addZero(date.getFullYear());
        let month = this.addZero(date.getMonth() + 1);
        let day = this.addZero(date.getDate());
        let hours = this.addZero(date.getHours());
        let minutes = this.addZero(date.getMinutes());
        let seconds = this.addZero(date.getSeconds());
        return {
            dateTime: `${year}-${month}-${day}`,
            formatterDateTime: `${year}${month}${day}${hours}${minutes}${seconds}`
        };;
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
                url: 'http://route.showapi.com/909-1',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
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
    arrange(data){
        let arr = [];
        data.forEach((item) => {
            if (!item.ticketInfo) {
                throw new Error('');
            };
            let tickets = values(item.ticketInfo);
            item =  Object.assign({tickets}, item);
            delete item.ticketInfo;
            arr.push(item);
        })
        console.log(arr);
        return arr;
    }
};
