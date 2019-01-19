<?php
	
	//开启报错信息,用于调试
	//error_reporting(0);
	//报告运行时错误
	//error_reporting(E_ERROR | E_WARNING | E_PARSE);
	//报告所有错误
	//error_reporting(E_ALL);

	//设置请求头
	header("Content-Type:text/html;charset=UTF-8");

	//导入类 
	require __DIR__."/function.php";

	//导入类 
	require __DIR__."/QQMusic.php";

	//实例化类
	$QQMusic = new QQMusic;

	//获取请求参数
	$arg = array_filter(explode("/",$_SERVER["QUERY_STRING"]));

	//方法名
	$method = array_shift($arg);

	//执行方法
	if(count($arg) >= 1 && method_exists($QQMusic,$method)){

		//参数
		$data = [array_shift($arg)];

		//设置get参数
		codeGetData($arg);

		//执行
		call_user_func_array([$QQMusic,$method],$data);
	}else{

		//设置请求头
		header("status: 404 Not Found");

		//程序终止
		exit(json_encode(['statuCode'=>404,"msg"=>"你要不要试下带上参数???"]));
	}