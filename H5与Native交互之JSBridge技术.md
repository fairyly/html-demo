# H5与Native交互之JSBridge技术


## 混合 Hybrid

### 基本原理
通过 JSBridge,H5 页面可以调用 Native 的 api,Native 也可调用 H5 页面的方法或者通知H5页面回调

![](https://dailc.github.io/staticResource/blog/hybrid/img_hybrid_base_hybridInfo_3.jpg)

### 内部的实现原理流程

### 什么是JSBridge
JSBridge是广为流行的Hybrid开发中JS和Native一种通信方式,各大公司的应用中都有用到这种方法

简单的说,JSBridge就是定义Native和JS的通信,Native只通过一个固定的桥对象调用JS,JS也只通过固定的桥对象调用Native,

#### JSBridge 基本原理是:

>H5->通过某种方式触发一个url->Native捕获到url,进行分析->原生做处理->Native调用H5的JSBridge对象传递回调。
JSBridge是Native代码与JS代码的通信桥梁。  
目前的一种统一方案是:H5触发url scheme->Native捕获url scheme->原生分析,执行->原生调用h5。

- 提到url scheme这个概念,那这到底是什么呢?

>url scheme是一种类似于url的链接,是为了方便app直接互相调用设计的,  
url scheme毕竟是通过url拦截实现的，在大量数据传输，以及效率上都有影响

###
###为什么要用JSBridge
在上文中我们有提到Native和原生之间的基本通信,既然Native和原生已经能够实现通信了,那为什么还要这种通过url scheme的JSBridge方式呢,原因大致如下
```
Android4.2以下,addJavascriptInterface方式有安全漏掉 
iOS7以下,JS无法调用Native

url scheme交互方式是一套现有的成熟方案,可以完美兼容各种版本,不存在上述问题

另外,请注意,可以理解为JSBridge是一种交互理念,而上述的url scheme则是其中的一种实现,所以也就是说,就算后面实现变为了

addJavascriptInterface,JavaScriptCore,也一样是JSBridge交互
```

JSBridge交互的一个很大特点就是便于拓展,而且没有重大的安全性问题


### 设计一种JSBridge的实现

实现思路
```
要实现JSBridge,我们可以进行关键步骤分析

第一步:设计出一个Native与JS交互的全局桥对象
第二步:JS如何调用Native
第三步:Native如何得知api被调用
第四步:分析url-参数和回调的格式
第五步:Native如何调用JS
第六步:H5中api方法的注册以及格式
```

- 第一步:设计出一个Native与JS交互的全局桥对象

我们规定,JS和Native之间的通信必须通过一个H5全局对象JSbridge来实现,该对象有如下特点

该对象名为"JSBridge",是H5页面中全局对象window的一个属性

```
var JSBridge = window.JSBridge || (window.JSBridge = {});
```
					
该对象有如下方法:

```
registerHandler( String,Function )H5调用 注册本地JS方法,注册后Native可通过JSBridge调用。调用后会将方法注册到本地变量messageHandlers 中
callHandler( String,JSON,Function )H5调用 调用原生开放的api,调用后实际上还是本地通过url scheme触发。调用时会将回调id存放到本地变量responseCallbacks中
_handleMessageFromNative( JSON )Native调用 原生调用H5页面注册的方法,或者通知H5页面执行回调方法
```



## 参考

[H5与Native交互之JSBridge技术](https://tech.youzan.com/jsbridge/)

[Hybrid APP架构设计思路](http://www.tuicool.com/articles/yeeABzJ)

[marcuswestin/WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)

[记录app webview内嵌vue单页应用所遇到的坑](http://www.jianshu.com/p/92fdaf0a8a9f)

[github-WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)
[JSBridge-Web与Native交互之iOS篇](http://www.jianshu.com/p/9fd80b785de1)
[Ios Android Hybrid app 与 Js Bridge](http://blog.csdn.net/jacin1/article/details/39993935)
[Hybrid APP架构设计思路](http://www.tuicool.com/articles/yeeABzJ)
[【Android】如何写一个JsBridge](http://www.cnblogs.com/xesam/p/5402985.html)
[IOS之URL Scheme的使用](http://blog.csdn.net/wbw1985/article/details/26264029)

[Hybrid APP基础篇(一)->什么是Hybrid App](https://www.cnblogs.com/dailc/p/5930231.html#hybrid_4_1)
- [SBridge的原理](http://www.cnblogs.com/dailc/p/5931324.html)

