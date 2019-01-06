let URL = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj'
/*{
  //请求参数, 类型全部是Number
  queryEnc: "",//关键字
  queryExt: "",//关键字
  listNum: "总页数",
  display: "总结果",
  pn: 30,//页数, 最大100
  rn: 30,//显示每页项数, 最大60
  width: ,
  height: ,
  face: ,
  istype: 2,
  tn:'baidulocal'//百度内搜索
}*/
// pages/request/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wd: '',
    pn: 10,
    rn: 30,
    images: {
      left: [],
      right: []
    },
    height: {
      left: 0,
      right: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({q}) {
    this.data.wd = q;
    this.showPage();
  },
  // 显示页面
  showPage(){
    let data = this.requestData();
    data.then(({ data }) => {
      let d = this.dataArrange(data.data);
      this.showData(d);
    });
  },
  //请求
  requestData(){
    let codeUrl = `${URL}&pn=${this.data.pn}&rn=${this.data.rn}&wd=${this.data.wd}`;
    return new Promise((resolve, reject) => {
      wx.request({
        url: codeUrl,
        success: resolve,
        fail: reject
      })
    })
  },
  //整合
  dataArrange(data){
    let dataArrange = [];
    data.forEach(item => {
      if (item.adType) {
        dataArrange.push(Object.assign({
          thumbURL: item.thumbURL,
          middleURL: item.middleURL,
          objURL: item.middleURL
        },this.zoom(item)));
      }
    })
    return dataArrange;
  },
  //根据宽度定义高度(等比例)
  zoom(img) {
    let zoom = 100 / img.width;
    return {
      width: img.width * zoom,
      height: img.height * zoom
    }
  },
  //赋值/筛选
  showData(data){
    data.forEach(img => {
      // 1 2 3 4
      if (this.data.height.left <= this.data.height.right) {
        this.data.images.left.push(img);
        this.data.height.left += img.height;
      } else {
        this.data.images.right.push(img);
        this.data.height.right += img.height;
      }
    })
    this.setData({
      images: this.data.images
    })
  },
  // 加载更多
  more(){
    this.data.pn += 10;
    this.showPage();
  },
  //image点击
  download(e){
    let src = e.target.dataset.src;
    wx.downloadFile({
      url: src,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          fail(err){
            if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
              console.log("打开设置窗口");
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
                          scope:'scope.writePhotosAlbum',
                          success() {
                            console.log('授权成功')
                          }
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
  previewImg(e){
    let current = e.target.dataset.src;
    let urls = [...this.data.images.left, ...this.data.images.right].map( ({ middleURL }) => middleURL);
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