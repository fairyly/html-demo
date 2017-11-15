# WebRTC 通信 网页实时通讯(Web Real Time Communication)

* Can I use: https://caniuse.com/#search=webrtc
* webRTC 官网： https://webrtc.org/
* demos：https://github.com/webrtc/samples/

实例：使用WebRTC搭建前端视频聊天室——入门篇：https://segmentfault.com/a/1190000000436544

三个接口  
WebRTC实现了三个API，分别是:  
* MediaStream：通过MediaStream的API能够通过设备的摄像头及话筒获得视频、音频的同步流
* RTCPeerConnection：RTCPeerConnection是WebRTC用于构建点对点之间稳定、高效的流传输的组件
* RTCDataChannel：RTCDataChannel使得浏览器之间（点对点）建立一个高吞吐量、低延时的信道，用于传输任意数据

浏览器兼容性  
由于浏览器实现不同，他们经常会在实现标准版本之前，在方法前面加上前缀，所以一个兼容版本就像这样  
```
var getUserMedia = (navigator.getUserMedia || 
                    navigator.webkitGetUserMedia || 
                    navigator.mozGetUserMedia || 
                    navigator.msGetUserMedia);

```

demo：
```
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>GetUserMedia实例</title>
</head>
<body>
    <video id="video" autoplay></video>
</body>
<script type="text/javascript">
    var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    getUserMedia.call(navigator, {//或者使用navigator.getUserMedia({
        video: true,
        audio: true
    }, function(localMediaStream) {
        var video = document.getElementById('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        video.onloadedmetadata = function(e) {
            console.log("Label: " + localMediaStream.label);
            console.log("AudioTracks" , localMediaStream.getAudioTracks());
            console.log("VideoTracks" , localMediaStream.getVideoTracks());
        };
    }, function(e) {
        console.log('Reeeejected!', e);
    });
</script>
</html>

将这段内容保存在一个HTML文件中，放在服务器上。用较新版本的Opera、Firefox、Chrome打开，
在浏览器弹出询问是否允许访问摄像头和话筒，选同意，浏览器上就会出现摄像头所拍摄到的画面了
```

约束对象（Constraints）  
约束对象可以被设置在getUserMedia()和RTCPeerConnection的addStream方法中，这个约束对象是WebRTC用来指定接受什么样的流的，其中可以定义如下属性：  
* video: 是否接受视频流
* audio：是否接受音频流
* MinWidth: 视频流的最小宽度
* MaxWidth：视频流的最大宽度
* MinHeight：视频流的最小高度
* MaxHiehgt：视频流的最大高度
* MinAspectRatio：视频流的最小宽高比
* MaxAspectRatio：视频流的最大宽高比
* MinFramerate：视频流的最小帧速率
* MaxFramerate：视频流的最大帧速率

详情见Resolution Constraints in Web Real Time Communications draft-alvestrand-constraints-resolution-00


RTCPeerConnection

浏览器兼容  
还是前缀不同的问题，采用和上面类似的方法：
```
var PeerConnection = (window.PeerConnection ||
                    window.webkitPeerConnection00 || 
                    window.webkitRTCPeerConnection || 
                    window.mozRTCPeerConnection);
```

创建和使用
```
//使用Google的stun服务器
var iceServer = {
    "iceServers": [{
        "url": "stun:stun.l.google.com:19302"
    }]
};
//兼容浏览器的getUserMedia写法
var getUserMedia = (navigator.getUserMedia ||
                    navigator.webkitGetUserMedia || 
                    navigator.mozGetUserMedia || 
                    navigator.msGetUserMedia);
//兼容浏览器的PeerConnection写法
var PeerConnection = (window.PeerConnection ||
                    window.webkitPeerConnection00 || 
                    window.webkitRTCPeerConnection || 
                    window.mozRTCPeerConnection);
//与后台服务器的WebSocket连接
var socket = __createWebSocketChannel();
//创建PeerConnection实例
var pc = new PeerConnection(iceServer);
//发送ICE候选到其他客户端
pc.onicecandidate = function(event){
    socket.send(JSON.stringify({
        "event": "__ice_candidate",
        "data": {
            "candidate": event.candidate
        }
    }));
};
//如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
pc.onaddstream = function(event){
    someVideoElement.src = URL.createObjectURL(event.stream);
};
//获取本地的媒体流，并绑定到一个video标签上输出，并且发送这个媒体流给其他客户端
getUserMedia.call(navigator, {
    "audio": true,
    "video": true
}, function(stream){
    //发送offer和answer的函数，发送本地session描述
    var sendOfferFn = function(desc){
            pc.setLocalDescription(desc);
            socket.send(JSON.stringify({ 
                "event": "__offer",
                "data": {
                    "sdp": desc
                }
            }));
        },
        sendAnswerFn = function(desc){
            pc.setLocalDescription(desc);
            socket.send(JSON.stringify({ 
                "event": "__answer",
                "data": {
                    "sdp": desc
                }
            }));
        };
    //绑定本地媒体流到video标签用于输出
    myselfVideoElement.src = URL.createObjectURL(stream);
    //向PeerConnection中加入需要发送的流
    pc.addStream(stream);
    //如果是发送方则发送一个offer信令，否则发送一个answer信令
    if(isCaller){
        pc.createOffer(sendOfferFn);
    } else {
        pc.createAnswer(sendAnswerFn);
    }
}, function(error){
    //处理媒体流创建失败错误
});
//处理到来的信令
socket.onmessage = function(event){
    var json = JSON.parse(event.data);
    //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
    if( json.event === "__ice_candidate" ){
        pc.addIceCandidate(new RTCIceCandidate(json.data.candidate));
    } else {
         pc.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
    }
};
```

综合的Demo: https://github.com/LingyuCoder/SkyRTC-demo

视频音频聊天（连接了摄像头和话筒，至少要有摄像头），广播文件（可单独传播，提供API，  
广播就是基于单独传播实现的，可同时传播多个，小文件还好说，大文件坐等内存吃光），广播聊天信息  

使用方式  
下载解压并cd到目录下  
运行npm install安装依赖的库（express, ws, node-uuid）  
运行node server.js，访问localhost:3000，允许摄像头访问  
打开另一台电脑，在浏览器（Chrome和Opera，还未兼容Firefox）打开{server所在IP}:3000，允许摄像头和话筒访问  
广播文件：在左下角选定一个文件，点击“发送文件”按钮  
广播信息：左下角input框输入信息，点击发送  
可能会出错，注意F12对话框，一般F5能解决  
