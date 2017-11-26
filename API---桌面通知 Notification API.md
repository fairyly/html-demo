# 桌面通知 Notification API

张鑫旭博客文章：http://www.zhangxinxu.com/wordpress/2016/07/know-html5-web-notification/


方法：
* 1. Notification.requestPermission():就是让浏览器出现是否允许通知的提示,相当于是请求授权
  - Notification.requestPermission().then(function(permission) { ... });最近规范上更新的基于promise的语法
  ```
    其中granted表示用户允许通知，denied表示用户嫌弃你，default表示用户目前还没有管你。

    Notification.requestPermission().then(function(result) {
      // result可能是是granted, denied, 或default.
    });
  ```
* 2. Notification.permission[只读] ：表示是否允许通知，值就是上面的granted, denied, 或default.
* 3. new Notification(title, options)：通过new构造，显示通知。其中title是必须参数，表示通知小框框的标题内容，options是可选参数
* 4. Notification.close()：关闭通知
* 5. 事件句柄
  - Notification.onclick：点击通知，然后
  - Notification.onerror：通知显示异常
  - Notification.onclose：通知关闭了
  - Notification.onshow： 通知显示的时候
  

```
window.addEventListener("load", function(){
    if(Notification && Notification.permission !== "granted"){
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                Notification.permission = status;
            }
        });
    }
    var button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", function(){
        var t = new Date().toLocaleString();
        var options={
            dir: "ltr",
            lang: "utf-8",
            icon: "http://ihuster.com/static/avatar/m_default.png",
            body: "你好呀，欢迎留言交流呀"
        };
        if(Notification && Notification.permission === "granted"){
            var n = new Notification("HUSTecho: "+ t, options);    
            n.onshow = function(){
                console.log("You got me!");
            };
            n.onclick = function() {
                alert("You clicked me!");
                window.location = "/";
            };
            n.onclose = function(){
                console.log("notification closed!");
            };        
            n.onerror = function() {
                console.log("An error accured");
            }            
        }else if(Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function(status){
                if(Notification.permission !== status){
                    Notification.permission = status;
                }

                if(status === "granted"){
                    for(var i = 0; i < 3; i++){
                        var n = new Notification("Hi! " + i, {
                            tag: "Beyoung",
                            icon: "http://ihuster.com/static/avatar/b_default.png",
                            body: "你好呀，我是第" + i +"条消息啦！"
                        });
                    }
                }
            });
        }else{
            alert("Hi!");
        }
    });
});
```


* 传统的通知

  - 是通过闪烁页面的标题内容来实现，实现原理其实很简单，就是定时器不断修改document.title的值。
  - 浏览器窗体获得焦点和失去焦点，Chrome和FireFox浏览器是window的onfocus, onblur方法；而IE浏览器则是document的onfocusin, onfocusout方法
    ```
      window.onfocus = function() { };
      window.onblur = function() { };

      // for IE
      document.onfocusin = function() { };
      document.onfocusout = function() { };
    ```

```
setInterval(function() {
    var title = document.title;
    if (isShine == true) {
        if (/新/.test(title) == false) {
            document.title = '【你有新消息】';    
        } else {
            document.title = '【　　　　　】';
        }
    } else {
        document.title = titleInit;
    }
}, 500);
```
