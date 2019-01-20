import AppModule from './lib/App.js';

let app = new AppModule();
/*app.addEvent('onLaunch', function(){
    AppModule.assign('b', {
        a : 111
    })
})*/
app.start();
