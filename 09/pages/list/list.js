import PageModule from '../../lib/Page.js';
import  $pageList from '../../model/sheet';
import {urlType, region, sheet} from '../../common/url-type';
import $pageMusic from '../../model/PageMusic.js';

const $page = new PageModule($pageList);
$page.extends($pageMusic);
$page.addEvent('onLoad', function(sheet){
    this.setData({
        url : urlType.topid + sheet.id + '/p/' + this.data.page + '/r/' + this.data.row
    });
    this.requestData().then(this.codeData.bind(this)).catch(err => {
        console.log(err);
    });
    wx.setNavigationBarTitle({
        title: sheet.name
    })
});

$page.start();