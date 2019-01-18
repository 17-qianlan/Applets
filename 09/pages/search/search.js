import {sheet, urlType, region} from '../../common/url-type';
import PageModule from '../../lib/Page';
import StorageSong from '../../model/StorageSong';
const $storageSong = new StorageSong('songs');
const $page = new PageModule({
  data: {
    q: '',
    history: []
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '搜索'
    });
    this.update();
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
  }
});

$page.start();