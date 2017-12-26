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

发出 POST 请求的写法如下。

```
fetch('http://www.example.org/submit.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'firstName=Nikhil&favColor=blue&password=easytoguess'
}).then(function(res) {
  if (res.ok) {
    console.log('Perfect! Your settings are saved.');
  } else if (res.status == 401) {
    console.log('Oops! You are not authorized.');
  }
}, function(e) {
  console.log('Error submitting form!');
});
```


### Headers

Fetch API 引入三个新的对象（也是构造函数）：Headers, Request和Response。其中，Headers对象用来构造/读取 HTTP 数据包的头信息。
```
var content = 'Hello World';
var headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'text/plain');
headers.append('Content-Length', content.length.toString());
headers.append('X-Custom-Header', 'ProcessThisImmediately');
```
Headers对象的实例，除了使用append方法添加属性，也可以直接通过构造函数一次性生成。
```
var reqHeaders = new Headers({
  'Content-Type': 'text/plain',
  'Content-Length': content.length.toString(),
  'X-Custom-Header': 'ProcessThisImmediately',
});
```
Headers 对象实例还提供了一些工具方法。
```
reqHeaders.has('Content-Type') // true
reqHeaders.has('Set-Cookie') // false
reqHeaders.set('Content-Type', 'text/html')
reqHeaders.append('X-Custom-Header', 'AnotherValue')

reqHeaders.get('Content-Length') // 11
reqHeaders.getAll('X-Custom-Header') // ["ProcessThisImmediately", "AnotherValue"]

reqHeaders.delete('X-Custom-Header')
reqHeaders.getAll('X-Custom-Header') // []
```
生成 Header 实例以后，可以将它作为第二个参数，传入Request方法。
```
var headers = new Headers();
headers.append('Accept', 'application/json');
var request = new Request(URL, {headers: headers});

fetch(request).then(function(response) {
  console.log(response.headers);
});
```
同样地，Headers 实例可以用来构造 Response 方法。
```
var headers = new Headers({
  'Content-Type': 'application/json',
  'Cache-Control': 'max-age=3600'
});

var response = new Response(
  JSON.stringify({photos: {photo: []}}),
  {'status': 200, headers: headers}
);

response.json().then(function(json) {
  insertPhotos(json);
});
```
上面代码中，构造了一个 HTTP 回应。目前，浏览器构造 HTTP 回应没有太大用处，但是随着 Service Worker 的部署，不久浏览器就可以向 Service Worker 发出 HTTP 回应。


### Request对象
Request对象用来构造 HTTP 请求。
```
var req = new Request('/index.html');
req.method // "GET"
req.url // "http://example.com/index.html"
Request对象的第二个参数，表示配置对象。

var uploadReq = new Request('/uploadImage', {
  method: 'POST',
  headers: {
    'Content-Type': 'image/png',
  },
  body: 'image data'
});
```
上面代码指定Request对象使用 POST 方法发出，并指定 HTTP 头信息和信息体。

下面是另一个例子。
```
var req = new Request(URL, {method: 'GET', cache: 'reload'});
fetch(req).then(function(response) {
  return response.json();
}).then(function(json) {
  someOperator(json);
});
```
上面代码中，指定请求方法为 GET，并且要求浏览器不得缓存 response。

Request对象实例有两个属性是只读的，不能手动设置。一个是referrer属性，表示请求的来源，由浏览器设置，有可能是空字符串。另一个是context属性，表示请求发出的上下文，如果值是image，表示是从<img>标签发出，如果值是worker，表示是从worker脚本发出，如果是fetch，表示是从fetch函数发出的。

Request对象实例的mode属性，用来设置是否跨域，合法的值有以下三种：same-origin、no-cors（默认值）、cors。当设置为same-origin时，只能向同域的 URL 发出请求，否则会报错。
```
var arbitraryUrl = document.getElementById("url-input").value;
fetch(arbitraryUrl, { mode: "same-origin" }).then(function(res) {
  console.log("Response succeeded?", res.ok);
}, function(e) {
  console.log("Please enter a same-origin URL!");
});
```
上面代码中，如果用户输入的URL不是同域的，将会报错，否则就会发出请求。

如果mode属性为no-cors，就与默认的浏览器行为没有不同，类似<script>标签加载外部脚本文件、<img>标签加载外部图片。如果mode属性为cors，就可以向部署了CORS机制的服务器，发出跨域请求。

```
var u = new URLSearchParams();
u.append('method', 'flickr.interestingness.getList');
u.append('api_key', '<insert api key here>');
u.append('format', 'json');
u.append('nojsoncallback', '1');

var apiCall = fetch('https://api.flickr.com/services/rest?' + u);

apiCall.then(function(response) {
  return response.json().then(function(json) {
    // photo is a list of photos.
    return json.photos.photo;
  });
}).then(function(photos) {
  photos.forEach(function(photo) {
    console.log(photo.title);
  });
});
```
上面代码是向 Flickr API 发出图片请求的例子。

Request对象的一个很有用的功能，是在其他Request实例的基础上，生成新的Request实例。

var postReq = new Request(req, {method: 'POST'});

### Response

fetch方法返回Response对象实例，它有以下属性。

status：整数值，表示状态码（比如200）  
statusText：字符串，表示状态信息，默认是“OK”  
ok：布尔值，表示状态码是否在200-299的范围内
headers：Headers对象，表示HTTP回应的头信息  
url：字符串，表示HTTP请求的网址  
type：字符串，合法的值有五个basic、cors、default、error、opaque。basic表示正常的同域请求；cors表示CORS机制的跨域请求；error表示网络出错，无法取得信息，status属性为0，headers属性为空，并且导致fetch函数返回Promise对象被拒绝；opaque表示非 CORS 机制的跨域请求，受到严格限制。  
Response对象还有两个静态方法。  

```
Response.error() 返回一个type属性为error的Response对象实例
Response.redirect(url, status) 返回的Response对象实例会重定向到另一个URL
fetch('https://example.com', init)
.then(function (response) {
// Check that the response is a 200
  if (response.status === 200) {
    alert("Content type: " + response.headers.get('Content-Type'));
  }
});
```
body属性

Request对象和Response对象都有body属性，表示请求的内容。body属性可能是以下的数据类型。
```
ArrayBuffer
ArrayBufferView (Uint8Array等)
Blob/File
string
URLSearchParams
FormData
var form = new FormData(document.getElementById('login-form'));
fetch("/login", {
  method: "POST",
  body: form
})
```
上面代码中，Request对象的body属性为表单数据。

Request对象和Response对象都提供以下方法，用来读取body。
```
arrayBuffer()
blob()
json()
text()
formData()
```
注意，上面这些方法都只能使用一次，第二次使用就会报错，也就是说，body属性只能读取一次。Request对象和Response对象都有bodyUsed属性，返回一个布尔值，表示body是否被读取过。
```
var res = new Response('one time use');
console.log(res.bodyUsed); // false
res.text().then(function(v) {
  console.log(res.bodyUsed); // true
});
console.log(res.bodyUsed); // true

res.text().catch(function(e) {
  console.log('Tried to read already consumed Response');
});
```
上面代码中，第二次通过text方法读取Response对象实例的body时，就会报错。

这是因为body属性是一个stream对象，数据只能单向传送一次。这样的设计是为了允许 JavaScript 处理视频、音频这样的大型文件。

如果希望多次使用body属性，可以使用Response对象和Request对象的clone方法。它必须在body还没有读取前调用，返回一个新的body，也就是说，需要使用几次body，就要调用几次clone方法。
```
addEventListener('fetch', function(evt) {
  var sheep = new Response("Dolly");
  console.log(sheep.bodyUsed); // false
  var clone = sheep.clone();
  console.log(clone.bodyUsed); // false

  clone.text();
  console.log(sheep.bodyUsed); // false
  console.log(clone.bodyUsed); // true

  evt.respondWith(cache.add(sheep.clone()).then(function(e) {
    return sheep;
  });
});
```
reader 的实例
```
const fetchUrl = async function (url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
```
  const chunk1 = await reader.read();


https://www.sitepen.com/blog/2017/10/02/a-guide-to-faster-web-app-io-and-data-operations-with-streams/
