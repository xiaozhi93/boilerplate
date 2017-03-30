/**
 * @author Yong93
 * @time 2017/3/30.
 */
//传统身份验证方法（成功）
var request = require('request');
var session;
request(
	{
		url: 'https://www.51vj.cn//login',  //请求的URL
		method: 'POST',  //POST方式请求
		encoding: null,  //由于Node默认是UTF-8
		headers: {  //请求头的设置
			ContentType: 'application/x-www-form-urlencoded'
		},
		form: {  //请求体，参数
			drexvcd:"boxwj",
			xdsevfx:"box123",
			autologin:"on"
		}
	},
	function (err, res, body) {   //接收回调
		session = res.headers['set-cookie'];  //获取set-cookie字段值
		//console.log("session"+session);
		//console.log("body"+body);
		//console.log("res"+res);
		//console.log("err",err);
		if (!err) {
			
		}else {
			console.log(err);
		}

	}
);
setTimeout(function () {
	request
	(
		{
			url: 'https://www.51vj.cn/module/department/getRootAndChildDepart',  //构建请求
			encoding: null,  //不转码
			headers: {
				Cookie: session         //这里是关键，设置Cookie为之前请求到的以Cookie形式呈现的SessionID
			}
		}, function (err, res, body) {  //获取响应即可
			console.log("body"+body);
			if (!err) {
				console.log("body"+body);
			}
		}
	);
},3000)

