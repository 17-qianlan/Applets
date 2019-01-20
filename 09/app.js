import AppModule from './lib/App.js';

const $app = new AppModule();
console.log('app外');
$app.addEvent('onLaunch', function(){
    console.log('app里        的onLaunch');
    AppModule.assign('aaa', 2222);
})

$app.start();
