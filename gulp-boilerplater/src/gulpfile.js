/* jshint node: true */
/*
* @Author: xiaozhi93
* @Date:   2016-11-11 11:11:11
* @Last Modified by:   Administrator
* @Last Modified time: 2016-02-26 16:38:43
*/
'use strict';
/**
 * require modules
 */
var gulp = require('gulp');
var browsersync = require('browser-sync').create();  //本地服务器
var proxy = require('http-proxy-middleware');
var minifyjs = require('gulp-uglify');  //压缩js
var minifycss = require('gulp-clean-css');//清空压缩css
var minifyimg = require('gulp-imagemin');   //压缩 PNG, JPEG, GIF and SVG images
var pngquant = require('imagemin-pngquant'); //png图片压缩插件（非gulp插件）
var sass = require('gulp-sass');         //sass解析
var rename = require('gulp-rename');      //文件名重复命名
var replace = require('gulp-replace');    //文件里面的内容替换
var htmlreplace = require('gulp-html-replace'); //用于里面的所有的css,js替换成一个合并的css,js文件
var concat = require('gulp-concat');          //用于将js合并成一个文件js
var header = require('gulp-header');        //用于标注版本和作者信息
var fs = require('fs');

//基本配置
var pkg = require('./package.json');
var headerInfo = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @author xiaozhi93 <email:974589985@qq.com  qq:974589985>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''].join('\n');
//http://api.map.baidu.com/telematics/v3/weather?location=%E5%98%89%E5%85%B4&output=json&ak=5slgyqGDENN7Sy7pw29IUvrZ
var proxyUrl = 'https://www.51vj.cn';  //browser-sync proxy model url

//模块集成功能入口
/**
 * default task（启动本地服务器,生产环境（html,css文件夹（生成），sass文件夹，js文件夹））
 */
gulp.task('default', ['bsync']);

/**
 * release task  （版本发布，合并压缩css，js,替换HTML的css,js，） 
 */
gulp.task('release', ['releasecss', 'releasejs', 'releasehtml', 'css',  'js', 'img']);

//服务器环境
/**
 * browser-sync（本地服务器任务，监听当前目录的文件，并且监听sass文件）
 */
gulp.task('bsync', function() {
    browsersync.init({
        server: {
            baseDir: "./",
            index: 'index.html'
        },
        files: ['*.html', 'css/*.css', 'js/*.js'],
        browser: 'chrome'
        // ui: {
        // 	port: 3000    //默认端口号
        // }
    });
    gulp.watch('sass/*.scss', ['sass']);
});

//模块发布（css,js合并在压缩,html）
/**
 * release css task（合并css和压缩到制定的文件夹中，用于合并模块成一个文件）
 */
gulp.task('releasecss', ['sass'], function(){
    gulp.src('css/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('../dist/css'));
});
/**
 * release js task（合并js和压缩到执行的文件夹中，用于合并模块文件）
 */
gulp.task('releasejs', function(){
    gulp.src('js/*.js')
        .pipe(concat('bundle.min.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('../dist/js'));
});
/**
 * release html task（用于将html里面引用的css,js用一个替换，并且打包到dist文件夹）
 */
gulp.task('releasehtml', function(){
    gulp.src('*.html')
        .pipe(htmlreplace({
            'css': 'css/style.min.css',
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest('../dist'));
});

//模块压缩（css,js,img）
/**
 * minify css task（压缩sass解析完的css并且加header信息到执行的文件夹中，用于生成模块文件）
 */
gulp.task('css', ['sass'], function(){
    gulp.src('css/*.css')
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(headerInfo, {pkg : pkg}))
        .pipe(gulp.dest('../dist/css'));
});
/**
 * sass（sass文件编译到当前生产环境）
 */
gulp.task('sass', function(){
    return gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css/'));
});
/**
 * minify js task（压缩js到资源文件夹，用于生成模块文件）
 */
gulp.task('js', function(){
	gulp.src('js/*.js')
	.pipe(minifyjs())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(header(headerInfo, {pkg : pkg}))
	.pipe(gulp.dest('../dist/js'));
});

/**
 * minify image task(图片压缩到制定的文件夹中)
 */
gulp.task('img', function(){
	gulp.src('images/**/*.{png,jpg,gif,ico}')
	.pipe(minifyimg({
			optimizationLevel: 5,   //图片优化等级  0 -7
			progressive: true,
			use: [pngquant()] //使用pngquant来压缩png图片
		}))
	.pipe(gulp.dest('../dist/img'));
});



//其他功能拓展,,如何让本地的某个路径（将第三方网站变成本地的子目录）代理  /api  去代理代理目标的某个地址
/**
*proxy（本地服务器配置制定的代理地址,将localhost:3001代理成Proxying: http://api.map.baidu.com）
*/
gulp.task('bsync-proxy', function() {
    browsersync.init({
				https: true,
				//server: {
				//	baseDir: "./"
				//},
        //proxy: proxyUrl,
			  //proxy:"https://www.baidu.com/",
				proxy: {
					target: "https://www.baidu.com/",
					middleware: function (req, res, next) {
						console.log(req.url);
						next();
					}
				},
        files: ['*.html', 'css/*.css', 'js/*.js'],
        browser: 'chrome',
        port:3001
    });
    gulp.watch('sass/*.scss', ['sass']);
});


//https://www.51vj.cn/module/department/getRootAndChildDepart
const apiProxy = proxy('/api', {
	target: 'http://localhost:8981/index',
	changeOrigin:true,
	ws: true
});
gulp.task('http-proxy', function() {
	browsersync.init({
		https: true,
		server: {
			baseDir: "./",
			middleware: [
				apiProxy
			]
		},
		files: ['*.html', 'css/*.css', 'js/*.js'],
		browser: 'chrome',
		port:3010
	});
	gulp.watch('sass/*.scss', ['sass']);
});

/**
 * init project task（初始化项目任务，用于拓展）
 */
gulp.task('init', function(){
	console.log("工作流，用于拓展其他任务");
});
