// pages/template/image.js
let URL = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&';
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
    pn: 30,
    rn: 60,
    list: 4
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
    let request = this.query();
    request.then(res => {
      let newData = this.createData(res.data);
      this.formatData(newData);
    }).catch(err => {
      console.log(err);
    });
  },
  /*
  * 这里有个bug, 如果在高度不是一样大的时候, 那么会出现乱序的情况
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
  //整合url, 准备请求
  query(){
    let url = URL + 'pn'+this.data.pn+'&rn='+this.data.rn+'&wd='+(this.data.wd || '狗狗');
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        success: resolve,
        fail: reject
      })
    })
  },
  //使其高度和宽度成比例
  zoom(img){
    let zoom = 100 / img.width;
    return {
      width: img.width * zoom,
      height: img.height * zoom
    }
  },
  //整合数据
  createData({data}){
    data.pop();
    let d = [];
    data.forEach(item => {
      d.push(Object.assign({
        thumbURL: item.thumbURL,
        middleURL: item.middleURL,
        objURL: item.objURL
      },this.zoom(item)))
    })
    return d;
  },
  //下载
  download(e){
    let url = e.currentTarget.dataset.src;
    console.log(url);
    wx.downloadFile({
      url,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          fail(err) {
            if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
              wx.showModal({
                title: '获取保存权限',
                content: '您前面拒绝了保存权限, 我们需要它',
                cancelText: '取消',
                confirmText: '确定',
                confirmColor: '#000',
                success(res){
                  wx.openSetting({
                    success(res) {
                      console.log(res);
                      if (!res.authSetting['scope.writePhotosAlbum']) {
                        wx.authorize({
                          scope:'scope.writePhotosAlbum'
                        })
                      }
                    },
                    fail(err) {
                      console.log(err);
                    }
                  })
                }
              });
            }
          }
        })
      }
    })
  },
  //加载更多
  more(){
    this.data.rn += 10;
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