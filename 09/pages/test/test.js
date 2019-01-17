import PageModule from '../../lib/Page.js';
import  $pageList from '../../model/sheet';
import {urlType, region, sheet} from '../../common/url-type';

const $page = new PageModule($pageList);

$page.addEvent('onLoad', function(){
	console.log('不会被触发');
});

$page.start();