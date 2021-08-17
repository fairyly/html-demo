# beacon api

>主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向web服务器发送数据。

1.新建页面

```
  <a href="http://www.baidu.com">ererrrrrr</a>
  <script>
    window.addEventListener('unload', logData, false);

    function logData() {
        navigator.sendBeacon("http://localhost:1337", "页面跳转向服务器发送的数据");
    }
</script>

```

2. node 服务：

```
保存为 server.js
var http = require('http');  
var fs = require('fs');

http.createServer(function (request, response) {  
  
    // 发送 HTTP 头部   
    // HTTP 状态值: 200 : OK  
    // 内容类型: text/plain  
    response.writeHead(200, {'Content-Type': 'text/plain'});  
  
    // 发送响应数据 "Hello World"  
     
    if (request.url !== "/favicon.ico") {
        request.on("data",function(data){
            console.log("服务器接受数据："+data);
        })
    }
    response.end('Hello World\n'); 
}).listen(1337);  
  
// 终端打印如下信息  
console.log('Server running at http://127.0.0.1:1337/');
```
在 server.js 目录打开命令窗口 node server.js

在页面跳转时候会受到发送的数据


## 参考
- [sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

