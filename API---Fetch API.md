# Fetch API

阮一峰介绍： https://github.com/wangdoc/webapi-tutorial/blob/master/docs

* 检查浏览器是否部署了 Fetch API。
```
if ('fetch' in window){
  // 支持
} else {
  // 不支持
}
```

* 用法：

```
fetch(url)
.then(function (response) {
  return response.json();
})
.then(function (jsonData) {
  console.log(jsonData);
})
.catch(function () {
  console.log('出错了');
});
```
