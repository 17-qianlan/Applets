import until from '../../untils/untils.js';
//word=狗
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    height: [],
    origin: [],
    wd: '',
    pn: 1,
    rn: 30,
    list: 3,
    copyRight: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ q }) {
    this.setData({
      wd: q
    })
    // this.data.wd =
    this.createContainer();
    this.request();
    wx.setNavigationBarTitle({
      title: (this.data.wd || '狗')
    })
  },
  //请求
  request(){
    wx.showNavigationBarLoading();
    let request = until.query(this.data.pn, this.data.rn, this.data.wd);
    request.then(res => {
      let newData = this.createData(res.data);
      this.formatData(newData);
    }).catch(err => {
      console.log(err);
    });
  },
  /*
  * 这里有个bug, 如果在高度不是一样大的时候, 会出现乱序的情况
  * */
  //准备和格式化数据格式
  formatData(data){
    data.pop();
    this.data.origin.push(...data);
    data.forEach(item => {
      let min = Math.min(...this.data.height);
      let index = this.data.height.findIndex( item => min === item);
      this.data.images[index].push(item);
      this.data.height[index] += item.height;
    });
    this.setData({
      images: this.data.images
    });
    wx.hideNavigationBarLoading();
  },
  //创建容器
  createContainer(){
    this.data.images = new Array(this.data.list).fill([]).map( () => []);
    this.data.height = new Array(this.data.list).fill(0);
  },

  //整合数据
  createData({data}){
    data.pop();
    let d = [];
    data.forEach(item => {
      d.push(Object.assign({
        thumbURL: item.thumbURL,
        middleURL: item.middleURL,
        objURL: until.encodeImgUrl(item.objURL)
      },until.zoom(item)))
    })
    return d;
  },
  //下载
  download(e){
    let that = this;
    let url = e.currentTarget.dataset[!this.data.copyRight? 'src': 'spare'];
    //
    wx.downloadFile({
      url,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          fail(err) {
            if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
              until.authorization(err);
            } else if (err.errMsg === 'saveImageToPhotosAlbum:fail TypeError: Path must be a string. Received []') {//如果上面打大图链接有版权, 那么将改用中图图片链接
              that.setData({
                copyRight: true
              });
              that.download(e);
            }
          }
        })
      }
    })
  },
  //加载更多
  more(){
    this.data.pn ++;
    this.request();
  },
  //预览
  previewImage(e){
    let current = e.target.dataset.src;
    let urls = [];
    urls = [...this.data.origin].map(item => item.middleURL);
    // urls = urls.map( ({middleURL}) => middleURL);
    wx.previewImage({
      current,
      urls
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})