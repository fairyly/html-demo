## video

MDN VIDEO : [ MDN VIDEO ](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML5_audio_and_video)

Videojs : [https://github.com/videojs/video.js](https://github.com/videojs/video.js)

Videojs-hls : [https://github.com/videojs/videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)

http://videojs.com/advanced/


* 隐藏下载按钮,最好先设置下浏览器

在Chrome的控制台打开Show user agent shadow DOM查看Chrome隐藏的代码：

打开Chrome控制台（F12）->Settings(F1) -> Preferences -> Elements -> Show user agent shadow DOM

勾上Show user agent shadow DOM。

```
video::-internal-media-controls-download-button {
    display:none;
}

video::-webkit-media-controls-enclosure {
    overflow:hidden;
}

video::-webkit-media-controls-panel {
    width: calc(100% + 30px); /* Adjust as needed */
}


<video muted duration preload controls oncontextmenu="return false;" controlsList="fullscreen nodownload">

```
