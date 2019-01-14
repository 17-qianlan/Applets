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
    this.push(...argument);
    console.log(this);
};

Array.prototype.findNameSpace = function (nameSpaces='default', subScript) {
    // return new RegExp('')
    const data = this.filter(item => {
        return new RegExp(nameSpaces, 'i').test(item.nameSpaces);
    })
    if (/boolean/i.test(typeof subScript) && subScript) {
        return data;
    } else {
        if (subScript === undefined) {
            subScript = data.length -1;
        }
    }
    return data[subScript];
};

export default Array;