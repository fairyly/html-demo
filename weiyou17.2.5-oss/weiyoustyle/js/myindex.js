
            function checkform(){
               var introduce=$('#introduce').val();
               if(introduce.length<1 || introduce.length>15){
               	  alertMo('个人签名需15个字符以内');
               	  return false;
               }
               infosubmit();
            }
			function infosubmit(){
				var formData=$("#info").serialize();
				$.ajax({
					type: "POST",
					url: "user-index.html",
					processData:true,
					data:formData,
					dataType:'json',
					success: function(result){
						alertMo(result.msg);
						if(result.status == 1){
							if(result.data){
								var url=result.data;
							}else{
								var url="{:U('user/index')}";
							}
							window.location.href=url;
						}
					}
				});
			}