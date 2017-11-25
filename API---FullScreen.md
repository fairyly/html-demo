# FullScreen  API  全屏显示 API

阮一峰《JavaScript标准教程》：http://javascript.ruanyifeng.com/htmlapi/fullscreen.html

<ul class="reference-list">
  <li>David Walsh, <a href="http://davidwalsh.name/fullscreen">Fullscreen API</a></li>
  <li>David Storey, <a href="http://generatedcontent.org/post/70347573294/is-your-fullscreen-api-code-up-to-date-find-out-how-to">Is your Fullscreen API code up to date? Find out how to make it work the same in modern browsers</a></li>
</ul>

和鼠标锁定 API 类似

```
// 请求全屏，各个浏览器需要加前缀
var docElm = document.documentElement;
//W3C
if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
}
//FireFox
else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
}
//Chrome等
else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
}
//IE11
else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
}
```

```
// 退出全屏
if (document.exitFullscreen) {
    document.exitFullscreen();
}
else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
}
else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
}
else if (document.msExitFullscreen) {
    document.msExitFullscreen();
}
```

```
// 监听全屏状态改变
document.addEventListener("fullscreenchange", function () {
fullscreenState.innerHTML = (document.fullscreen)? "" : "not ";}, false);
 
document.addEventListener("mozfullscreenchange", function () {
fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";}, false);
 
document.addEventListener("webkitfullscreenchange", function () {
fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";}, false);
 
document.addEventListener("msfullscreenchange", function () {
fullscreenState.innerHTML = (document.msFullscreenElement)? "" : "not ";}, false);
```

```
// 全屏样式设置 ：
html:-moz-full-screen {
    background: red;
}
 
html:-webkit-full-screen {
    background: red;
}
  
html:fullscreen {
    background: red;
}
```
