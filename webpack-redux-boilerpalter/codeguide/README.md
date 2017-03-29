# 杭州博科思科技有限公司

## 前端开发代码规范

## 目录

***
## 引言

#### 编写目的

* 为了统一代码标准规范，便于维护和阅读，特制定此规范。

#### 预期读者

* 博科思开发部所有人员

***

## CSS规范

#### css命名和模块化标准

* 111

    ```
    1)页面结构
        容器: container
    
        页头：header
    
        内容：content/container
    
        页面主体：main
    
        页尾：footer
    
        导航：nav
    
        侧栏：sidebar
    
        栏目：column
    
        页面外围控制整体布局宽度：wrapper
    
        左右中：left right center

    2)导航

        导航：nav
    
        主导航：mainbav
    
        子导航：subnav
    
        顶导航：topnav
    
        边导航：sidebar
    
        左导航：leftsidebar
    
        右导航：rightsidebar
    
        菜单：menu
    
        子菜单：submenu
    
        标题: title
    
        摘要: summary

    3)功能

        标志：logo
    
        广告：banner
    
        登陆：login
    
        登录条：loginbar
    
        注册：regsiter
    
        搜索：search
    
        功能区：shop
    
        标题：title
    
        加入：joinus
    
        状态：status
    
        按钮：btn
    
        滚动：scroll
    
        标签页：tab
    
        文章列表：list
    
        提示信息：msg
    
        当前的: current
    
        小技巧：tips
    
        图标: icon
    
        注释：note
    
        指南：guild
    
        服务：service
    
        热点：hot
    
        新闻：news
    
        下载：download
    
        投票：vote
    
        合作伙伴：partner
    
        友情链接：link
    
        版权：copyright
    
        注：当层级较多或者字段较多时候，所有的常用命名可简写，如注册：regsiter可简写为reg
    
        4)常用简写命名规则：
    
        bd：Body

    常用简写命名规则：

        bd：Body
    
        hd：Header
    
        fnt：字体
    
        nav：导航
    
        tb：表格
    
        lnk：链接
    
        ml/mr：margin-left/margin-right
    
        lst：列表
    
        pl/pr/pd：padding-left/-right/padding
    
        col：栏目
    
        frm：表单
    
        con：内容
    
        inf：信息
    
        lg：Logo
    
        inp：Input
    
        ft：Footer
    
        btn：Button
    
        more：更多
    
        fl/fr：float:left/float:right
    
        tit： 标题栏
    
        bdr：边
    
        w：宽
    
        h：高

    5）除了常用命名的名称以外，CSS样式名称则以拼音或英文命名。
    6）一律采用小写中划线方式命名，多个单词间以中划线间隔，中划线隔开的级数不要过多。
    7）模块名称充分考虑名称语义化,模块内部的类名继承于上层的名称比如：

    
    <div class="ui-box">
       <h3 class="ui-box-title"></h3>
    </div>
    ```
    不要这样写，很容易造成命名上的冲突。
     &lt;div class=&quot;ui-box&quot;&gt;
       &lt;h3 class=&quot;title&quot;&gt;&lt;/h3&gt;
    &lt;/div&gt;
    8）在模块 DOM 结构的最外一层添加状态，而非给每一个内容添加状态,除非内容有独立的状态。
    比如，我们可以这样写：
     &lt;div class=&quot;ui-box ui-box-hover&quot;&gt;
       &lt;h3 class=&quot;ui-box-title&quot;&gt;&lt;/h3&gt;
    &lt;/div&gt;
    但不要这样写：
    &lt;div class=&quot;ui-new&quot;&gt;
       &lt;h3 class=&quot;ui-box-title ui-box-title-hover&quot;&gt;&lt;/h3&gt;
    &lt;/div&gt;
    9）模块整体状态 = 模块名 + 状态 常用状态有：hover, current, selected, disabled, focus, blur, checked, success, error 等。通常你的命名应该看起来像 .ui-name-hover, .ui-name-error 这样。
    子模块 = 模块名 + 子模块名 常用模块名有：cnt(content)，hd(header)，text(txt)，img(images/pic)，title，item，cell 等， 只要词义表达了组件要实现的功能或者要表现出来的的外观就可以了。
    ```


#### CSS属性顺序
    1. 1）自身属性（盒模型）：width/height/margin/padding/border
    2. 2）文本属性color/font/text-decoration/text-align/text-indent/vertical-align/white-space/content
    3. 3）CSS3属性：transform/transition/animation/box-shadow/border-radius
    4. 4）CSS3浏览器前缀，则按照-webkit- / -moz- / -ms- / -o- / std的顺序进行添加，标准属性写在最后。

#### CSS命名分类
    1. 1） **布局** ：以g为命名空间，例如：.g-wrap 、.g-header、.g-content、.g-mian、.g-aside 等；
    2. 2） **状态** ：以is为命名空间，表示动态的、具有交互性质的状态，例如：.is-open、.is-active、.is-selected 等；
    3. 3） **组件** ：以ui为命名空间，表示可复用、移植的组件模块，例如：.ui-slider等；
    4. 4） **扩展** ：以ext为命名空间，表示对组件基类的视觉形态的扩展，例如：.ext-cover、、.ext-alignLeft 等；
    状态类或扩展类一般出现在组件的父级节点，并且不允许单独使用。举个例子，同一个页面有可能会在不同的地方都会使用is-active，并且每个is-active所操纵的节点的是不同的，所以要使用.ui-userCard.is-active 或.ui-userCard .is-active来定义


#### CSS性能优化
    1）合并margin、padding、border的-left/-top/-right/-bottom的设置，能缩写的进行缩写，尽量使用短名称(例如：margin-top/margin-left...写成margin：参数；)
    2.
    2）颜色值尽量用三位字符表示，例如#AABBCC则可简写成#ABC
    3. 3）背景图片请尽可能使用sprite雪碧图或者使用iconfont, 减小http请求。
    4. 4）display:inline后不应该再使用width、height、margin、padding以及float，display:inline-block后不应该再使用float，display:table-\*后不应该再使用margin或者float。
    5）选择器的嵌套不要过多，比如：.header .logo .text{} 可以优化成.haeder .logo-text{}

#### 兼容性CSS hack书写
    1. 1）IE都能识别\* ; 标准浏览器(如FF)不能识别\*；
    2. 2）IE6能识别\*，但不能识别!important; IE6在样式前面加\_
    3. 3）IE7能识别\*，也能识别!important;
    4. 4）IE8能识别\ 9 例如：background:red \9;
    5. 5）firefox不能识别\*，但能识别!important;
    6. 6）手机端兼容的问题区别太大的情况采用html标签加载不同的CSS文件，&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot;media=&quot;screen and (max-device-width: 400px)&quot; href=&quot;a.css&quot; /&gt;它的意思是如果屏幕宽度小于400像素（max-device-width: 400px），就加载a.css文件。
    &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot;media=&quot;screen and (min-width: 400px) and (max-devicewidth: 600px)&quot;href=&quot;b.css&quot; /&gt;它的意思是在400像素到600像素之间，就加载b.css文件。
    同一个CSS文件中，也可以根据不同的屏幕分辨率，选择应用不同的CSS规则
    @media screen and (max-device-width: 400px) { .column { float: none; width:auto; } }如果屏幕宽度小于400像素，则column块取消浮动（float:none）、宽度自动调节（width:auto）

***
## JS规范

#### JS命名规范
    1. 1） **文件编码** 统一为utf-8, 书写过程过, 每行代码结束必须有分号;
    2.
    2） **变量** 在JS里会区分大小写，如变量score与Score是不一样的，相当于两个变量,规范采用小驼峰式命名法：首字母小写，第二个单词首个字母为大写，
    尽量在变量名字中体现所属类型，如count等表示数字类型:  var maxCount = 10;
    boolean 类型的变量使用is 或has 开头。
    3. 3） **常量** 全部大写，使用大写字母和下划线来组合命名，下划线用以分割单词。例如var MAX\_COUNT = 10;
    4. 4） **函数** 命名同样是小驼峰式命名法：首字母小写，如getName()。
    5. 5） **构造函数** （new 运算符创建对象）采用大驼峰式命名法，首字母大写。例如var st = new Student(&#39;tom&#39;);
    6. 6） **命名语义化** , 尽可能利用英文单词或其缩写;

#### JS语法规范
    1) 语句块内的函数声明，不要在非函数块中(if, while)声明函数，不同的浏览器会用不同的方式解析它。

    例如:if (x) { function foo() {} }

    推荐if (x) { var foo = function() {}; }

    2）数组用字面量语法创建数组，例如var items = [];而不是var items = new Array();添加数组元素时，使用push而不是直接添加。

    3）不要命名一个参数为arguments，否则它将优先于传递给每个函数作用域中的arguments对象。
    如此function yup(name, options, args) { // ...stuff... }
    而不是function nope(name, options, arguments) { // ...stuff... }

    4）不要在函数内部定义过多常量,不要在函数外部定义过多常量和变量,需要多用var声明(只有赋值为null时才会被js解释器的垃圾回收器回收内存）。

#### 注释规范
    1）单行注释
    单行注释可以写在单独一行
    2）多行注释
    3) 模块注释
    模块注释必须单独写在一行

    4）CSS样式注释
    注释的内容写在/\*与/\*之间，后期有新增样式时，可加入新增的相关说明和新增时间。

    5）html注释: 注释格式&lt;!--这儿是注释--&gt;

    6）JavaScript注释: //这儿是单行注释; 多行注释使用/\*\* … \*/
