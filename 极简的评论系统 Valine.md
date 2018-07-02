# Valine + Leancloud

* test: [add comments](https://front-ends-developers.github.io/valine_comment_page/index.html)


Valine 文档: https://valine.js.org/

wiki: https://github.com/xCss/Valine/wiki

* 使用说明博客: https://ioliu.cn/2017/add-valine-comments-to-your-blog/


## Vue 项目中使用

- 单纯以模块引入没有效果， 最后添加到 index.html 中CDN资源才可以

```

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js" data-no-instant></script>
    <script src='//unpkg.com/valine/dist/Valine.min.js' data-no-instant></script>
    <title>ourapp</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

- 引入页配置：
```
valineObj: {
          el: '#vcomments',
          notify:false,
          verify:false,
          appId: 'dM7VDvl6pYCGVsrhpjFUPTzv-gzGzoHsz',
          appKey: '1tWRv0vgoDPpJ2oDm0rKJSOP',
          placeholder: '请在这里留言吧',
          path: this.$route.path,
          avatar:'mm'
      }
      
 watch:{
      //检测url变动重新渲染comment
      $route(to){
          let that=this;
          console.log(that.$route.path)
          that.valineop.path = that.$route.path;
          Vue.nextTick(function(){
            new Valine(that.valineObj);
        })
      }
  },
  mounted() {
    console.log(this.$route)
    var that = this

    var init = new Valine(that.valineObj);
    console.log(init);
  }
```


## 模块引入方式
- 我提的 issue: https://github.com/xCss/Valine/issues/96

```
引入Leancloud的js-sdk所致，解决方案如下：

安装：
npm install leancloud-storage --save
npm install valine --save
使用：
<template>
    <div>
        <div class="vcomments"></div>
    </div>
</template>
<script>
// 将AV对象注册到全局
window.AV = require('leancloud-storage');
import Valine from 'valine';
export default{
    name:'index',
    data(){
        return {}
    },
    mounted(){
        new Valine({
            el:'.vcomments',
            // other config
        })
    }
}
<script>
```
