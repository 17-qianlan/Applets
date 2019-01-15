import PageModule from '../../lib/Page.js';

const page = new PageModule({
    test(){
        console.log("我是一个公共的测试事件")
    },
    data: {
        a: 9999// 这个要在这里才会显示, 否则只会存在于实例中, 小程序不会把它识别为data数据
    }
});
const $app = getApp();
const example = $app.example;// 这里使用了引用关系, 浅拷贝    所以改变就都会改变
example.data({a: 1});
console.log(page);
page.onceEvent('onLoad', function() {
    example.assign({test: 666});// 已经设置成功, 可在AppData里查看
    console.log(page.exports());
    page.test();
});
page.start();

// Page();
