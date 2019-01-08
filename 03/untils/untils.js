let URL = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&';
export default {
    //整合url, 准备请求
    query(pn, rn, wd){
        pn = (pn*rn - rn);
        let url = URL + 'pn='+pn+'&rn='+rn+'&wd='+wd;
        return new Promise((resolve, reject) => {
            wx.request({
                url,
                success: resolve,
                fail: reject
            })
        })
    },
    //使其高度和宽度成比例
    zoom(img){
        let zoom = 100 / img.width;
        return {
            width: img.width * zoom,
            height: img.height * zoom
        }
    },
    //用户授权
    authorization(err) {
        wx.showModal({
            title: '获取保存权限',
            content: '您前面拒绝了保存权限, 我们需要它',
            cancelText: '取消',
            confirmText: '确定',
            confirmColor: '#000',
            success(res){
                wx.openSetting({
                    success(res) {
                        console.log(res);
                        if (!res.authSetting['scope.writePhotosAlbum']) {
                            wx.authorize({
                                scope:'scope.writePhotosAlbum'
                            })
                        }
                    },
                    fail(err) {
                        console.log(err);
                    }
                })
            }
        });
    },
    encodeImgUrl(imgUrl){
        let encryption = {
            'w': 'a',
            'k': 'b',
            'v': 'c',
            '1': 'd',
            'j': 'e',
            'u': 'f',
            '2': 'g',
            'i': 'h',
            't': 'i',
            '3': 'j',
            'h': 'k',
            's': 'l',
            '4': 'm',
            'g': 'n',
            '5': 'o',
            'r': 'p',
            'q': 'q',
            '6': 'r',
            'f': 's',
            'p': 't',
            '7': 'u',
            'e': 'v',
            'o': 'w',
            '8': '1',
            'd': '2',
            'n': '3',
            '9': '4',
            'c': '5',
            'm': '6',
            '0': '7',
            'b': '8',
            'l': '9',
            'a': '0',
            '_z2C\\$q': ':',
            '_z&e3B': '.',
            'AzdH3F': '/'
        };
        //Object.keys 返回的是数组
        let enKey = Object.keys(encryption);
        // /0|1|2|3|4|5|6|7|8|9|w|k|v|j|u|i|t|h|s|g|r|q|f|p|e|o|d|n|c|m|b|l|a|_z2C\$q|_z&e3B|AzdH3F|./
        //                                         这里的|.是添加. 处理换行或者行结束符
        let reg = new RegExp(enKey.join('|')+'|.', 'g');
        let psw ;
        let code = [];//容器, 存匹配到的数据
        while(psw = reg.exec(imgUrl)) {
            if (psw[0] === '_z2C$q') {
                psw[0] = '_z2C\\$q'
            }
            code.push(encryption[psw]? encryption[psw]: psw[0]);
        }
        return code.join('');
    }
};
