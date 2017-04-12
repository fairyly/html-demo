# webpagemodule
一些模板页面和效果

* [蓝色通用企业首页模板](https://fairyly.github.io/html-demo/蓝色通用企业首页模板/index.html) (IE9+，chrome,FF等)
* [列表信息滚动](https://fairyly.github.io/html-demo/列表信息滚动/demo.html)
* [js图片裁剪效果](https://fairyly.github.io/html-demo/JavaScriptImageClip/demo.html)
* [响应式两栏资讯博客主题页面](https://fairyly.github.io/html-demo/autoblog/demo.html) (IE9+，chrome,FF等)
* [登陆界面](https://fairyly.github.io/html-demo/login/demo.html)(IE9+，chrome,FF等)
* 一些CSS3效果(ie10+/chrome等)：
      * [CSS3实现的导航](https://fairyly.github.io/html-demo/css3_effects/nav/nav.html)
      * [CSS3 Tips效果](https://fairyly.github.io/html-demo/css3_effects/button/demo.html)
      * [CSS3 3D效果](https://fairyly.github.io/html-demo/css3_effects/css3d-fz/demo.html)   
      * [CSS3 翻转](https://fairyly.github.io/html-demo/css3_effects/css3d-fz/fz.html)
      * [CSS3 按钮效果](https://fairyly.github.io/html-demo/css3_effects/button2/demo.html)
      * [CSS3 照片墙](https://fairyly.github.io/html-demo/css3_effects/photowall/demo.html)
      * [](https://fairyly.github.io/css3_effects/nav-slide/nav-slide.html/CSS3侧滑导航)
      * [按钮波纹](https://fairyly.github.io/html-demo/按钮波纹/demo.html)
      * [canvas effect](https://fairyly.github.io/html-demo/testcavas.html)
      * [用户中心](https://fairyly.github.io/html-demo/show4/user_center.html)
      
      * [form验证](https://fairyly.github.io/html-demo/formvalidate)
     
* [地址选择](https://fairyly.github.io/html-demo/address/index.html)

- [x] [地址选择](https://fairyly.github.io/html-demo/address/index.html)

* [多文件上传](https://fairyly.github.io/html-demo/multupload/index.html)  
     (使用jquery.jquery.fileupload.js)本地环境测试图片的url存在了但是出现500错误
     ```
          <!DOCTYPE HTML>
          <html>
          <head>
          <meta charset="utf-8">
          <title>jQuery File Upload Example</title>
          </head>
          <body>
          <input id="fileupload" type="file" name="files[]" data-url="php/" multiple>
          <script src="js/jquery-2.2.3.min.js"></script>
          <script src="js/jquery.ui.widget.js"></script>
          <script src="js/jquery.iframe-transport.js"></script>
          <script src="js/jquery.fileupload.js"></script>
          <script>
          $(function () {
              $('#fileupload').fileupload({
                  dataType: 'json',
                  done: function (e, data) {
                    console.log(data);
                      $.each(data.result.files, function (index, file) {
                          $('<p/>').text(file.name).appendTo(document.body);
                          console.log(file.url)
                          $('<img src='+file.url+'/>').text(file.name).appendTo(document.body);
                      });
                  }
              });
          });
          </script>
          </body> 
          </html>
 ```
 
 ---
 
```
我们在做移动web应用的时候，常常习惯于使用position:fixed把一个input框作为提问或者搜索框固定在页面底部。但在IOS的safari和webview中，对position:fixed的支持不是很好（在IOS5之前甚至还不支持position:fixed）。我遇到的其中一个问题就是，在iOS6+环境下，input focus弹出输入法的时候，设置了position fixed的input框浮在页面上了，而不是吸附在软键盘上。效果如图（图片来源于网上）：


而Android则完全没这个问题，唉。那么我们只能针对IOS作兼容处理了。网上搜索了一通都没能找到比较适合的解决方案（不打算用iScroll），无奈只得自己想办法解决。琢磨良久后想到个折衷的办法：用position:absolute以及通过js动态移动输入框的位置来模拟position:fixed的效果，同时给window对象绑定一个滚动事件，让input框往下移动的时候，能时刻紧贴着软键盘。

于是问题来了，这个移动的位置应该是多少呢？

对图片作像素级分析+debug得知，输入框是被居中了。也就是说，输入框到窗口顶部的距离等于它到软键盘顶部的距离。不难算出，这个距离为 $('input').offset().top - $(window).scrollTop()。于是后面的问题就迎刃而解了。需要说明的是，兼容后的效果肯定比不上原生的position:fixed，但相比浮在页面来说还是要好不少吧。

基于zepto的主要代码实现如下：
$('input').focus(function(){
        var _this = this;

        //无键盘时输入框到浏览器窗口顶部距离
        var noInputViewHeight = $(window).height() - $(_this).height();

        //网页正文内容高度
        var contentHeight = $(document).height() - $(_this).height();

        //控制正文内容高度大于一屏，保证输入框固定底部
        contentHeight = contentHeight > noInputViewHeight ? contentHeight : noInputViewHeight;

        //因为弹出输入法需要时间，需延时处理
        setTimeout(function(){

                //弹出输入法时滚动条的起始滚动距离
                var startScrollY = $(window).scrollTop();

                //弹出输入法时输入框到窗口顶部的距离，即到软键盘顶部的起始距离
                var inputTopHeight = $(_this).offset().top - startScrollY;

                //弹出输入法时输入框预期位置，即紧贴软键盘时的位置。因输入框此时处于居中状态，所以其到窗口顶部距离即为需往下移动的距离。
                var inputTopPos = $(_this).offset().top + inputTopHeight;

                //控制div不超出正文范围
                inputTopPos = inputTopPos > contentHeight ? contentHeight : inputTopPos;

                //设置输入框位置使其紧贴输入框
                $(_this).css({'position':'absolute', 'top':inputTopPos });

                //给窗口对象绑定滚动事件，保证页面滚动时div能吸附软键盘
                $(window).bind('scroll', function(){

                        //表示此时有软键盘存在，输入框浮在页面上了
                        if (inputTopHeight != noInputViewHeight) {

                                //页面滑动后，输入框需跟随移动的距离
                                var offset = $(this).scrollTop() - startScrollY;

                                //输入框移动后位置
                                afterScrollTopPos = inputTopPos + offset;

                                //设置输入框位置使其紧贴输入框
                                $(_this).css({'position':'absolute', 'top':afterScrollTopPos });
                        }
                });
        }, 100);
}).blur(function(){//输入框失焦后还原初始状态
        $(".div-input").removeAttr('style');
        $(window).unbind('scroll');
});

```
注: 以上代码在IOS6&7 safari中测试通过，IOS5及之前的版本没做测试。Android因为完美支持position:fixed则无需考虑此兼容方法。

## 对象，数组 字符串转换

```
1:　对象转化为数组：
 
　　var arr = [ ];  
 　　for ( var i in data ){  
         　　 var str = i + “=“ + data[ i ]// i 就代表 data 里面的 user pass 等等 而data[ i ] 就代表 userName    12121 就是 i 所对应的值；
          　　arr.push( str );  
　　}
　　这样就会得到 arr  =  [ user = userName, pass = 12121 ];  
　　
　2:数组转化为字符串:  
　　
　　两种方法：  
　　　　1：arr.join( “&”)//意思是用&f符代替“ ， ”然后把数组变成字符串连接；  
               这时候 arr 里面的内容就是 user = tangcaiye&pass = 12121
　　　　2： 比如：  
　　　　　　var arr = [1,2];  
　　　　　　var str = JSON.stringify(arr);//这样也能转化为字符串但现在还是数组的形式不过类型已经是字符串了；  
　　　　　　var arr2 = JSON.parse(str);//这样就是把字符串解析 其实就是把外面的中括号去掉；  
 
　　　　前后台交互的：  
　　　　后台接收的时候只能接收字符串类型的；  
　　　　如果前台要传递一个数组就必须先把数组进行stringify( )的操作再进行传递；  
　　　　而后台返回给前台的也是字符串简称json串；这时需要解析一下就需要 JSON.parse( );操作完了再用；  
 
　3：字符串转化为数组：  
　　
　　例如：  
　　有个这样的 ： url = “login.php?user=“+user.value+”&pass=“+pass.value;  
 
　　那我想要得到login.php就是这样写：var urlArr = url.split(“?”);  
 
　　上面那个意思就是以？为分割点把这个字符串劈开变成一个数组的两部分；  
 
　　那么 aa = urlArr[0];此时 aa 就等于 login.php;  
　　bb = urlArr[1];此时bb 就等于 后面那一坨  
```
