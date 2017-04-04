/**
 * @author xiaozhi
 * @time 2017/4/2
 * @version 1.0.0
 */
var http=require('http');
var request = require('request');
//http://localhost:3010/images/banner.png  能返回成功
http.createServer(function (req, resp) {
	if (req.url === '/images/banner.png') {
		var x = request('https://www.51vj.cn/images/banner.png');
		//req.pipe(x);
		//x.pipe(resp);
		//能返回成功
		req.pipe(request({
			url:'https://www.51vj.cn/images/banner.png',
		})).pipe(resp);
	}
}).listen(3010);
