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

## 火狐和ie和谷歌浏览器 在new Date().toLocaleString(),返回结果差异：

     火狐：
     new Date().toLocaleString()
     "2017/5/15 下午5:48:01"
     
     ie edge
     "2017年5月15日 17:49:29"
     
     谷歌
    "2017-5-15 17:50:57"
    
    
    
## 开源协议


```
开源许可证GPL、BSD、MIT、Mozilla、Apache和LGPL的区别
首先借用有心人士的一张相当直观清晰的图来划分各种协议：开源许可证GPL、BSD、MIT、Mozilla、Apache和LGPL的区别

以下是上述协议的简单介绍：
BSD开源协议
BSD开源协议是一个给于使用者很大自由的协议。基本上使用者可以”为所欲为”,可以自由的使用，修改源代码，也可以将修改后的代码作为开源或者专有软件再发布。

但”为所欲为”的前提当你发布使用了BSD协议的代码，或则以BSD协议代码为基础做二次开发自己的产品时，需要满足三个条件：

    如果再发布的产品中包含源代码，则在源代码中必须带有原来代码中的BSD协议。
    如果再发布的只是二进制类库/软件，则需要在类库/软件的文档和版权声明中包含原来代码中的BSD协议。
    不可以用开源代码的作者/机构名字和原来产品的名字做市场推广。

BSD 代码鼓励代码共享，但需要尊重代码作者的著作权。BSD由于允许使用者修改和重新发布代码，也允许使用或在BSD代码上开发商业软件发布和销售，因此是对商业集成很友好的协议。而很多的公司企业在选用开源产品的时候都首选BSD协议，因为可以完全控制这些第三方的代码，在必要的时候可以修改或者二次开发。

Apache Licence 2.0
Apache Licence是著名的非盈利开源组织Apache采用的协议。该协议和BSD类似，同样鼓励代码共享和尊重原作者的著作权，同样允许代码修改，再发布（作为开源或商业软件）。需要满足的条件也和BSD类似：

    需要给代码的用户一份Apache Licence
    如果你修改了代码，需要再被修改的文件中说明。
    在延伸的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议，商标，专利声明和其他原来作者规定需要包含的说明。
    如果再发布的产品中包含一个Notice文件，则在Notice文件中需要带有Apache Licence。你可以在Notice中增加自己的许可，但不可以表现为对Apache Licence构成更改。

Apache Licence也是对商业应用友好的许可。使用者也可以在需要的时候修改代码来满足需要并作为开源或商业产品发布/销售。
GPL

我们很熟悉的Linux就是采用了GPL。GPL协议和BSD, Apache Licence等鼓励代码重用的许可很不一样。GPL的出发点是代码的开源/免费使用和引用/修改/衍生代码的开源/免费使用，但不允许修改后和衍生的代码做为闭源的商业软件发布和销售。这也就是为什么我们能用免费的各种linux，包括商业公司的linux和linux上各种各样的由个人，组织，以及商业软件公司开发的免费软件了。

GPL协议的主要内容是只要在一个软件中使用(”使用”指类库引用，修改后的代码或者衍生代码)GPL 协议的产品，则该软件产品必须也采用GPL协议，既必须也是开源和免费。这就是所谓的”传染性”。GPL协议的产品作为一个单独的产品使用没有任何问题，还可以享受免费的优势。

由于GPL严格要求使用了GPL类库的软件产品必须使用GPL协议，对于使用GPL协议的开源代码，商业软件或者对代码有保密要求的部门就不适合集成/采用作为类库和二次开发的基础。

其它细节如再发布的时候需要伴随GPL协议等和BSD/Apache等类似。

LGPL
LGPL是GPL的一个为主要为类库使用设计的开源协议。和GPL要求任何使用/修改/衍生之GPL类库的的软件必须采用GPL协议不同。LGPL 允许商业软件通过类库引用(link)方式使用LGPL类库而不需要开源商业软件的代码。这使得采用LGPL协议的开源代码可以被商业软件作为类库引用并发布和销售。

但是如果修改LGPL协议的代码或者衍生，则所有修改的代码，涉及修改部分的额外代码和衍生的代码都必须采用LGPL协议。因此LGPL协议的开源代码很适合作为第三方类库被商业软件引用，但不适合希望以LGPL协议代码为基础，通过修改和衍生的方式做二次开发的商业软件采用。

GPL/LGPL都保障原作者的知识产权，避免有人利用开源代码复制并开发类似的产品

MIT
MIT是和BSD一样宽范的许可协议,作者只想保留版权,而无任何其他了限制.也就是说,你必须在你的发行版里包含原许可协议的声明,无论你是以二进制发布的还是以源代码发布的.

MPL
MPL是The Mozilla Public License的简写，是1998年初Netscape的 Mozilla小组为其开源软件项目设计的软件许可证。MPL许可证出现的最重要原因就是，Netscape公司认为GPL许可证没有很好地平衡开发者对源代码的需求和他们利用源代码获得的利益。同著名的GPL许可证和BSD许可证相比，MPL在许多权利与义务的约定方面与它们相同（因为都是符合OSIA 认定的开源软件许可证）。但是，相比而言MPL还有以下几个显著的不同之处:

◆ MPL虽然要求对于经MPL许可证发布的源代码的修改也要以MPL许可证的方式再许可出来，以保证其他人可以在MPL的条款下共享源代码。但是，在MPL 许可证中对“发布”的定义是“以源代码方式发布的文件”，这就意味着MPL允许一个企业在自己已有的源代码库上加一个接口，除了接口程序的源代码以MPL 许可证的形式对外许可外，源代码库中的源代码就可以不用MPL许可证的方式强制对外许可。这些，就为借鉴别人的源代码用做自己商业软件开发的行为留了一个豁口。
◆ MPL许可证第三条第7款中允许被许可人将经过MPL许可证获得的源代码同自己其他类型的代码混合得到自己的软件程序。
◆ 对软件专利的态度，MPL许可证不像GPL许可证那样明确表示反对软件专利，但是却明确要求源代码的提供者不能提供已经受专利保护的源代码（除非他本人是专利权人，并书面向公众免费许可这些源代码），也不能在将这些源代码以开放源代码许可证形式许可后再去申请与这些源代码有关的专利。
◆ 对源代码的定义
而在MPL（1.1版本）许可证中，对源代码的定义是:“源代码指的是对作品进行修改最优先择取的形式，它包括:所有模块的所有源程序，加上有关的接口的定义，加上控制可执行作品的安装和编译的‘原本’（原文为‘Script’），或者不是与初始源代码显著不同的源代码就是被源代码贡献者选择的从公共领域可以得到的程序代码。”
◆ MPL许可证第3条有专门的一款是关于对源代码修改进行描述的规定，就是要求所有再发布者都得有一个专门的文件就对源代码程序修改的时间和修改的方式有描述。
```

## 获取指定cookie方法

```
function getCookie(name){
             var strCookie=document.cookie;
             var arrCookie=strCookie.split("; ");
             for(var i=0;i<arrCookie.length;i++){
                   var arr=arrCookie[i].split("=");
                   if(arr[0]==name)return arr[1];
             }
             return "";
}
```


## 浏览器通知

 1.传统做法
 
```
var titleInit = document.title, isShine = true;

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

window.onfocus = function() {
    isShine = false;
};
window.onblur = function() {
    isShine = true;
};

// for IE
document.onfocusin = function() {
    isShine = false;
};
document.onfocusout = function() {
    isShine = true;
};
```

2.使用HTML5 Notification API开启浏览器桌面提醒

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
