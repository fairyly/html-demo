# Cache API

阮一峰写的 Cache API 介绍： https://github.com/ruanyf/jstutorial/blob/gh-pages/webapp/cache.md

MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Cache

* 方法

1.检查浏览器是否支持这个API。
```
if('caches' in window) {
  // Has support!
}
```
2.下面代码打开一个指定名称的 Cache。
```
caches.open('test-cache').then(function(cache) {
  // Cache is created and accessible
});
```
caches.open方法返回一个Promise对象。当这个Promise对象resolve的时候，会返回新生成或已存在的Cache对象

3.add和addAll方法用于向缓存对象添加文件，它们的参数是一个URL。
```
caches.open('test-cache').then(function(cache) {
  cache.addAll(['/', '/images/logo.png'])
    .then(function() {
      // Cached!
    });
});
```
cache.addAll方法接受一个代表URL的数组作为参数，cache.add方法则是接受单个URL作为参数。
```
caches.open('test-cache').then(function(cache) {
  cache.add('/page/1');  // "/page/1" URL will be fetched and cached!
});
```
这两个方法也可以接受Request对象作为参数。
```
caches.open('test-cache').then(function(cache) {
  cache.add(new Request('/page/1', { /* request options */ }));
});
```
4.cache.put方法用于将URL和对应的Response对象放入Cache对象。
```
fetch('/page/1').then(function(response) {
  return caches.open('test-cache').then(function(cache) {
    return cache.put('/page/1', response);
  });
});
```
5.cache.keys方法可以遍历Cache对象里面的request请求。
```
caches.open('test-cache').then(function(cache) { 
  cache.keys().then(function(cachedRequests) { 
    console.log(cachedRequests); // [Request, Request]
  });
});
```


6.Cache.match(request, options)

返回一个 `Promise`对象，`resolve`的结果是跟` Cache `对象匹配的第一个已经缓存的请求。
```
Cache.matchAll(request, options)
```
返回一个Promise 对象，resolve的结果是跟Cache对象匹配的所有请求组成的数组。
```
Cache.add(request)
```
抓取这个URL, 检索并把返回的response对象添加到给定的Cache对象.这在功能上等同于调用 fetch(), 然后使用 Cache.put() 将response添加到cache中.
```
Cache.addAll(requests)
```
抓取一个URL数组，检索并把返回的response对象添加到给定的Cache对象。
```
Cache.put(request, response)
```
同时抓取一个请求及其响应，并将其添加到给定的cache。
```
Cache.delete(request, options)
```
搜索key值为request的Cache 条目。如果找到，则删除该Cache 条目，并且返回一个resolve为true的Promise对象；如果未找到，则返回一个resolve为false的Promise对象。
```
Cache.keys(request, options)
```
返回一个Promise对象，resolve的结果是Cache对象key值组成的数组。
