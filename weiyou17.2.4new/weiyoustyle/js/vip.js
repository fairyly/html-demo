		//调用微信JS api 支付
		function jsApiCall(data)
		{
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				{
					"appId": data.appId,
					"timeStamp": data.timeStamp,
					"nonceStr": data.nonceStr,
					"package": data.package,
					"signType": data.signType,
					"paySign": data.paySign
				},
				function(res){
					WeixinJSBridge.log(res.err_msg);
					//alert('支付错误提示：'+res.err_code+res.err_desc+res.err_msg);
					if(res.err_msg=='ok'){
						window.location.href="/index.php/user-index.html";
					}else{
						window.location.reload();
					}
				}
			);
		}
		function callpay(val)
		{
			if (typeof WeixinJSBridge == "undefined"){
			    if( document.addEventListener ){
			        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			    }else if (document.attachEvent){
			        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
			        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			    }
			}else{
				$.post("{:U('user/vip')}",{type:val},function(result){
					if(result.status==0){
						alert(result.msg);
					}else{
						jsApiCall(result.data);
					}
				})
			}
		}
		$(function(){
			$('.pays').click(function(){
				var $val=$(this).attr('data');
				callpay($val);
				$(this).die();
			})
			
		})