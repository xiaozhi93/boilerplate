var fs   = require('fs');
var path = require('path');
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
};

module.exports = {
  target: 'http://localhost',
  defaultHost: 'localhost',
  defaultPort: 8980,
  appBuild: resolveApp('build'),
  appPublic: resolveApp(''),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/main.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  proxy: 'http://localhost:8981',
  proxyTarget: 'http://localhost:8981',
  proxyPath: '/'
};
