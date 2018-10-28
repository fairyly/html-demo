# Page Visibility API

阮一峰《JavaScript标准教程》:http://javascript.ruanyifeng.com/htmlapi/pagevisibility.html

MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API

通常，我们使用各种事件，判断用户是否正在离开当前页面。
```
visibilityState
pageshow
pagehide
beforeunload
unload
```
但是，手机浏览器往往不会触发这些事件，原因是浏览器进程会被突然关闭或者切换到后台，从而没有机会触发这些事件。常见的场景有以下这些。
```
用户点击了一条系统通知，切换到另一个 App。
用户进入任务切换窗口，切换到另一个 App。
用户点击了 Home 按钮，切换回主屏幕。
操作系统自动切换到另一个 App（比如，收到一个打入的电话）。
```

## document.visibilityState
这个 API 主要在document对象上，新增了一个document.visibilityState属性。该属性返回一个字符串，表示页面当前的可见性状态，共有三个可能的值。

- hidden：页面彻底不可见。
- visible：页面至少一部分可见。
- prerender：页面即将或正在渲染，处于不可见状态。

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

## 参考
- [Page Visibility API 教程](http://www.ruanyifeng.com/blog/2018/10/page_visibility_api.html)
