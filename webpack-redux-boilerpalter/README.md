## 微加
微加标准版PC后台

***
## 项目规范
项目开发规范预览[详细文档](./codeguide)

#### 文件规范
* 编码(encoding)： UTF-8
* 换行符风格(line_ending)： system(windows)
* 缩进风格： 空格(spaces)
* 缩进大小(tab_size)： 2

#### CSS规范
* css文件命名：
  * 全局css文件使用小写字母命名（不包括第三方插件） common.css
  * 组件css文件使用帕斯卡命名 Active.css LeftMenu.css
* className命名方式：
  * 全局className使用小写字母命名，连接符使用破折号（-） .left .left-menu
  * 组件className使用驼峰式命名  .leftMenu .leftMenuRight
* css书写风格
  ``` css
    .style {height: 10px;}

    .jsx {
      color: #fff;
      width: 20px;
    }

    .html,
    .css,
    .js {
      color: red;
      width: inherit;
      background-color: rgba(0,0,0,.1);
      box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
    }
  ```

#### JavaScript规范
* js文件命名：
  * 全局js文件使用小写字母命名（不包括第三方插件） common.js
  * 组件js文件使用帕斯卡命名 Active.js LeftMenu.js
* js书写风格

    ``` javascript
    let index = 0;
    const countNumber = () => {
      for (var i = 0; i < 100; i++) {
        index += i;
      };
      console.log(index);
    };
    countNumber();
    ```

***
## 开发环境
* Node.js: v6.X LTS

***
## 初始化项目
```
npm install
```

***
## 启动项目
```
npm start
```

***
## 启动项目本地数据库
```
npm run mock
```

***
## 项目打包
```
npm run build
```

***
## 结构目录
```
.
├── api                           # 接口
├── codeguide                     # 代码规范相关
├── config                        # webpack相关配置
│   ├── paths.js                  # 项目路径配置文件
│   ├── webpack.config.dev.js     # webpack开发相关配置
│   └── webpack.config.prod.js    # webpack生产相关配置
├── database                      # 本地数据库
├── public                        # 模板引用
├── src                           # 项目源文件
│   ├── actions                   # action相关
│   ├── components                # 全局组件
│   ├── containers                # 路由页面容器组件
│   ├── layouts                   # 项目主页
│   │   ├── Header                # 主页头部
│   │   │   └── assets            # 组件相关静态文件夹（非必要）
│   │   │       ├── images        # 组件相关图片
│   │   │       └── style.css     # 组件相关样式
│   │   ├── index.js              # 映射文件
│   │   ├── LeftMenu              # 主页侧面菜单
│   │   └── Layout.js             # 主页
│   ├── lib                       # 第三方插件
│   ├── reducers                  # reducers相关
│   ├── routes                    # 前端路由管理
│   │   ├── Contact               # 子页面（通讯录）
│   │   └── index.js              # 路由相关配置
│   ├── static                    # 静态文件
│   │   ├── images                # 全局图片
│   │   └── style                 # 全局样式
│   ├── store                     # redux相关
│   └── main.js                   # 项目启动和渲染
├── .babelrc                      # label-loader相关配置文件
├── .gitignore                    # git相关配置文件
├── build.js                      # 打包入口
├── package.json                  # 项目配置管理文件
├── README.md                     # markdown
└── server.js                     # 本地开发入口
```



