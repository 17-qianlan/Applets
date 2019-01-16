import {urlType, sheet, region} from '../../common/url-type';
import PageModule from '../../lib/Page';
import Banner from '../../model/Banner';

const $nameSpace = 'home/home';

let $page = new PageModule({
  onLoad(options) {
    // 轮播图
    let banner = new Banner(this);
    banner.getBanner().then(data => {
      this.setData({
        banner: data
      });
    })
    this.setData({assort: region});
    let arr = this.getSheet().data;
    console.log(arr);
    arr.forEach(item => {
      item.then(data => {
        console.log(data);
      })
    })
  },
  // 获取歌单
  getSheet() {
    const sheetPromise = [];
    sheet.forEach(item => {
      const p = new Promise((resolve, reject) => {
        wx.request({
          url: urlType.topid + item.id,
          success: resolve,
          fail: reject
        })
      })
      sheetPromise.push(p);
    });
    return {
      nameSpaces: $nameSpace,
      data: Promise.all(sheetPromise)
    };
  },
  setSheets() {

  }
});

$page.start();