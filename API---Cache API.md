# Cache API

阮一峰写的 Cache API 介绍： https://github.com/ruanyf/jstutorial/blob/gh-pages/webapp/cache.md

MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Cache

* 方法

```
Cache.match(request, options)
```
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
