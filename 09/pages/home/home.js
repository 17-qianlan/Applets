import {urlType, sheet, region} from '../../common/url-type';
import PageModule from '../../lib/Page';
import Banner from '../../model/Banner';
import $pageMusic from '../../model/PageMusic.js';
import Audio from "../../lib/Audio";

const $nameSpace = 'home/home';

let $page = new PageModule({
  onLoad(options) {
    // 轮播图
    let banner = new Banner(this);
    banner.getBanner().then(data => {
      this.setData({
        banner: data
      });
    });
    this.setData({assort: region});
    let newPromise = this.getSheet().data;
    newPromise.then(this.setSheets.bind(this));
    /*arr.forEach(item => {
      item.then(data => {
        console.log(data);
      })
    })*/
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
      });
      sheetPromise.push(p);
    });
    /*const p = new Promise((resolve, reject) => {
      wx.request({
        url: urlType.topid + sheet[0].id,
        success: resolve,
        fail: reject
      })
    })
    p.then(data => {
      console.log(data);
    })*/
    return {
      nameSpaces: $nameSpace,
      data: Promise.all(sheetPromise)
    };
  },
  setSheets(argument) {
    const sheetData = [];
    argument.forEach((data, index) => {
      sheetData.push(Object.assign({
        songs: data.data.songs
      }, sheet[index]));
    })
    this.setData({
      songs: sheetData
    })
  }
});
$page.extends($pageMusic);
$page.start();