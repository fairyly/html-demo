# requestAnimationFrame  实现动画

阮一峰《JavaScript标准教程》:http://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html


* 方法
  - window.requestAnimationFrame(callback): 浏览器用于定时循环操作的一个接口，类似于setTimeout，主要用途是按帧对网页进行重绘。
  - window.cancelAnimationFrame() :取消重绘


```
<div id="anim">点击运行动画</div> 

 window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame || 
          window.oRequestAnimationFrame || 
          window.msRequestAnimationFrame || 
          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
  
  var elem = document.getElementById("anim");

  var startTime = undefined;
 
  function render(time) {
 
    if (time === undefined)
      time = Date.now();
    if (startTime === undefined)
      startTime = time;
 
    elem.style.left = ((time - startTime)/10 % 500) + "px";
 }
 
 elem.onclick = function() {

    (function animloop(){
      render();
      requestAnimFrame(animloop);
    })();

 };
```
