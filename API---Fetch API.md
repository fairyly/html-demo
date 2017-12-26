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
```
var url = 'LargeFile.txt';
var progress = 0;
var contentLength = 0;

fetch(url).then(function (response) {
  // 本次请求总的数据长度
  contentLength = response.headers.get('Content-Length');
  var getStream = function (reader) {
    // ...
  };
  return getStream(response.body.getReader());
})
.catch(function (error) {
  console.log(error);
});
```
上面代码中，response.body.getReader()返回的就是数据流之中的一段。处理数据流的getStream函数代码如下。
```
var progress = 0;
var contentLength = 0;

var getStream = function (reader) {
  return reader.read().then(function (result) {
    // 如果数据已经读取完毕，直接返回
    if (result.done) {
      return;
    }

    // 取出本段数据（二进制格式）
    var chunk = result.value;

    var text = '';
    // 假定数据是UTF-8编码，前三字节是数据头，
    // 而且每个字符占据一个字节（即都为英文字符）
    for (var i = 3; i < chunk.byteLength; i++) {
      text += String.fromCharCode(chunk[i]);
    }

    // 将本段数据追加到网页之中
    document.getElementById('content').innerHTML += text;

    // 计算当前进度
    progress += chunk.byteLength;
    console.log(((progress / contentLength) * 100) + '%');

    // 递归处理下一段数据
    return getStream(reader);
  };
};
```
上面这样的数据流处理，可以提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。传统的XMLHTTPRequest对象不支持数据流，所有的数据必须放在缓存里，等到全部拿到后，再一次性吐出来。

fetch方法的第一个参数可以是 URL 字符串，也可以是后文要讲到的Request对象实例。Fetch方法返回一个Promise对象，并将一个response对象传给回调函数。

response对象有一个ok属性，如果返回的状态码在200到299之间（即请求成功），这个属性为true，否则为false。因此，判断请求是否成功的代码可以写成下面这样。
```
fetch('./api/some.json').then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  } else {
    console.log('请求失败，状态码为', response.status);
  }
}, function(err) {
  console.log('出错：', err);
});
```
response对象除了json方法，还包含了服务器 HTTP 回应的元数据。
```
fetch('users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'));
  console.log(response.headers.get('Date'));
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.type);
  console.log(response.url);
});
```
上面代码中，response对象有很多属性，其中的response.type属性比较特别，表示HTTP回应的类型，它有以下三个值。
```
basic：正常的同域请求
cors：CORS 机制下的跨域请求
opaque：非 CORS 机制下的跨域请求，这时无法读取返回的数据，也无法判断是否请求成功
如果需要在 CORS 机制下发出跨域请求，需要指明状态。

fetch('http://some-site.com/cors-enabled/some.json', {mode: 'cors'})
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    console.log('Request successful', text);
  })
  .catch(function(error) {
    log('Request failed', error)
  });
```
除了指定模式，fetch 方法的第二个参数还可以用来配置其他值，比如指定 cookie 连同 HTTP 请求一起发出。
```
fetch(url, {
  credentials: 'include'
})
```
