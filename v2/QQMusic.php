<?php

class QQMusic{

	//歌单列表
	protected $topid_url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?uin=0&topid=";

	//歌曲搜索
	protected $query_url = "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?jsonpCallback=aSide&uin=0&w=";

	//歌词
	protected $lyrics_url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?jsonpCallback=aSide&songmid=";

	//歌单请求
	public function topid($id){

		$p = input("p",1);//分页页数
		$r = input("r",6);//每页条目
		
		//拿到json字符串
		$res_data = request($this->topid_url.$id,[
			"referer: https://y.qq.com/portal/search.html"
		]);
		//转数组
		$res_data = json_decode($res_data,true);

		//数据打包
		$this->topSongList($res_data,$p,$r);
	}

	//歌曲搜索
	public function query($keyword){


		$p = input("p",1);//分页页数
		$r = input("r",20);//每页条目
		
		//请求url
		$url = $this->query_url.$keyword
								."&n=".$r
								."&perpage=".$r
								."&p=".$p;

		//拿到json字符串
		$res_data = request($url,[
			"referer: https://y.qq.com/portal/search.html"
		]);

		//返回的是jsonp的数据,js函数名为 aSide
		//匹配到的数据保存在 $data[1]
		$res_data = preg_match("/aSide\((.*)\)/",$res_data,$data);

		//解压json字符串
		$data = json_decode($data[1],true);

		if($data["data"]["song"]["list"]){

			//打包数据
			$this->querySongList($data,$p,$r);
		}else{

			$this->errorEmpty();
		}
	}

	//歌词
	public function lyrics($song_mid){


		//请求歌词
		$res_data = request($this->lyrics_url.$song_mid,[
			"referer: https://y.qq.com/"
		]);

		//返回的是jsonp的数据,js函数名为 aSide
		//匹配到的数据保存在 $data[1]
		$res_data = preg_match("/aSide\((.*)\)/",$res_data,$data);

		//json字符串转对象
		$res_data = json_decode($data[1],true);

		if(isset($res_data["lyric"])){

			//歌词是base64的格式,所以需要解压
			$lyric = base64_decode($res_data["lyric"]);

			exit(json_encode([
				"statuCode" => 200,
				"msg" => "ok",
				"lyric" => $this->lyricCode(explode("\n", $lyric))		
			]));
		}else{

			exit(json_encode([
				"statuCode" => 204,
				"msg" => "暂时无歌词",
				"lyric" => [],
			]));
		}

	}

	//打包歌单数据
	private function topSongList($res_data,$p,$r){

		$data = [
			"statuCode"=> 200,
    		"msg" => "ok",
			"count_num" => $res_data["cur_song_num"],//总共条目
			"count_page" => ceil($res_data["cur_song_num"] / $r),//统计分页
			"curr_page" => $p//当前分页
		];

		//开始条目
		$start_num = --$p * $r;
		$songs = array_slice($res_data["songlist"],$start_num, $r );

		//数据是否为空
		if($songs){

			//数据条目
			$data["number"] = count($songs);

			//判断库存
			$data["stock"] = $data["number"] === $r;

			//处理数据
			$data["songs"] = array_map(function($song){

				return $this->deSong($song["data"]);
			}, $songs);

			exit(json_encode($data));
		}else{

			$this->errorEmpty();
		}
	}

	//打包搜索歌曲数据
	private function querySongList($res_data,$p,$r){

		//搜索数据保存在data属性下的song属性
		$song_data = $res_data['data']['song'];
		
		$data = [
			"statuCode" => 200,
			"msg" => "ok",
			"count_num" => $song_data['totalnum'],
			"count_page" => ceil($song_data["totalnum"] / $r),//统计分页
			"curr_page" => $song_data['curpage'],
			"number" => $song_data["curnum"]
		];

		//数据是否到底
		$data["stock"] = $song_data["curnum"] === $r;


		//歌曲列表
		$data["songs"] = array_map(function($song){

				return $this->deSong($song);
			}, $song_data["list"]);
		
		//输出数据
		exit(json_encode($data));
	}

	//将歌词打包成数组的形式
	private function lyricCode($lyric){

		$lyricCode = [];
		foreach ($lyric as $item) {
			
			preg_match("/\[(.*)\](.*)/",$item,$lyricItem);

			if($lyricItem[2] != ""){

				preg_match("/(\d+):(\d+)\.(\d+)/",$lyricItem[1],$time);

				$millisecond = $time[1]*60000 + $time[2] * 1000 + $time[3]*10;

				$lyricCode[] = [
					"millisecond" => $millisecond,
					"second" => round($millisecond/1000),
					"date" => $lyricItem[1],
					"text" => $lyricItem[2]
				];
			}
		}

		return $lyricCode;
	}

	//打包单曲
	private function deSong($song){

		//搜索出来的数据没有歌手，需要判断singer
		$song["songorig"] = isset($song["songorig"]) ? $song["songorig"] : $song["singer"][0]["name"];

		
		//搜索出来没有封面
		if(!$song["albummid"]){

			$song["albummid"] = "001ZaCQY2OxVMg";
		}

		return [
				"song_url" => "http://ws.stream.qqmusic.qq.com/C100".$song['songmid'].".m4a?fromtag=0&guid=0",
				"song_mid" => $song['songmid'],
				"song_name" => $song['songname'],
				"song_orig" => $song['songorig'],
				"album_min" => "https://y.gtimg.cn/music/photo_new/T002R90x90M000".$song['albummid'].".jpg",
				"album_big" => "https://y.gtimg.cn/music/photo_new/T002R300x300M000".$song['albummid'].".jpg",
				"album_mid" => $song['albummid'],
				"album_name" => $song['albumname']
			];
	}

	//空数据返回
	private function errorEmpty(){

		exit(json_encode([
			"songs" => [],
			"statuCode" => "204",
			"msg" => "是的,啥数据都没有,所以抛出了异常"
		]));
	}
}