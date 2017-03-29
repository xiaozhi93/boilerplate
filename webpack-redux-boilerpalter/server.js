process.env.NODE_ENV      = 'development';
var chalk                 = require('chalk');
var webpack               = require('webpack');
var webpackDevServer      = require('webpack-dev-server');
var detect                = require('detect-port');
var clearConsole          = require('react-dev-utils/clearConsole');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var getProcessForPort     = require('react-dev-utils/getProcessForPort');
var openBrowser           = require('react-dev-utils/openBrowser');
var prompt                = require('react-dev-utils/prompt');
var paths                 = require('./config/paths');
var config                = require('./config/webpack.config.dev');
var isInteractive         = process.stdout.isTTY; // 判断是否在终端环境中执行
var DEFAULT_PORT          = paths.defaultPort;
var compiler;
process.env.HOST          = paths.defaultHost;

//使用webpack.config.dev配置进行编译
function setupCompiler() {
  compiler = webpack(config);
  compiler.plugin('done', function(stats) {
    var messages     = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    //终端运行（清除之前的打印）
    if (isInteractive) {
      clearConsole();
    };
    //成功
    if (isSuccessful) {
      console.log(chalk.green('编译成功，监听中…'));
    };
    //错误异常
    if (messages.errors.length) {
      console.log(chalk.red('编译失败！'));
      messages.errors.forEach(msg => {
        console.log(msg);
      });
      return;
    };
    //警告异常
    if (messages.warnings.length) {
      console.log(chalk.yellow('警告！'));
      messages.warnings.forEach(msg => {
        console.log(msg);
      });
      return;
    };
  });
};

//启动服务（服务配置，代理请求路径地址）（服务监听）
function runDevServer(host, port) {
  //配置devServer
  var devServer = new webpackDevServer(compiler, {
    quiet: true, //不向终端输出任何内容
    compress: false, //使用gzip压缩
    hot: true,
    publicPath: config.output.publicPath,
    host: host,
    historyApiFallback: true,
    clientLogLevel: 'none', //在浏览器中显示终端的日志消息
    proxy: {             //重写代理路径
      '/api': {
        //https://www.51vj.cn/module/department/getRootAndChildDepart
        target: paths.proxyTarget, //要代理到的地址
        //target:"https://www.51vj.cn",
        pathRewrite: {'^/api': paths.proxyPath}, //重写url     ...重写/api代理其他路径，，默认代理是代理网站的根目录
        changeOrigin: true,
        secure: false, //若地址为https，需要设置为false
        onProxyReq: function(proxyReq, req, res) { //提前设置一些代理的头部，如token信息等
          //console.log(proxyReq);
          //console.log(req);
          //console.log(res);
          
        }
      }
    }
  });
  //启动devServer
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    };
    if (isInteractive) {
      clearConsole();
    };
    console.log(chalk.cyan('正在启动本地服务…'));
    if (isInteractive) {
      openBrowser(`http://${host}:${port}`);
    };
  });
};

function run(port) {
  //设置host
  var host = process.env.HOST || 'localhost';
  //设置编译器
  setupCompiler();
  //启动服务
  runDevServer(host, port);
};

//启动端口检测程序
detect(DEFAULT_PORT).then(port => {
  //端口未被占用
  if (port === DEFAULT_PORT) {
    run(port);
  //端口已被占用
  } else {
    //如果在终端环境中执行
    if (isInteractive) {
      //返回被占用端口上正在运行的进程
      var existingProcess = getProcessForPort(DEFAULT_PORT);
      var msg             = chalk.yellow(`端口：${DEFAULT_PORT}已被"${existingProcess ? existingProcess : ''}"占用。\n\n是否用端口${port}代替？`);
      //清空终端
      clearConsole();
      //打印并显示输入端口号操作
      prompt(msg, true).then(shouldChangePort => {
        if (shouldChangePort) {
          run(port);
        };
      });
    } else {
      console.log(chalk.red(`端口${DEFAULT_PORT}已被占用.`));
    };
  };
}).catch(err => {
  console.log(err);
});
