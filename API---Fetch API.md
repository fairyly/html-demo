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

除了返回Promise对象，Fetch API 还有一个特点，就是数据传送是以数据流（stream）的形式进行的。对于大文件，数据是一段一段得到的。
```
response.text().then(function (responseText) {
  console.log(responseText);
}
```
上面代码中，text()就是一个数据流读取器。

Fetch API 提供以下五个数据流读取器。

* text()：返回字符串
* json()：返回JSON对象
* formData()：返回FormData对象
* blob()：返回blob对象
* arrayBuffer()：返回二进制数组ArrayBuffer对象

数据流只能读取一次，一旦读取，数据流就空了。再次读取就不会得到结果。解决方法是在读取之前，先使用.clone()方法，复制一份一模一样的副本。


