# JSONP 跨域请求

利用 script 标签请求

```
 function addScript(url) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    addScript("https://api.flick.com?method=flicker.photos.search&format=json&callback=handle")
    function handle(obj) {
        var data = obj;
    }
```
