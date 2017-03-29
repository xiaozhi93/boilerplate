process.env.NODE_ENV = 'production';
var chalk            = require('chalk');
var webpack          = require('webpack');
var path             = require('path');
var paths            = require('./config/paths');
var config           = require('./config/webpack.config.prod');

console.log(chalk.cyan('编译中…'));

//打印错误
function peintErrors(msg, errors) {
  console.log(chalk.red(msg));
  console.log('');
  errors.forEach(err =>{
    console.log(chalk.red(err.message || err));
    console.log('');
  });
};

//编译
webpack(config).run((err, stats) => {
  //程序出错
  if (err) {
    peintErrors('出错啦！', [err]);
    //退出程序
    process.exit(1);
  };
  //编译出错
  if (stats.compilation.errors.length) {
    peintErrors('编译失败…', stats.compilation.errors);
    process.exit(1);
  };
  //编译出警告
  if (process.env.CI && stats.compilation.warnings.length) {
    printErrors('编译出错啦/(ㄒoㄒ)/~~(警告)', stats.compilation.warnings);
    process.exit(1);
  };
  //编译成功
  console.log(chalk.green('编译成功！'));
});
