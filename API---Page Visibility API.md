# Page Visibility API

阮一峰《JavaScript标准教程》:http://javascript.ruanyifeng.com/htmlapi/pagevisibility.html

MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API

使用 Page Visibility API，判断页面是否可见
```
// 页面的 visibility 属性可能返回三种状态
// prerender，visible 和 hidden
let pageVisibility = document.visibilityState;

// 监听 visibility change 事件
document.addEventListener('visibilitychange', function() {
  // 页面变为不可见时触发
  if (document.visibilityState == 'hidden') { ... }

  // 页面变为可见时触发
  if (document.visibilityState == 'visible') { ... }
});

API 部署在document对象上，提供以下两个属性。

document.hidden：返回一个布尔值，表示当前是否被隐藏。
document.visibilityState：表示页面当前的状态，可以取三个值。
visibile：页面可见
hidden：页面不可见
prerender：页面即将或正在渲染，不可见
```

VisibilityChange 事件

```
document.addEventListener('visibilitychange', function () {
  console.log(document.visibilityState);
});
```
