# 微信中 video 播放全屏问题

* http://cnodejs.org/topic/5a55617299d207fa49f5cd85

```
<video id=“byl_video” style=“object-fit:fill”  preload=“auto” playsinline=“true” webkit-playsinline=“true” x-webkit-airplay=“allow” airplay=“allow” x5-video-player-type=“h5” x5-video-player-fullscreen=“true” x5-video-orientation=“portrait” src=""></video>
js：
document.addEventListener(“WeixinJSBridgeReady”, function() {
		video.play();
	}, false);
```
