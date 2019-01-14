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
  event.test();
});
event.addEvent('test', function() {
  console.log('我是test事件1');
})
event.onceEvent('test', function() {
  console.log('我是test事件3');
})
event.addEvent('test', function() {
  console.log('我是test事件2');
});
event.addEvent('onLoad', function() {
  event.test('8888');
});
// event.removeEvent('onLoad');

console.log(event);
Page(event);