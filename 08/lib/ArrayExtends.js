Array.prototype.pushNameSpace = function (...argument) {
    argument = argument.map(item => {
        if (/object/.test(typeof item)) {
            if (item.nameSpaces) {
                return item;
            } else {
                return {
                    nameSpaces: 'default',
                    data: item
                }
            }
        } else {
            return {
                nameSpaces: 'default',
                data: item
            }
        }
    });
    // this 表示当前数组
    this.push(...argument);
};

Array.prototype.findNameSpace = function (nameSpaces='default', subScript) {
    // 查询
    const data = this.filter(item => {
        return new RegExp(nameSpaces, 'i').test(item.nameSpaces);
    });
    // 返回  判断为true表示返回本体数组包含对象方式
    if (/boolean/i.test(typeof subScript)) {
        return data;
    } else if(subScript === 'array') {// 为array时, 以数组包含data值返回
        return data.map( item => item.data);
    } else {
       if (subScript === undefined){
            subScript = data.length - 1;// 这里应用data的下标, 一般也就是返回0位的值
        }
    }
    // 只有参数全部为空时才会执行到这里
    // 参数全部为空时返回的data值
    return data[subScript].data;
};

export default Array;