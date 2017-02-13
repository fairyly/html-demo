$(function(){
	//初始化
	var status="{$status}";
	
	//上传二维码
	$('#uploads').click(function(){
		$('#img').click();return false;
	})
	$('#showimg').click(function(){
		$('#img').click();return false;
	})
	$('#img').change(function(){
		$('#uploads').html('二维码上传中...');
		infosubmit();
		return false;
	})
	function infosubmit(){
		var formData = new FormData($( "#infos" )[0]);  
		$.ajax({
			type: "POST",
			url: "/card-upload.html",
			data:formData,
			dataType:'json', 
			async: false,  
			cache: false,  
			contentType: false,  
			processData: false,  
			success: function(result){
				alertMo(result.msg);
				if(result.status == 1){
					$('#showimg').attr('src',result.data.msg);
					$('#image').val(result.data.msg);
					$('#thumb').val(result.data.thumb);
					$('#uploads').html(result.msg);
				}else{
					$('#uploads').html('上传二维码');
					return false;
				}
			}
		});
		
	}
	
	$('#fabu').click(function(){
		//判断二维码是否为空
		var image=$('#image').val();
		var status=$('#status').val();
		if(image==''){
			alertMo('请先上传二维码');return false;
		}
		$.post("/card-ajax_check_insert.html",{status:status},function(result){
			if(result.status==0){
				var flag=result.data;
				if(flag=='index'){
					//提示完善资料 - 朕知道了
					wanshan();return false;
				}
				if(flag=='user'){
					//普通会员太频繁 -限时免费
					xianshi();return false;
				}
				if(flag=='vip'){
					//vip会员太频繁 -朕知道了
					zhenzd();return false;
				}
			}else{
				fabu();
			}
		},"json")
	})
	//关闭弹框
	$(".tishik_close").click(function(){
		var id=$(this).attr('data');
		$(".t"+id).css("display","none")
	})
	//限时免费
	function xianshi(){
		$(".t1").css("display","block");
		setTimeout('$(".t1").css("display","none")',5000)
	}
	//朕知道了
	function zhenzd(){
		$(".t2").css("display","block");
		setTimeout('$(".t2").css("display","none")',5000)
	}
	//完善个人资料
	function wanshan(){
		$(".t3").css("display","block");
		setTimeout('$(".t3").css("display","none")',5000)
	}
	function fabu(){
		var formData=$("form").serialize();
		$.ajax({
			type: "POST",
			url: "/card-insert.html",
			processData:true,
			data:formData,
			dataType:'json',
			success: function(result){
				alertMo(result.msg);
				if(result.status == 1){
					var status=$('#status').val();
					if(status=='1'){
						var data='group_lists';
					}else{
						var data='lists';
					}
					window.location.href="/index.php/card-"+data+".html";
				}else{
					return false;
				}
			}
		});
		
	}
})