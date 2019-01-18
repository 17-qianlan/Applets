import PageModule from '../../lib/Page.js';
import  $pageList from '../../model/sheet';
import {urlType, region, sheet} from '../../common/url-type';

const $page = new PageModule($pageList);

/*$page.addEvent('onLoad', function(sheet){
	console.log('不会被触发');
});*/

$page.start({
    onLoad(options){
        this.setData({
            requestUrl: {
                id: options.id,
                name: options.name
            }
        });
        this.requestData().then(this.codeData.bind(this)).catch(err => {
            console.log(err);
        });
        wx.setNavigationBarTitle({
            title: this.data.requestUrl.name
        })
    }
});