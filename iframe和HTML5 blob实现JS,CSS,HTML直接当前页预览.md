# iframe和HTML5 blob实现JS,CSS,HTML直接当前页预览

核心原理：  
此效果实现的核心原理是：  

创建<iframe>元素；  
将CSS，HTML字符串转换为Blob对象；  
使用URL.createObjectURL()方法将Blob对象转换为URL对象并赋予我们创建的<iframe>元素的src属性；  
使用JavaScript代码表示更加一目了然：  

// 1. 创建<iframe>元素  
var iframe = document.createElement('iframe');  
// 2. 将CSS，HTML字符串转换为Blob对象  
var blob = new Blob([htmlCode], {  
  'type': 'text/html'  
});
// 3. 使用URL.createObjectURL()方法将...  
iframe.src = URL.createObjectURL(blob);  
需要注意的是，当我们使用 new Blob() 对我们的字符数据进行转换的时候，一定要指定type为text/html，  
否则，HTML代码会被自动转移为安全的纯文本显示在<iframe>元素中。  

兼容性:  
IE浏览器遗憾并不支持src直接是URL对象。  

所以此技术只适用于对兼容性没有严格要求的一些项目。 

```
function() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'width:600px;max-width:98%;max-height:600px;height:98vh;position:fixed;border:1px solid;outline:9999px solid rgba(0,0,0,.6);top:0;right:0;left:0;bottom:0;margin:auto;overflow:hidden;');
  iframe.src = URL.createObjectURL(new Blob([document.getElementById('codeArea').value],{"type":"text/html"}));
  document.body.appendChild(iframe);
  document.codeIframe=iframe;
}
```



示例代码：

```
<style>
html {
  height: 100vh;
}
body {
  height: inherit;
  background: #2e576b;
  display: -ms-grid;
  display: grid;
}
.container {
  margin: auto;
}
.card {
  position: relative;
  width: 300px; height: 350px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 15px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.card::after {
  content: '';
  display: block;
  width: 100%;  height: 100%;
  background: linear-gradient(to bottom, #0065a8, rgba(221, 238, 255, 0.4) 46%, rgba(255, 255, 255, 0.5));
}
.wave {
  position: absolute;
  top: 3%; left: 50%;
  width: 400px;  height: 400px;
  margin-top: -200px; margin-left: -200px;
  background: #0af;
  border-radius: 40%;
  opacity: .4;
  animation: shift 3s infinite linear;
}
.wave.w2 {
  background: yellow;
  opacity: .1;
  animation: shift 7s infinite linear;
}
.wave.w3 {
  animation: shift 5s infinite linear;
  background: crimson;
  opacity: 0.1;
}
@-webkit-keyframes shift {
  from {
    transform: rotate(360deg);
  }
}
@keyframes shift {
  from {
    transform: rotate(360deg);
  }
}
</style>

<div class="container">
  <div class="card">
    <div class="wave w1"></div>
    <div class="wave w2"></div>
    <div class="wave w3"></div>
  </div>
</div>


```
