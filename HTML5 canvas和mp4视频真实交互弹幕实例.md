# HTML5 canvas和mp4视频真实交互弹幕实例

* 张鑫旭：http://www.zhangxinxu.com/wordpress/2017/09/html5-canvas-video-barrage/

插件：CanvasBarrage：http://www.zhangxinxu.com/study/201709/canvasBarrage.js

demo:
```

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="description" content="HTML5 canvas和mp4视频真实交互弹幕 » 张鑫旭-鑫空间-鑫生活" />
<meta name="description" content="张鑫旭web前端学习实例页面 HTML5 canvas和mp4视频真实交互弹幕" />
<meta name="keywords" content="html5, canvas, video, 弹幕, 视频" />
<meta name="author" content="张鑫旭, zhangxinxu" />
<title>HTML5 canvas和mp4视频真实交互弹幕 » 张鑫旭-鑫空间-鑫生活</title>
<link rel="stylesheet" href="../css/demo.css">
<link rel="stylesheet" href="../css/hl.css">
<link rel="stylesheet" href="https://qidian.gtimg.com/c/=/lulu/theme/peak/css/common/ui/Button.css,/lulu/theme/peak/css/common/ui/Range.css,/lulu/theme/peak/css/common/ui/Input.css,/lulu/theme/peak/css/common/ui/Tips.css,/lulu/theme/peak/css/common/ui/Radio.css,/lulu/theme/peak/css/common/ui/Color.css">
<style>
.video-x {
	position: relative;
	width: 640px;
	margin: auto;
}
.video-x video {
	background-color: black;
	outline: 1px solid #eee;
}
.canvas-barrage {
	position: absolute;
	width: 640px;
	height: 360px;
	pointer-events: none;
	z-index: 1;
}

input[type="range"] {
	vertical-align: middle;
	margin-right: 50px;
}
.ui-radio + label {
	margin-left: 5px;
	margin-right: 20px;
}
input[type="submit"] {
	margin-left: 10px;
	margin-right: 50px;	
}
[disabled] {
	pointer-events: none;
	opacity: .4;	
}
.last {
	border-top: 1px solid #eee;
	margin-top: 1.5em;
	padding-top: 2em;
}
</style>
</head>

<body>
<div id="header">
	<a href="/" class="logo" title="回到鑫空间-鑫生活首页">
    	<img src="/php/image/zxx_home_logo.png" border="0">
    </a>
</div>
<div id="main">
	<h1>HTML5 canvas和mp4视频真实交互弹幕实例页面</h1>
    <div id="body" class="light">
    	<div id="content" class="show">
        	<h3>展示</h3>
            <div class="article_new"><a href="http://www.zhangxinxu.com/wordpress/?p=6386">回到相关文章 »</a></div>
            <div class="demo">
            	<div class="video-x">
                	<canvas id="canvasBarrage" class="canvas-barrage"></canvas>
                	<video id="videoBarrage" width="640" height="384" src="./video.mp4" controls></video>
                    <form id="barrageForm" action="barrage.php" method="post" autocomplete="off">
                    	<p>透明度(0-100)：<input type="range" class="range" name="opacity" value="100" min="0" max="100"> 文字大小(16-32)：<input type="range" class="range" name="fontSize" value="24" min="16" max="32"></p>
                        <p>弹幕位置：<input type="radio" id="rangeFull" name="range" checked value="0,1"><label class="ui-radio" for="rangeFull"></label><label for="rangeFull">全部位置</label>
                        	<input type="radio" id="rangeTop" name="range" value="0,0.3"><label class="ui-radio" for="rangeTop"></label><label for="rangeTop">顶部</label>
                            <input type="radio" id="rangeBottom" name="range" value="0.7,1"><label class="ui-radio" for="rangeBottom"></label><label for="rangeBottom">底部</label>
                        </p>
                        <p class="last"><input class="ui-input" id="input" name="value" required><input type="submit" class="ui-button ui-button-primary" value="发送弹幕" disabled>
                        颜色：<input type="color" id="color" name="color" value="#ff0000"></p>
                    </form>  
                </div> 
            </div>
            <h3>代码</h3>
            <h5>HTML代码：</h5>
            <pre name="code" class="html">&lt;canvas id="canvasBarrage"&gt;&lt;/canvas&gt;
&lt;video id="videoBarrage" width="640" height="384" src="./video.mp4" controls&gt;&lt;/video&gt;</pre>
            <h5>JS代码：</h5>
            <pre name="code" class="js">
// 弹幕数据
var dataBarrage = [{
    value: 'speed设为0为非滚动',
    time: 1, // 单位秒
    speed: 0
}, {
    value: 'time控制弹幕时间，单位秒',
    color: 'blue',
    time: 2
}, ...];

/*!
** by zhangxinxu(.com)
** 与HTML5 video视频真实交互的弹幕效果
** http://www.zhangxinxu.com/wordpress/?p=6386
** MIT License
** 保留版权申明
*/
var CanvasBarrage = function (canvas, video, options) {
    if (!canvas || !video) {
        return;    
    }
    var defaults = {
        opacity: 100,
        fontSize: 24,
        speed: 2,
        range: [0,1],
        color: 'white',
        data: []
    };
    
    // ... 其它参见页面源代码
}

// 初始化弹幕方法
var eleCanvas = document.getElementById('canvasBarrage');
var eleVideo = document.getElementById('videoBarrage');

var demoBarrage = new CanvasBarrage(eleCanvas, eleVideo, {
    data: dataBarrage
});

// 新增弹幕
/* 
demoBarrage.add({
    value: '弹幕内容',
    time: eleVideo.currentTime
    // 其它如color, fontSize, opacity等可选
});
*/

// 全局设置修改，直接（例如）：
// demoBarrage.opacity = 50;
// 或者字号大小 demoBarrage.fontSize = 16;
</pre>
        </div>       
    </div>
</div>

<script src="./canvasBarrage.js"></script>
<script>
// 弹幕数据
var dataBarrage = [{
	value: 'speed设为0为非滚动',
	time: 1, // 单位秒
	speed: 0
}, {
	value: 'time控制弹幕时间，单位秒',
	color: 'blue',
	time: 2
}, {
	value: '视频共21秒',
	time: 3.2
}, {
	value: '视频背景为白色',
	time: 4.5
}, {
	value: '视频为录制',
	time: 5.0
}, {
	value: '视频内容简单',
	time: 6.3
}, {
	value: '是为了让视频尺寸不至于过大',
	time: 7.8
}, {
	value: '省流量',
	time: 8.5
}, {
	value: '支持弹幕暂停（视频暂停）',
	time: 9
}, {
	value: 'add()方法新增弹幕',
	time: 11
}, {
	value: 'reset()方法重置弹幕',
	time: 11
}, {
	value: '颜色，字号，透明度可全局设置',
	time: 13
}, {
	value: '具体交互细节可参考页面源代码',
	time: 14
}, {
	value: '内容不错哦！',
	time: 18,
	color: 'yellow'
}];

// 初始化弹幕方法
var eleCanvas = document.getElementById('canvasBarrage');
var eleVideo = document.getElementById('videoBarrage');

var demoBarrage = new CanvasBarrage(eleCanvas, eleVideo, {
	data: dataBarrage
});

// 下面是交互处理，与弹幕方法本身无关，旨在演示如何修改全局设置，新增弹幕等
// 1. 全局的弹幕大小，位置和透明度处理
document.addEventListener("DOMContentLoaded", function() {
	$('.range').on('change', function () {
		// 改变弹幕的透明度和字号大小
		demoBarrage[this.name] = this.value * 1;
	});
	
	$('input[name="range"]').on('click', function () {
		// 改变弹幕在视频显示的区域范围
		demoBarrage['range'] = this.value.split(',');
	});
	
	// 发送弹幕
	var elForm = $('#barrageForm'), elInput = $('#input');
	elForm.on('submit', function (event) {
		event.preventDefault();	
		// 新增弹幕
		demoBarrage.add({
			value: $('#input').val(),
			color: $('#color').val(),
			time: eleVideo.currentTime
		});
		
		elInput.val('').trigger('input');
	});
	// 提交按钮
	var elSubmit = elForm.find('input[type="submit"]');
	
	// 输入框和禁用按钮
	elInput.on('input', function () {
		if (this.value.trim()) {
			elSubmit.removeAttr('disabled');
		} else {
			elSubmit.attr('disabled', 'disabled');
		}
	});
	
}, false);
</script>

<script src="https://qidian.gtimg.com/c/=/lulu/theme/peak/js/plugin/jquery.js,/lulu/theme/peak/js/common/ui/Follow.js,/lulu/theme/peak/js/common/ui/Tips.js,/lulu/theme/peak/js/common/ui/Range.js,/lulu/theme/peak/js/common/ui/Drop.js,/lulu/theme/peak/js/common/ui/Color.js"></script>
<script>
$('.range').range();
$('#color').color();
</script>

<!-- 以下脚本是无关紧要 -->
<script type="text/javascript" src="../js/hl_all.js"></script>
<script type="text/javascript">
	DlHighlight.HELPERS.highlightByName("code", "pre");
</script>
<div id="footer">
    Designed &amp; Powerd by <a href="/">zhangxinxu</a><br />
    Copyright© 张鑫旭-鑫空间-鑫生活<br>
    <a href="http://www.miibeian.gov.cn/" target="_blank">鄂ICP备09015569号</a>      
</div>
<div class="bota">
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 728x90, 大型横幅广告 -->
<ins class="adsbygoogle"
     style="display:inline-block;width:728px;height:90px"
     data-ad-client="ca-pub-0090627341039040"
     data-ad-slot="4686885989"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-11205167-1']);
  _gaq.push(['_trackPageview']);

  (function() {
	var ga = document.createElement('script');
	 ga.type = 'text/javascript';
	 ga.async = true;
	ga.src = 'http://www.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</div>
</body>
</html>

```
