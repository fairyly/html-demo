# video 或 audio 添加字幕

* track 元素

* webvtt 文件


```
<video controls width="400" height="300">
    <source src="1.ogg" type="video/ogg">
    <track src="web.vtt" srclang="zh" kind="subtitles" label="中文" default>
    <track src="web_en.vtt" srclang="en" kind="subtitles" label="English">
</video>

<track> 标签中的 default :通知浏览器在用户没有选择使用其他字幕时候可以使用这个；
src : 指定字幕文件的存放路径
srclang: 指定字幕文件的语言
kind: 指定字幕文件种类 （subtitles,captions,descriptions,chapters,metadata）

web.vtt 文件内容如下：

WEBVTT
 
00:00:01.000 --> 00:00:10.000
这是文本的第一行，从第1秒显示到第10秒。
 
00:00:15.000 --> 00:00:20.000
这是文本的第二行，

```
