import Storage from '../../lib/Stroage.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let db = new Storage('storage');
		// db.add([{a: 3},{a: 111}, {a: 333},{a: 4444}, {a: 5555}, {a: 6666},{a: 7777}]).save();
		// db.where('a', '<', '1');
		// let arr = db.where('a', '>', 4444).select();
		// let data = arr.slice(2, 4)
		// console.log(data);
		// db.where('a', '=', 6666).delete().save();
		// db.where('a', '=', 1111).update({a: 1111}).save();
		// console.log(db.where('a', '>', 3).sequence('a').limit(2, 3).select());

		// 'a,<,3&a,=,333', 'a', 'like', 3
		db.where('a,=,111&a,=,333&a,=,4444').delete().save();
		// console.log(db.where('a,=,111&a,=,333&a,=,4444').find());
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