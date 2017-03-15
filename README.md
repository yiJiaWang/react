
# React-app

demo : [https://ss707494.github.io/react-app-ss](https://ss707494.github.io/react-app-ss)

 * 一个基于React的demo


## 现有功能
* 仿照豆瓣电影app开发的h5页面,实现列表展示,关键词搜索,不同列表切换,加载更多,列表视图切换,详情页面等功能
* 小游戏 俄罗斯方块 **方向键上下左右** 或 **点击按钮** 控制 
* 小游戏 拼图 **Get Answer按钮**可以由计算机算出答案,**左右按钮**可以执行

## 运行
```
$ git clone https://github.com/ss707494/react-app-ss.git
$ cd react-app-ss
$ npm install 
$ npm run start

```
因为使用到node-sass,若安装失败可尝试使用 cnpm 进行安装

## 相关技术
* 主体基于react官方脚手架 [Create React App](https://github.com/facebookincubator/create-react-app)  (修改了部分配置)
* UI 选择[Material-UI](https://github.com/callemall/material-ui) 一个react的ui组件
* React相关的插件
    * [React Router](https://github.com/ReactTraining/react-router)
    * [React Redux](https://github.com/reactjs/react-redux)
        * [redux-promise](https://github.com/acdlite/redux-promise)
        * [redux-logger](https://github.com/evgenyrodionov/redux-logger)
        * [redux-immutable](https://github.com/gajus/redux-immutable)
        * [redux-actions](https://github.com/acdlite/redux-actions)
    * [react-addons-css-transition-group](https://facebook.github.io/react/docs/animation.html)
* 样式使用 [CSS Modules](https://github.com/css-modules/css-modules) + [Sass](https://github.com/sass/sass) 

* 俄罗斯方块使用html标签canvas的动画实现

* 辅助工具库 [lodash](https://github.com/lodash/lodash)[fetch-jsonp](https://github.com/camsong/fetch-jsonp)

## 目录说明

```
react-app-ss/
    config/ --配置文件
    public/
    script/ --运行脚本
    src/ --主代码
        static/ --静态文件(图片,字体)
        components/ --公共组件
        style/ --通用css(未经过module处理,用类名引用)
        routes/ --路由目录
        App.js
        index.js --入口文件
        index_pro.js --打包时的入口文件,去掉日志
        
```
## TODO
