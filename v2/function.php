<?php

//编码get参数
function codeGetData($arg){

	for(;count($arg);){

		$_GET[array_shift($arg)] = array_shift($arg);
	}
}

//获取get参数
function input($name,$default=""){

	return isset($_GET[$name]) ? $_GET[$name] : $default;
}

//请求方法
function request($url,$header = []){

	//初始化
	$curl = curl_init();

	//设置抓取的url
	curl_setopt($curl, CURLOPT_URL, $url);

	//设置头文件的信息作为数据流输出
	curl_setopt($curl, CURLOPT_HEADER, 0);

	//设置获取的信息以文件流的形式返回，而不是直接输出。
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	//设置SSL证书相关
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

	//设置头部信息
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

	//执行命令
	$data = curl_exec($curl);

	//关闭URL请求
	curl_close($curl);

	return $data;
}