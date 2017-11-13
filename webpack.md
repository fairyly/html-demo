# webpack

正式使用Webpack前的准备  
创建一个package.json文件  
在终端中使用npm init命令可以自动创建这个package.json文件

* 安装
 ```
npm install --save-dev webpack
npm install --save-dev webpack@<version>
 ```

* [webpack 入门指南精简版](http://mp.weixin.qq.com/s/EKGXYq1okZ_yahYtpbXbsw)
* [新版webpack 掘金](https://juejin.im/post/5a068c2b5188255851322b8c?utm_medium=fe&utm_source=weixinqun)


>>> webpack v1 is deprecated :  v1 版本已经过时了
* 阿里巴巴 UED: [升级 Webpack2 了吗](http://www.aliued.com/?p=4060)



新的挑战者：rollup:https://github.com/rollup/rollup  
杀手锏是 tree-shaking，可以减小打包后的体积。为了赶超 rollup，webpack 也加入了 tree-shaking 功能，推出了 webpack2。  


### 什么是tree-shaking

  - DCE是去除死代码，而tree-shaking是保留活代码，是实现DCE的一种方式。
  - 要想使用tree-shaking，需要解析ES6模块语法，webpack2是借助于acorn实现这一点的。在拿到AST之后，
    webpack2会统计每个模块export的方法被使用的次数，并把没有用到的export语句删掉。
    至于没有被export的定义，则要在后续的DCE(dead code elimination)过程中消除。
    import/export之外的ES6代码，要使用Babel进行转码，因为acorn只有解析功能，但没有转换功能
  ```
  helpers.js

  export function foo() {
      return 'foo';
  }
  export function bar() {
      return 'bar';
  }
  main.js

  import {foo} from './helpers';

  let elem = document.getElementById('output');
  elem.innerHTML = `Output: ${foo()}`;
  helpers.bundle.js (// after webpack)

  function(module, exports, __webpack_require__) {
    /* harmony export */ exports["foo"] = foo;
    /* unused harmony export bar */;

    function foo() {
        return 'foo';
    }
    function bar() {
        return 'bar';
    }
  }
  helpers.bundle.min.js (// after uglify)

  function (t, n, r) {
    function e() {
        return "foo"
    }
    n.foo = e
  }
  可见，经过webpack2打包之后，未使用的export bar会被标记为/* unused harmony export bar */，然后，再经过uglify，未被export的bar定义会被删除。
  ```


### 升级指南


## webPack和Grunt以及Gulp相比有什么特性

Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，  
不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。  

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，工具之后可以自动替你完成这些任务。

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。  
Webpack的处理速度更快更直接，能打包更多不同类型的文件
