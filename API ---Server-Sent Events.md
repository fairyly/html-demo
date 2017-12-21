# Server-Sent Events

* 阮一峰《JavaScript标准教程》:http://javascript.ruanyifeng.com/htmlapi/eventsource.html
* 阮一峰 GitHub 介绍：https://github.com/wangdoc/webapi-tutorial/blob/master/docs/server-sent-events.md

- 服务器向客户端推送数据，有很多解决方案。除了“轮询” 和 WebSocket，HTML 5 还提供了 Server-Sent Events（以下简称 SSE）。

- SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。

- 总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为 streaming 本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

- SSE 也有自己的优点
  - SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
  - SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
  - SSE 默认支持断线重连，WebSocket 需要自己实现。
  - SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
  - SSE 支持自定义发送的消息类型。

- SSE 的客户端 API 部署在EventSource对象上。下面的代码可以检测浏览器是否支持 SSE。
  ```
  if ('EventSource' in window) {
    // ...
  }
  ```

- 使用 SSE 时，浏览器首先生成一个EventSource实例，向服务器发起连接。
  ```
    var source = new EventSource(url);
    上面的url可以与当前网址同域，也可以跨域。
    跨域时，可以指定第二个参数，打开withCredentials属性，表示是否一起发送 Cookie。
    var source = new EventSource(url, { withCredentials: true });
  ```
- EventSource实例的readyState属性，表明连接的当前状态。该属性只读，可以取以下值
  - 0：相当于常量EventSource.CONNECTING，表示连接还未建立，或者断线正在重连。
  - 1：相当于常量EventSource.OPEN，表示连接已经建立，可以接受数据。
  - 2：相当于常量EventSource.CLOSED，表示连接已断，且不会重连。
  ```
    var source = new EventSource(url);
    console.log(source.readyState);
  ```
- EventSource实例的withCredentials属性返回一个布尔值，表示当前实例是否开启 CORS 的withCredentials。该属性只读，默认是false。

- 连接一旦建立，就会触发open事件，可以在onopen属性定义回调函数
  ```
    source.onopen = function (event) {
      // ...
    };

    // 另一种写法
    source.addEventListener('open', function (event) {
      // ...
    }, false);
  ```
- 客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性定义回调函数
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

- 如果发生通信错误（比如连接中断），就会触发error事件，可以在onerror属性定义回调函数

  ```
  source.onerror = function (event) {
    // handle error event
  };

    // 另一种写法
    source.addEventListener('error', function (event) {
      // handle error event
    }, false);
  ```

- 自定义事件
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
  
- close方法用于关闭 SSE 连接。
  ```
    source.close();
  ```
