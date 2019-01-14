import Event from '../../lib/Event';

let event = new Event();

/*event.addEvent('onLoad', function(b) {
  /!*this.setData({
    a : 2
  })*!/
  console.log('我是test事件触发器1');
});
event.addEvent('onLoad', function(b) {
  console.log('我是test事件触发器1');
})
event.addEvent('onLoad', function(b) {
  console.log('我是test事件触发器2');
})
event.addEvent('onLoad', function(b) {
  console.log('我是test事件触发器4');
})*/
event.addEvent('onLoad', function() {
  // true 以本体返回  array以数组形式返回 不包含命名空间, 否则以data值返回
  console.log(event.test().findNameSpace('onTest', 'array'))
});
event.addEvent('test', function() {
  // console.log('我是test事件1');
  return {
    nameSpaces: 'onTest',
    data: 66666
  }
})

/*event.onceEvent('test', function() {
  console.log('我是test事件3');
})*/
event.addEvent('test', function() {
  console.log('我是test事件2');
  return 9999;
});

event.addEvent('onLoad', function() {
  console.log(event.test().findNameSpace());
});
// event.removeEvent('onLoad');

console.log(event);
Page(event);