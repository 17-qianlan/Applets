import {sheet, urlType, region} from '../../common/url-type.js';
import PageModule from '../../lib/Page.js';
import StorageSong from '../../model/StorageSong.js';
import $pageList from '../../model/sheet.js';
import Audio from '../../lib/Audio.js';
import $pageMusic from '../../model/PageMusic.js';

/*const $page = new PageModule({
	data: {
		q: '',
		history: [],
		song:[],
		url: urlType.query
	},
	onLoad(options) {
		wx.setNavigationBarTitle({
			title: '搜索'
		});
		this.update();
		this.setData({
			url: this.data.url + 'name/' + options.name
		})
	},
	submitSearch(event) {
		let q = event.detail.value.sheet;
		if (/^\s*$/.test(q)) {
			wx.showToast({
				icon: 'none',
				title: '搜索不可以为空'
			})
			return false;
		};
		$storageSong.add(q);
		this.update();
	},
	update() {
		this.setData({
			history: $storageSong.all(),
			q: ''
		});
	},
	del(event){
		const name = event.currentTarget.dataset.name;
		$storageSong.delete(name);
		this.update();
	}
});*/
const $page = new PageModule($pageList);
const $storageSong = new StorageSong('songs');
const audio = new Audio();

$page.extends($pageMusic);
$page.start({
	onLoad(options){
		this.setData({
			requestUrl: {
				name: options.name
			}
		});
		this.requestData().then(this.codeData.bind(this)).catch(err => {
			console.log(err);
		});
		wx.setNavigationBarTitle({
			title: this.data.requestUrl.name
		});
    },
	playerSong(event){
		const dataset = event.currentTarget.dataset;
		Audio.setSong(dataset.msg);
		this.onPlayer();
	},
    submitSearch(event) {
        let q = event.detail.value.sheet;
        if (/^\s*$/.test(q)) {
            wx.showToast({
                icon: 'none',
                title: '搜索不可以为空'
            })
            return false;
        };
        $storageSong.add(q);
        wx.navigateTo({
            url: '/pages/search/list?name=' + q
        });
    },
});