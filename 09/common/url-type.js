//国家地区
export const region = [
    { name: "欧美", id: 3 },
    { name: "内地", id: 5 },
    { name: "港台", id: 6 },
    { name: "韩国", id: 16 },
    { name: "日本", id: 17 }
];

//推荐歌单
export const sheet = [
    { name: "热门歌曲", id: 26 },
    { name: "新歌专辑", id: 27 },
    { name: "网络歌曲", id: 28 }
];


//请求url
export const urlType = {
    //服务器主机
    host: "https://api.atoz.ink/"
};

urlType.topid = urlType.host + "topid/";//歌单
urlType.query = urlType.host + "query/";//搜索
urlType.lyrics = urlType.host + "lyrics/";//歌词
urlType.music = 'C:\\Users\\Du\\Desktop\\Applets\\09\\mp3\\1.mp3';// 歌曲绝对路径
urlType.title = '寂静之夜';