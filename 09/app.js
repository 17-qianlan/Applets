import AppModule from './lib/App.js';

const $app = new AppModule();
$app.addEvent('onLaunch', function(){
    AppModule.assign('aaa', 2222);
})

$app.start();

/*App({
    data: {
        a: 1111
    },
    onLaunch(){
        data: {
            a: 22222222
        }
        console.log(this);
    }
})*/
