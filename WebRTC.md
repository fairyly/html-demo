# WebRTC 通信 网页实时通讯(Web Real Time Communication)

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

