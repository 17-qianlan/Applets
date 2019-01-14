import PageModule from '../../lib/Page.js';

const page = new PageModule();
const app = getApp();
const example = app.example;// 这里使用了引用关系, 浅拷贝    所以改变就都会改变
example.data({a: 1})
// page.start();

Page({
    onLoad() {
        console.log(app);
    }
})
