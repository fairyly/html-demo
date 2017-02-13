/**
 * 获取URL中参数值
 * @param name
 * @returns
 */
function getPara(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURIComponent(r[2]);
	return "";
}

Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

$(function(){
	// data-text:输入框的默认值
	$("input[type='text']").each(function(){
		if($(this).attr("data-text") && $(this).val() == ""){
			$(this).val($(this).attr("data-text"));
			$(this).focus(function(){
				if($(this).val() == $(this).attr("data-text")){
					$(this).val("");
				}
			});
			$(this).blur(function(){
				if($(this).val() == ""){
					$(this).val($(this).attr("data-text"));
				}
			});
		}
	});
	
	// 处理有data-time的标签
	$("span[data-time]").each(function(){
		var date = $(this).attr("data-time");
		$(this).html((new Date(parseInt(date))).Format("yyyy-MM-dd hh:mm:ss"));
	});
	
	// 提交按钮提交时判断输入框是否为空
	$("input[type='submit'],input[protect='true']").click(function(){
		$("input").each(function(){
			if($(this).attr("data-text") && $(this).attr("data-text")==$(this).val()){
				$(this).val("");
			}
		});
	});
	
	// 按钮保护功能实现
	$("input[type='submit']").each(function(){
		if($(this).attr("protect") == "true"){
			$(this).click(function(){
				$(this).val("提交中...").attr("disabled","disabled");
				$(this).parents("form").submit();
			});
		}
	});
	
	// 按钮遮罩保护功能实现
	$("input[type='submit']").each(function(){
		if($(this).attr("shade-protect") == "true"){
			$(this).click(function(){
				common.pageProtect();
			});
		}
	});
});

$(window).load(function(){
	 $(".common-back").css("min-height",($(window).height() - $(".common-title").height()) + "px");
});

// 公用对象
var common = {
		// 是否开发模式
		devMode: true,
		appID: this.devMode ? "wx5af5f2daeba81ffd" : "wx5af5f2daeba81ffd",
		appSecret : this.devMode ? "846b519d8c960ccdf49be1e0b6d78ab3" : "846b519d8c960ccdf49be1e0b6d78ab3",
		host : this.devMode ? "http://localhost:8080/qfdr" : "http://www.cttnb.cn",
		toolHost: "http://www.chunjiws.cn/",
		pageProtect: function(){
			// 页面保护，不让用户进行操作
			var container = $("<div class='page-protect'></div>").appendTo($("body"));
			var moT = $("<div class='moT'></div>").appendTo($("body")).width($(document).width()).height($(document).height());
			var content = $("<div class='content'>正在加载...</div>").appendTo(container);
		},
		stopProtect: function(){
			// 停止页面保护，允许用户操作
			$(".page-protect,.moT").remove();
		},
		wannaPay: function(){
			// 页面保护，不让用户进行操作
			var container = $("<div class='page-protect'></div>").appendTo($("body"));
			var moT = $("<div class='moT'></div>").appendTo($("body")).width($(document).width()).height($(document).height());
			var content = $("<div class='content'><img style='width: 80%;' src='../images/shasha.jpg'/><br /><br /><span style='color: #fff;'>长按或扫描二维码联系爱圈粉负责人进行充值</span></div>").appendTo(container);
		},
		shareInit: function(obj){
			var openID = obj.openID;
			var signature = obj.signature;
			var timestamp = obj.timestamp;
			var inviteAddr = obj.inviteAddr;
			var shareTitle = obj.shareTitle;
			var shareDesc = obj.shareDesc;
			var imgPath = obj.imgPath || common.host + "/images/v.jpg";
			
			// alert(location.href.split('#')[0]);
			
			// js-sdk
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: common.appID, // 必填，公众号的唯一标识
			    timestamp: timestamp, // 必填，生成签名的时间戳
			    nonceStr: 'TmqtI9LIZM4uGiY6MWYBN4GnthPx1QKUEERYoqR7Rt6', // 必填，生成签名的随机串
			    signature: signature,// 必填，签名，见附录1
			    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'checkJsApi','chooseImage','uploadImage','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			
			wx.ready(function(){
			    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				// 分享到朋友圈
				wx.onMenuShareTimeline({
				    title: shareTitle, // 分享标题
				    link: inviteAddr, // 分享链接
				    imgUrl: imgPath, // 分享图标
				    success: function () { 
				       if(obj.timelineSuccessCall){
				    	   obj.timelineSuccessCall();
				       }
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				
				// 分享给好友
				wx.onMenuShareAppMessage({
				    title: shareTitle, // 分享标题
				    desc: shareDesc, // 分享描述
				    link: inviteAddr, // 分享链接
				    imgUrl: imgPath, // 分享图标
				    type: '', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				    success: function () { 
				    	if(obj.appMessageSuccessCall){
				    	   obj.appMessageSuccessCall();
				       }
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				
				// 分享到QQ
				wx.onMenuShareQQ({
				    title: shareTitle, // 分享标题
				    desc: shareDesc, // 分享描述
				    link: inviteAddr, // 分享链接
				    imgUrl: imgPath, // 分享图标
				    success: function () { 
				    	if(obj.shareQQSuccessCall){
				    	   obj.shareQQSuccessCall();
				       }
				    },
				    cancel: function () { 
				       // 用户取消分享后执行的回调函数
				    }
				});
				
				// 分享到腾讯微博
				wx.onMenuShareWeibo({
				    title: shareTitle, // 分享标题
				    desc: shareDesc, // 分享描述
				    link: inviteAddr, // 分享链接
				    imgUrl: imgPath, // 分享图标
				    success: function () { 
				    	if(obj.shareWeiBoSuccessCall){
				    	   obj.shareWeiBoSuccessCall();
				       }
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
			});
		}
};

// 弹出框逻辑实现
(function(){
	zmcDialog = {
			info : function(obj){
				if(obj.isAdmin){
					alert(obj.text);
					return;
				}
				var container = $("<div class='zmc-dialog'></div>").appendTo($("body"));
				var moT = $("<div class='moT'></div>").appendTo($("body")).width($(document).width()).height($(document).height());
				var content = $("<div class='content'></div>").appendTo(container);
				var title = $("<div class='title'></div>").appendTo(content).html(obj.title?obj.title:"提示");
				var close = $("<span class='close'>X</span>").appendTo(title).click(function(){
					zmcDialog.close();
				});
				var text = $("<div class='text "+(obj.type?obj.type:"")+"'></div>").appendTo(content).html(obj.text);
				var operate = $("<div class='operate'></div>").appendTo(text);
				var confirm = $("<a class='ui-btn-green'>确定</a>").appendTo(operate);
				if(obj.type == 'confirm'){
					var cancel = $("<a class='ui-btn-gray cancel'>取消</a>").appendTo(operate);
					cancel.click(function(){
						zmcDialog.close();
						obj.cancelCall?obj.cancelCall():"";
					});
				}
				confirm.click(function(){
					zmcDialog.close();
					obj.okCall?obj.okCall():"";
				});
			},
			success : function(obj){
				obj.type = 'success';
				this.info(obj);
			},
			error : function(obj){
				obj.type = 'error';
				this.info(obj);
			},
			confirm: function(obj){
				obj.type = 'confirm';
				this.info(obj);
			},
			close: function(){
				$(".zmc-dialog,.moT").remove();
			}
	}
})();

function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//判断是不是在自己的APP里
function isOwnAPP(){
	return localStorage.getItem("isIOS");
}

// 兼容网页跳转和APP跳转
function goUrl(url, goWeixin){
	window.location.href = url;
	return;
	
	if(isWeiXin()){
		if(window.location.href.indexOf("www.chunjiws.cn") > -1){
			window.location.href = url;
			return;
		}
		if(url.indexOf("http") > -1){
			if(!goWeixin){
				// 不走微信
				window.location.href = url;
			}else{
				window.location.href = common.devMode ? url : "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+common.appID+"&redirect_uri=" + encodeURIComponent(url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
			}
		}else{
			window.location.href = common.devMode ? url : "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+common.appID+"&redirect_uri=" + encodeURIComponent(common.host + "/weixin/" + url) + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
		}
	}else{
		window.location.href = url;
	}
}

function goIOSWebView(url){
	if(isOwnAPP()){
		var host = "";
		if(window.location.href.indexOf("qfdr.ios.chunjiws.com.cn") <= -1){
			host = "http://zmcnxd.xicp.net/qfdr/weixin/";
		}else{
			host = "http://qfdr.ios.chunjiws.com.cn/weixin/";
		}
		setupWebViewJavascriptBridge(function(bridge) {
	    	bridge.callHandler('AppNativeHandler', {'action': 'loadPage','data': {'url':host + url}}, function(response) {
				log('JS got response', response);
			});
		});
	}else{
		window.location.href = url;
	}
}

// 替换页面中所有链接的跳转方式
$(window).load(function(){
	// 设置分享图片
	$("body").prepend("<div style='height: 0;overflow: hidden;'><img src='../images/v_big.jpg'/></div>")
	document.title = '薇薇助手——免费制作精美海报！';
	$("a").each(function(){
		var href = $(this).attr("href");
		if(href && href.indexOf("javascript") <= -1){
			$(this).attr("href","javascript:;");
			$(this).click(function(){
				goUrl(href);
			});
		}
	});
});
