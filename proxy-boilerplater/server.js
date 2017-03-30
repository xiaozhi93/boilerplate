/**
 * @author Yong93
 * @time 2017/3/30.
 */
var express = require('express');
var request = require('request');
var app = express();
//登陆配置
var config={
			loginUrl:'https://www.51vj.cn//login',
			url:"https://www.51vj.cn/",
			form: {
				drexvcd:"boxwj",
				xdsevfx:"box123",
				autologin:"on"
			},
			session:""
};
//登陆并且请求数据
app.use('/',function (req,res) {
	res.send('user ');
})
app.use('/vjApi',function (req,res) {
	//请求登陆
	if(!config.session){
		console.log(config.session);
		request(
			{
				url: config.loginUrl,
				method: 'POST',
				encoding: null,
				headers: {
					ContentType: 'application/x-www-form-urlencoded'
				},
				form: config.form
			},
			function (err, response, body) {   //接收回调
				config.session = response.headers['set-cookie'];  //获取set-cookie字段值
				console.log(config.session);
				if (!err) {
					requestSource(req,res);
				}else {
					console.log(err);
				}
			}
		);
	}else {
		console.log(config.session);
		requestSource(req,res);
	}
})
//已经登陆请求的数据  var url = 'https://www.51vj.cn/module/department/getRootAndChildDepart
function requestSource(req,res) {
	var url=config.url+req.url;
	console.log(url);
	req.pipe(request({
		url:url,
		headers: {
			Cookie: config.session
		}
	})).pipe(res);
}
//不需要登陆的请求代理 http://apis.juhe.cn/mobile/get?phone=13429667914&key=11
app.use('/api', function(req, res) {
	var url = 'http://apis.juhe.cn/' + req.url;
	console.log(url);
	req.pipe(request(url)).pipe(res);
});
app.listen(process.env.PORT || 3005);