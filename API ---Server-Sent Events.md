# Server-Sent Events

* 阮一峰《JavaScript标准教程》:http://javascript.ruanyifeng.com/htmlapi/eventsource.html
* 阮一峰 GitHub 介绍：https://github.com/wangdoc/webapi-tutorial/blob/master/docs/server-sent-events.md
* MDN: https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events

- 服务器向客户端推送数据，有很多解决方案。除了“轮询” 和 WebSocket，HTML 5 还提供了 Server-Sent Events（以下简称 SSE）。

- SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。

- 总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为 streaming 本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

- SSE 也有自己的优点
  - SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
  - SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
  - SSE 默认支持断线重连，WebSocket 需要自己实现。
  - SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
  - SSE 支持自定义发送的消息类型。

- 1.SSE 的客户端 API 部署在EventSource对象上。下面的代码可以检测浏览器是否支持 SSE。

  ```
    if ('EventSource' in window) {
      // ...
    }
  ```

- 2.使用 SSE 时，浏览器首先生成一个EventSource实例，向服务器发起连接。
  ```
    var source = new EventSource(url);
    上面的url可以与当前网址同域，也可以跨域。
    跨域时，可以指定第二个参数，打开withCredentials属性，表示是否一起发送 Cookie。
    var source = new EventSource(url, { withCredentials: true });
  ```
- 3.EventSource实例的readyState属性，表明连接的当前状态。该属性只读，可以取以下值
  - 0：相当于常量EventSource.CONNECTING，表示连接还未建立，或者断线正在重连。
  - 1：相当于常量EventSource.OPEN，表示连接已经建立，可以接受数据。
  - 2：相当于常量EventSource.CLOSED，表示连接已断，且不会重连。
  ```
    var source = new EventSource(url);
    console.log(source.readyState);
  ```
- 4.EventSource实例的withCredentials属性返回一个布尔值，表示当前实例是否开启 CORS 的withCredentials。该属性只读，默认是false。

- 5.连接一旦建立，就会触发open事件，可以在onopen属性定义回调函数
  ```
    source.onopen = function (event) {
      // ...
    };

    // 另一种写法
    source.addEventListener('open', function (event) {
      // ...
    }, false);
  ```
- 6.客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性定义回调函数
  ```
    source.onmessage = function (event) {
    var data = event.data;
    var origin = event.origin;
    var lastEventId = event.lastEventId;
    // handle message
  };

  // 另一种写法
  source.addEventListener('message', function (event) {
    var data = event.data;
    var origin = event.origin;
    var lastEventId = event.lastEventId;
    // handle message
  }, false);
  
  参数对象event有如下属性:
    data：服务器端传回的数据（文本格式）。
    origin： 服务器 URL 的域名部分，即协议、域名和端口，表示消息的来源。
    lastEventId：数据的编号，由服务器端发送。如果没有编号，这个属性为空。
  ```

- 7.如果发生通信错误（比如连接中断），就会触发error事件，可以在onerror属性定义回调函数

  ```
  source.onerror = function (event) {
    // handle error event
  };

    // 另一种写法
    source.addEventListener('error', function (event) {
      // handle error event
    }, false);
  ```

- 8.自定义事件
  默认情况下，服务器发来的数据，总是触发浏览器EventSource实例的message事件。  
  开发者还可以自定义 SSE 事件，这种情况下，发送回来的数据不会触发message事件。  
  ```
  source.addEventListener('foo', function (event) {
    var data = event.data;
    var origin = event.origin;
    var lastEventId = event.lastEventId;
    // handle message
  }, false);
  ```
  
- 9.close方法用于关闭 SSE 连接。
  ```
    source.close();
  ```


### 服务器实现

- 1.数据格式
  服务器向浏览器发送的 SSE 数据，必须是 UTF-8 编码的文本，具有如下的 HTTP 头信息  
  ```
    Content-Type: text/event-stream
    Cache-Control: no-cache
    Connection: keep-alive
    
    第一行的Content-Type必须指定 MIME 类型为event-steam
    
    每一次发送的信息，由若干个message组成，每个message之间用\n\n分隔。每个message内部由若干行组成，每一行都是如下格式。
    [field]: value\n
    
    上面的field可以取四个值。

    data
    event
    id
    retry
    
    此外，还可以有冒号开头的行，表示注释。通常，服务器每隔一段时间就会向浏览器发送一个注释，保持连接不中断。
    : This is a comment
    
    下面是一个例子。

    : this is a test stream\n\n

    data: some text\n\n

    data: another message\n
    data: with two lines \n\n
  ```
  
- 2. data 字段
  ```
  数据内容用data字段表示
  data:  message\n\n
  ```
  如果数据很长，可以分成多行，最后一行用\n\n结尾，前面行都用\n结尾。
  ```
  下面是一个发送 JSON 数据的例子。

  data: {\n
  data: "foo": "bar",\n
  data: "baz", 555\n
  data: }\n\n
  ```
- 3. id 字段
  数据标识符用id字段表示，相当于每一条数据的编号。
  
  ```
  id: msg1\n
  data: message\n\n
  ```
  
- 4. event 字段
  event字段表示自定义的事件类型，默认是message事件。浏览器可以用addEventListener()监听该事件。
  ```
  event: foo\n
  data: a foo event\n\n

  data: an unnamed event\n\n

  event: bar\n
  data: a bar event\n\n
  上面的代码创造了三条信息。第一条的名字是foo，触发浏览器的foo事件；第二条未取名，表示默认类型，触发浏览器的message事件；
  第三条是bar，触发浏览器的bar事件。
  ```
- 5. retry 字段
  服务器可以用retry字段，指定浏览器重新发起连接的时间间隔。
  ```
  retry: 10000\n
  ```
  
### Node 服务器实例

```
新建一个文件 app.js;

var http = require("http");

http.createServer(function (req, res) {
  var fileName = "." + req.url;

  if (fileName === "./stream") {
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function () {
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function () {
      clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");

运行 node app.js

打开浏览器 访问 http://localhost:8844/stream 就可以看到服务器 向 浏览器发送的数据了
```
