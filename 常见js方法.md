# 常见js方法

```

          _____                    _____                    _____                    _____          
         /\    \                  /\    \                  /\    \                  /\    \         
        /::\____\                /::\    \                /::\    \                /::\    \        
       /:::/    /                \:::\    \              /::::\    \              /::::\    \       
      /:::/    /                  \:::\    \            /::::::\    \            /::::::\    \      
     /:::/    /                    \:::\    \          /:::/\:::\    \          /:::/\:::\    \     
    /:::/____/                      \:::\    \        /:::/__\:::\    \        /:::/__\:::\    \    
   /::::\    \                      /::::\    \      /::::\   \:::\    \      /::::\   \:::\    \   
  /::::::\    \   _____    ____    /::::::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \  
 /:::/\:::\    \ /\    \  /\   \  /:::/\:::\    \  /:::/\:::\   \:::\____\  /:::/\:::\   \:::\    \ 
/:::/  \:::\    /::\____\/::\   \/:::/  \:::\____\/:::/  \:::\   \:::|    |/:::/__\:::\   \:::\____\
\::/    \:::\  /:::/    /\:::\  /:::/    \::/    /\::/   |::::\  /:::|____|\:::\   \:::\   \::/    /
 \/____/ \:::\/:::/    /  \:::\/:::/    / \/____/  \/____|:::::\/:::/    /  \:::\   \:::\   \/____/ 
          \::::::/    /    \::::::/    /                 |:::::::::/    /    \:::\   \:::\    \     
           \::::/    /      \::::/____/                  |::|\::::/    /      \:::\   \:::\____\    
           /:::/    /        \:::\    \                  |::| \::/____/        \:::\   \::/    /    
          /:::/    /          \:::\    \                 |::|  ~|               \:::\   \/____/     
         /:::/    /            \:::\    \                |::|   |                \:::\    \         
        /:::/    /              \:::\____\               \::|   |                 \:::\____\        
        \::/    /                \::/    /                \:|   |                  \::/    /        
         \/____/                  \/____/                  \|___|                   \/____/       
	 
```
# 标题

```
// 时间戳转换
function timeStamp2String (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "年" + month + "月" + date +"日 "+ hour +":"+ minute +":"+ second;
};
function timeFormat (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "." + month + "." + date +" "+ hour +":"+ minute +":"+ second;
};
function timeFormattwo (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return month + "." + date +" "+ hour +":"+ minute +":"+ second;
};
function dateFormat (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date +" "+ hour +":"+ minute +":"+ second;
};

function time2date(time){
    var unixTimestamp = new Date(time * 1000);
    var commonTime = unixTimestamp.toLocaleString();
    return commonTime;//返回 格式："2020-7-21 11:54:38"
}

//秒转时分秒
function formatSeconds(value){
    if (!value) {return;}
    var h = Math.floor(value/3600);
    if (h < 10) {
          h = '0' + h;
        }
    var m = Math.floor((value-h*3600)/60);
    if (m < 10) {
          m = '0' + m;
        }
    var s = Math.floor((value-h*3600)%60);
    if (s < 10) {
          s = '0' + s;
        }
    return h + ':' + m + ':' + s;
}

//日期时间格式转换
function toLocalDate(d){
    var datetime = d;
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date +" "+ hour +":"+ minute +":"+ second;
}

//对象转换成json数组
function transform(obj){
    var arr = [];
    var label;
    var value;
    for(var item in obj){
        arr.push({label:obj[item],value:item});
    }
    return arr;
};

//对象键名转换成数组
function transformobj(obj){
    var arr = [];
    var label;
    var value;
    for(var item in obj){
        arr.push(item);
    }
    return arr;
};

function transformarr(arr){
    var obj = {};
    var label;
    var value;
    for(var i = 0; i < arr.length; i++){
        obj[i] = arr[i];
        arr.push({label:i,value:obj[i]});
    }
    return arr;
};

//数组中删除指定元素
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
    }
  }
}

//对象克隆
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

//新警报桌面通知提示
function desktip(){
    if(Notification && Notification.permission !== "granted"){
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                Notification.permission = status;
            }
        });
    }
    var t = new Date().toLocaleString();
    var options={
        dir: "ltr",
        lang: "utf-8",
        icon: "http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg",
        body: "新警报",
        title:"CMS管理系统",
        tag:"CMS管理系统",
        vibrate:100,//震动
        data:'http://10.10.10.229:9096/s4.17/home.html#/notice',
        renotify:true,//替换
        //silent:true//有声音
    };
    if(Notification && Notification.permission === "granted"){
        var n = new Notification("Hi: "+ t, options);    
        n.onshow = function(){
            console.log("You got me!");
        };
        n.onclick = function() {
            console.log("You clicked me!");
            alert("有新警报了");
            n.close();
        };
        n.onclose = function(){
            console.log("notification closed!");
            var a = window.location.href;
            console.log(a);
            window.location.replace(a);
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
                        icon: "http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg",
                        body: "你好呀，我是第" + i +"条消息啦！"
                    });
                }
            }
        });
    }else{
        console.log("Hi!");
    }
}


```
---

# 常见的算法问题：
```
1、判断一个单词是不是回文；

  var test="manam";
  test.split('');//字符串转成数组
  test.split('').reverse();//数组反序排列
  test.split('').reverse().join('');//数组转化字符串
  
2、去掉数组中重复的值；

  第一种方法：比较浪费资源和时间
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  for(var i=0;i<a.length;i++){
    if(arr.indexof(a[i])==-1){//判断arr中元素是否存在;
    //arr.indexof(a[i])就是返回a[i]对应元素第一次出现在arr中的位置
      arr.push(a[i]);
    }
  }
  
  第二种方法：
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  var hash={};
  for(var i=0;i<a.length;i++){
    if(!hash[a[i]]){//判断键值是不是存在
      hash[a[i]]=true;
      arr.push(a[i]);
    }
  }
  
  第三种很简单的方法（ES6中Set）
   var a=[1,55,66,1,22,66,55,88];
   var ar=[...new Set(a)];
   ar//就是去掉重复的值后的数组
3、一个字符串中出现最多的字母；
  学会向对象中加入键名和键值简称加入键值对；

  var str='asssaagggggggggddddddd';
  var obj={};
  for(var i=0,l=str.length,k;i<l;i++){//先统计各个字母出现的次数
    k=str.charAt(i);//返回字符串给定位置的字符
    if(obj[k]){
      obj[k]++;
    }else{
      obj[k]=1;
    }
  }
  //再比较obj中键值最大的
  var m=0;
  var i=null;
  for(var k in obj){
    if(obj[k]>m){
      m=obj[k];//键值
      i=k;//键名
    }
  }
  console.log(i+','+m)
  
4、冒泡排序

  var arr=[55,88,12,36,1];
  for(var i=0;i<arr.length-1;i++)
  {
    for(var j=i+1;j<arr.length;j++){
      if(arr[i]>arr[j]){//从arr[0]开始比较大小
        var tem=arr[i];
        arr[i]=arr[j];
        arr[j]=tem
      }
    }
  }

5、 不借助临时变量，进行两个整数的交换

  var a=6;var b=8;
  b=b-a;
  a=a+b;
  b=a-b;
  
6、生成斐波那契数组的方法(前面两个数的和等于第三个数如：1,2,3,5,8,13,21,34)

  var n=9;//数列长度
  var fibarr = [];//数列数组
  var i = 0;
  while(i<n) {
    if(i<=1) {
      fibarr.push(i);
    }else{
      fibarr.push(fibarr[i-1] + fibarr[i-2])
    }
    i++;
  }
```
 ---

# js 正则验证


```
//IP验证
function iptest(ip){
    var pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (pattern.test(ip) == false) {
        alert('请输入IP地址');
    }
    return false;
}
```


# 收集
### 以下是常用的代码收集，没有任何技术含量，只是填坑的积累。转载请注明出处，谢谢。

#### 1. PC - js
- 返回指定范围的随机数(m-n之间)的公式
```javascript
Math.random()*(n-m)+m
```

- [return false](http://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false)
- [return false](http://www.75team.com/archives/201)
```javascript
// event.preventDefault()会阻挡预设要发生的事件.
// event.stopPropagation()会阻挡发生冒泡事件.
// 而return false则是前面两者的事情他都会做：
// 他会做event.preventDefault();
// 他会做event.stopPropagation();
// 停止callback function的执行并且立即return回来
```

- 防止被Iframe嵌套
```javascript
if(top != self){
    location.href = ”about:blank”;
}
```

- 两种图片lazy加载的方式
第一个By JS中级交流群 成都-猎巫 第二个By 上海-zenki 
```javascript
// @description 准备为图片预加载使用的插件
// 使用的图片容器css类名为lazy-load-wrap
// 图片真实地址为data-lazy-src
// 当lazy-load-wrap容器进入视口，则开始替换容器内所有需要延迟加载的图片路径，并更改容器的加载状态
//第一种方法
$.fn.compassLazyLoad=function(){
	var _HEIGHT=window.innerHeight,
	_lazyLoadWrap=$('.lazy-load-wrap');

	var methods={
		setOffsetTop:function(){
			$.each(_lazyLoadWrap,function(i,n){
				$(n).attr({
					'top':n.offsetTop-_HEIGHT,
					'status':'wait'
				});
			})
		},
		isShow:function(){
			var _scrollTop=$(window).scrollTop;
			//利用image容器判断是否进入视口，而非image本身
			$.each(_lazyLoadWrap,function(){
				var _that=$(this);
				if (_that.attr('status')==='done') {
					return;
				};
				if (_that.attr('top')<=_scrollTop) {
					_that.find('img[data-lazy-src]').each(function(i,n){
						n.src=$(n).data('lazy-src');
					});
					_that.attr('status','done');
				};
			})
		},
		scroll:function(){
			$(window).on('scroll',function(){
				methods.isShow();
			});
		},
		init:function(){
			methods.setOffsetTop();
			methods.isShow();
			methods.scroll();
		}
	};
	methods.init();

}


//第二种方法

var exist=(function($){
	var timer=null,
	temp=[].slice.call($('.container'));
	ret={};

	for(var i=0,len=temp.length-1;i<=len;i++){
		ret[i]=temp[i];
	}
	var isExist=function(winTop,winEnd){
		for(var i in ret){
			console.log(ret);
			var item=ret[i],
			eleTop=item.offsetTop,
			eleEnd=eleTop+item.offsetHeight;

			if((eleTop>winTop&&eleTop<=winEnd)||(eleEnd>winTop&&eleEnd<=winEnd)){
				$(item).css('background','none');
				new Tab($(item).attr('id'),data).init;
				delete ret[i];
			}
		}
	}
	return {
		timer:timer;
		isExist:isExist;
	};
})($);



//第三种方法
Zepto(function ($) {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: false
    });
    (function lazyLoad() {
        var imgs = $(".lazyLoad");
        var src = '';
        $.each(imgs, function (index, item) {
            src = $(item).attr('data-src');
            $(item).attr('src', src);
        });
    })();
});
$(function () {
    var lazyLoadTimerId = null;
    /// 智能加载事件
    $(window).bind("scroll", function () {
        clearTimeout(lazyLoadTimerId);
        lazyLoadTimerId = setTimeout(function () {
            // 延迟加载所有图片
            var isHttp = (location.protocol === "http:");
            $("#ym_images img").each(function () {
                var self = $(this);
                if (self.filter(":above-the-fold").length > 0) {
                    var originUrl = self.attr("data-original");
                    self.attr("src", originUrl);
                }
            });
        }, 500);
    });
});

```

- 某年某月的1号为星期几
```javascript
var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
weekday[new Date(2015, 9, 1).getDay()];	//2015年10月1号
```

#### 2. Mobile - js

- [js 判断IOS, 安卓](http://caibaojian.com/browser-ios-or-android.html)
```javascript
var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
alert('是否是Android：'+isAndroid);
alert('是否是iOS：'+isiOS);
```

#### 3. [微信 weixin](http://loo2k.com/blog/detecting-wechat-client/)

- UserAgent 判断微信客户端
```javascript
// Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70 MicroMessenger/6.1.5 NetType/WIFI
function isWechat() {  
    var ua = navigator.userAgent.toLowerCase();
    return /micromessenger/i.test(ua) || /windows phone/i.test(ua);
}
```

- JS接口安全域名不填写，分享onMenuShareAppMessage直接会取默认值。
```javascript
// 分享onMenuShareAppMessage直接会取默认值
```

- 关闭当前页面
```javascript
WeixinJSBridge.call('closeWindow');
```

- [支付接口方法调用必须在addevent里边调用](http://www.cnblogs.com/true_to_me/p/3565039.html)
```javascript
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady(){
    that.initOrder();
}, false);
```

- 支付接口方法调用必须在
```javascript
WeixinJSBridge.invoke('getBrandWCPayRequest', d, function(res){
    if(res.err_msg == "get_brand_wcpay_request:ok"){
        // alert("支付成功");
        // union.release(d.orderId);
        resetUrl();
        paySuccess('home', d.orderId);
    } else {
        cancelOrder(d.orderId);
        // alert(res.err_msg);
    }
    loading.hide();
});
```

- 瀑布流无限加载实例 
```javascript
// be dependent on jquery & jquery.infinitescroll.min.js
// insert this '<div id="more"><a href="api?page="></a></div>' to your page.html
(function($){
  $(function(){
      var $container = $('.list-wrap-gd');
      function layOutCallBack() {
          $container.imagesLoaded(function(){
              $container.masonry({
                  itemSelector: '.item-bar',
                  gutter: 10
              });
          });
          $container.imagesLoaded().progress( function() {
              $container.masonry('layout');
          });
      }

      layOutCallBack();

      $container.infinitescroll({
          navSelector : "#more",
          nextSelector : "#more a",
          itemSelector : ".item-bar",
          pixelsFromNavToBottom: 300,
          loading:{
              img: "/images/masonry_loading.gif",
              msgText: ' ',
              finishedMsg: "<em>已经到最后一页</em>",
              finished: function(){
                  $("#more").remove();
                  $("#infscr-loading").hide();
              }
          },
          errorCallback:function(){
              $(window).unbind('.infscr');
          },
          pathParse: function (path, nextPage) {
              var query = "";
              var keyword=$("#search_keyword").val();
              var cat_id=$("#cat_id").val();
              var brand_id=$("#brand_id").val();
              var country_id = $("#country_id").val();
              query = query + "&namekeyword="+keyword;
              query = query +"&cat_id="+cat_id
              query = query + "&brand_id=" + brand_id; 
              query = query + "&country_id=" + country_id;
              path = [path,query];
              return path;
          }
      },

      function(newElements) {
          var $newElems = $( newElements ).css({ opacity: 0 });
          $newElems.imagesLoaded(function(){
              $newElems.animate({ opacity: 1 });
              $container.masonry( 'appended', $newElems, true );
              layOutCallBack();
          });
      });
  });
})(jQuery);
```
  
- [iOS，Safari浏览器，input等表单focus后fixed元素错位问题](https://www.snip2code.com/Snippet/176582/--iOS-Safari----input---focus-fixed-----)
```javascript
if( /iPhone|iPod|iPad/i.test(navigator.userAgent) ) {
  $(document).on('focus', 'input, textarea', function()
  {
     $('header').css("position", 'absolute');
     $('footer').css("position", 'absolute');
     
  });
  
  $(document).on('blur', 'input, textarea', function()
  {
       $('header').css("position", 'fixed');
       $('footer').css("position", 'fixed');
      
  });
} 

```
  
- 得到地理位置
```javascript
function getLocation(callback){
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
              function(p){
                  callback(p.coords.latitude, p.coords.longitude);
              },
              function(e){
                  var msg = e.code + "\n" + e.message;
              }
      );
  }
}
```

- [rem计算适配](http://isux.tencent.com/web-app-rem.html)
```javascript
(function(doc, win){
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function(){
          var clientWidth = docEl.clientWidth;
          if(!clientWidth) return;
          docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
      };

  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

- [另外一种rem方案](http://www.html-js.com/article/3041)
```javascript
var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');

dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth * 2 / 10;
scale = 1 / dpr;


// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;
```

- 获取js所在路径
```js
function getJsDir (src) {
    var script = null;

    if (src) {
        script = [].filter.call(document.scripts, function (v) {
            return v.src.indexOf(src) !== -1;
        })[0];
    } else {
        script = document.scripts[document.scripts.length - 1];
    }

    return script ? script.src.substr(0, script.src.lastIndexOf('/')) : script;
}
```

- 从全局捕获错误
```js
window.onerror = function (errMsg, scriptURI, lineNumber, columnNumber, errorObj) {
    setTimeout(function () {
        var rst = {
            "错误信息：": errMsg,
            "出错文件：": scriptURI,
            "出错行号：": lineNumber,
            "出错列号：": columnNumber,
            "错误详情：": errorObj
        };

        alert(JSON.stringify(rst, null, 10));
    });
};
```

- [如何通过 js 修改微信浏览器的title?](https://www.zhihu.com/question/26228251/answer/32405529)
```javascript
var $body = $('body');
document.title = 'title'; // hack在微信等webview中无法修改document.title的情况    
var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function(){ 
    setTimeout(function(){ 
        $iframe.off('load').remove() 
    }, 0) 
}).appendTo($body)
```

#### 1. 常用方法 - js
- 字符串长度截取
```js
function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/，
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                   icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
            } else {
            break;
        }
    }
    return strre + "..."
}
```

- 替换全部
```js
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
}
```

- 清除空格
```js
String.prototype.trim = function() {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return this.replace(reExtraSpace, "$1")
}
```

- 清除左空格/右空格
```js
function ltrim(s){ return s.replace( /^(\s*|　*)/, ""); } 
function rtrim(s){ return s.replace( /(\s*|　*)$/, ""); }
```
- 判断是否以某个字符串开头
```js
String.prototype.startWith = function (s) {
    return this.indexOf(s) == 0
}
```
- 判断是否以某个字符串结束	
```js
String.prototype.endWith = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
}
```
- 转义html标签
```js
function HtmlEncode(text) {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')
}
```
- 时间日期格式转换
```js
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
}
```
- 判断是否为数字类型	
```js
function isDigit(value) {
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
```
- 判断具体类型	
```js
function getType(a) {
    var typeArray = Object.prototype.toString.call(a).split(" ");
    return typeArray[1].slice(0, this.length-1);
}
```
- 设置cookie值
```js
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}
```
- 获取cookie值
```js
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}
```
- 加载样式文件表	
```js
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}
```
- 返回脚本内容
```js
function evalscript(s) {
    if(s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while(arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if(arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}
```
- 清除脚本内容
```js
function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}
```
- 动态加载脚本文件
```js
function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if(!reload && in_array(id, evalscripts)) return;
    if(reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
 
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if(src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
             };
             scriptNode.onreadystatechange = function () {
                 if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
             };
        } else if(text){
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch(e) {}
}
```
- 返回按ID检索的元素对象
```js
function $(id) {
    return !id ? null : document.getElementById(id);
}
```
- 检验URL链接是否有效	
```js
function getUrlState(URL){ 
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp"); 
    xmlhttp.Open("GET",URL, false);  
    try{  
            xmlhttp.Send(); 
    }catch(e){
    }finally{ 
        var result = xmlhttp.responseText; 
        if(result){
            if(xmlhttp.Status==200){ 
                return(true); 
             }else{ 
                   return(false); 
             } 
         }else{ 
             return(false); 
         } 
    }
}
```
- 获取当前路径
```js
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}else {
    currentPageUrl = this.href.toString().toLowerCase();
}
```
- 获取页面高度
```js
function getPageHeight(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
                    ? a
                    : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
```
- 获取页面可视宽度
```js
function getPageViewWidth(){
    var d = document, a = d.compatMode == "BackCompat" ? 
       				   d.body: d.documentElement;
    return a.clientWidth;
}
```
- 获取页面宽度
```js
function getPageWidth(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"?
    					  a: g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
```
- 随机数时间戳
```js
function uniqueId(){
    var a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}
```
- 日期格式化函数
```js
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o){
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
    }
    return format;
}
//调用
//new Date().format("yyyy-MM-dd hh:mm:ss");
```
- 返回顶部的通用方法
```js
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            }, 10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
    }
};
backTop('goTop');

//返回顶部
    
    function togg(){
        var min_height = 500;
        var s = $(window).scrollTop(); 
        //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐 
        if( s > min_height){ 
            $(".help-gototop").fadeIn(100); 
        }else{ 
            $(".help-gototop").fadeOut(200); 
        };  
    }
    togg();

    $(window).scroll(function(){ 
        togg();
    }); 

    $(".help-gototop").on("click",function(){
        $('html,body').animate({scrollTop:0},700);
    });
    
    
```
- 获得URL中GET参数值
```js
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get(){ 
    querystr = window.location.href.split("?")
    if(querystr[1]){
        GETs = querystr[1].split("&");
        GET = [];
        for(i=0;i<GETs.length;i++){
              tmp_arr = GETs.split("=")
              key=tmp_arr[0]
              GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
}
```
- 数组去重
```js
String.prototype.unique=function(){
    var x=this.split(/[\r\n]+/);
    var y='';
    for(var i=0;i<x.length;i++){
        if(!new RegExp("^"+x.replace(/([^\w])/ig,"\\$1")+"$","igm").test(y)){
            y+=x+"\r\n"
        }
    }
    return y
};
```
- 按字典顺序，对每行进行数组排序
```js
function SetSort(){
    var text=K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序
    var test=K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序
    K1.value=K1.value!=text?text:test;
}
```
- 字符串反序输出
```js
function IsReverse(text){
    return text.split('').reverse().join('');
}
```
- 金额大写转换函数
```js
//格式转换
function transform(tranvalue) {
    try {
        var i = 1;
        var dw2 = new Array("", "万", "亿"); //大单位
        var dw1 = new Array("拾", "佰", "仟"); //小单位
        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
        //以下是小写转换成大写显示在合计大写的文本框中     
        //分离整数与小数
        var source = tranvalue.split(".");
        var num = source[0];
        var dig = source[1];
        //转换整数部分
        var k1 = 0; //计小单位
        var k2 = 0; //计大单位
        var sum = 0;
        var str = "";
        var len = source[0].length; //整数的长度
        for (i = 1; i <= len; i++) {
              var n = source[0].charAt(len - i); //取得某个位数上的数字
              var bn = 0;
              if (len - i - 1 >= 0) {
                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
              }
              sum = sum + Number(n);
              if (sum != 0) {
                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
                if (n == '0') sum = 0;
              }
              if (len - i - 1 >= 0) { //在数字范围内
                if (k1 != 3) { //加小单位
                      if (bn != 0) {
                        str = dw1[k1].concat(str);
                      }
                      k1++;
                } else { //不加小单位，加大单位
                      k1 = 0;
                      var temp = str.charAt(0);
                      if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
                      str = str.substr(1, str.length - 1);
                      str = dw2[k2].concat(str);
                      sum = 0;
                }
              }
              if (k1 == 3){ //小单位到千则大单位进一
                k2++;
              }
        }
        //转换小数部分
        var strdig = "";
        if (dig != "") {
              var n = dig.charAt(0);
              if (n != 0) {
                strdig += dw[Number(n)] + "角"; //加数字
              }
              var n = dig.charAt(1);
              if (n != 0) {
                strdig += dw[Number(n)] + "分"; //加数字
              }
        }
        str += "元" + strdig;
    } catch(e) {
        return "0元";
    }
    return str;
}
```
- 鼠标滚动跟随导航
```
$(window).scroll(function(){ 
        active_docfloat_nav();
    }); 

    function active_docfloat_nav() {
        var n = $('.h1-line').length;
        
        for (var i = 0; i < n; i++) {
            var top = ele_window_top($('.h1-line').eq(i));
            var curNav = $('.float-r li:eq(' + i + ') a');
            
            if (i == (n - 1)) {
                if (20< top <= 0) {
                    set_docnav_active(curNav);
                }
            } else {
                var nTop = ele_window_top($('.h1-line').eq(i + 1));
                if (top > 20||top <= 0 && nTop > 0) {
                    set_docnav_active(curNav);
                    break;
                }
            }
        }
    }

    $(document).on('click', '.float-r li a', function (e) {
        set_docnav_active($(this));
        $(window).scrollTop($($(this).attr('href')).offset().top);
        // console.log($($(this).attr('href')).offset().top);
        e.preventDefault();
    })

    function set_docnav_active(o) {
        $('.float-r li a').removeClass('active');
        o.addClass('active');
    }

    function ele_window_top(ele) {
        var eTop = ele.offset().top;
        
        return eTop - $(window).scrollTop();
    }

```

- 文件上传

```
//使用FileReader
$('.file-img').on('change',function(){
	/*var objUrl = getObjectURL(this.files[0]);
	if (objUrl) {
		$(".re-img img").attr("src", objUrl);
    }*/
    var reader = new FileReader();
	reader.onload = function(e){
	    var dataURL=this.result;
	    $(".re-img img").attr("src", dataURL);
	}
	reader.readAsDataURL(this.files[0]);

});

//使用blob
 //建立一个可存取到该file的url
function getObjectURL(file){
	var url = null; 
	if (window.createObjectURL!=undefined) { // basic
	  url = window.createObjectURL(file);
	} else if (window.URL!=undefined) { // mozilla(firefox)
	  url = window.URL.createObjectURL(file);
	} else if (window.webkitURL!=undefined) { // webkit or chrome
	  url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
```

- 屏蔽选择文字和右键
```
document.oncontextmenu = function(e){
	e.preventDefault();
};
document.onselectstart = function(e){
	e.preventDefault();
};
```
