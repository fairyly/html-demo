# 位置定位


* http://lbs.qq.com/index.html  注册登录，创建秘钥

```
<!DOCTYPE html>
<html>
<head >
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <title>close-test</title>
    <style type="text/css">
   
    p.capitalize{
        text-transform:capitalize 
    }
    </style>

</head>
<body>
<p class="capitalize"></p>
<script type="text/javascript" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
<iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
    src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=web">
</iframe> 

<script src="js/jquery-3.2.0.min.js"></script>
<script>
window.addEventListener('message', function(event) {
    // 接收位置信息
    var loc = event.data; 
    console.log('location', loc);  
    $('.capitalize').html(loc.city+loc.district+loc.addr);                         
}, false);

</script>
</body>
</html>

```
