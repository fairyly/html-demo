# Valine + Leancloud

* test: [add comments](https://front-ends-developers.github.io/valine_comment_page/index.html)


Valine 文档: https://valine.js.org/

wiki: https://github.com/xCss/Valine/wiki

* 使用说明博客: https://ioliu.cn/2017/add-valine-comments-to-your-blog/


## Vue 项目中使用

单纯以模块引入没有效果， 最后添加到 index.html 中CDN资源才可以

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
