$(function(){
			//下一页面
			$('.weixinq_page').on('click','#page_buttonsprev',function(){
				var urls=$(this).attr('_href');
				$.ajax({
					type:'POST',
					url:urls,
					data:'ajax=1',
					/*beforeSend:function(){
						$('#list_card li').remove();
						//$('.pages').html('<p align="center">加载中,请稍等...</p>');
					},*/
					success:function(res){
						var result=jQuery.parseJSON(res);
						if(result.status==1){
							addData(result);
							return false;
						}else{
							alertMo(result.message);
						}
					}
				});
			});
			$('.weixinq_page').on('click','#page_buttonsnext',function(){
				var urls=$(this).attr('_href');
				$.ajax({
					type:'POST',
					url:urls,
					data:'ajax=1',
					/*beforeSend:function(){
						$('#list_card li').remove();
						//$('.pages').html('<p align="center">加载中,请稍等...</p>');
					},*/
					success:function(res){
						var result=jQuery.parseJSON(res);
						if(result.status==1){
							addData(result);
							return false;
						}else{
							alertMo(result.message);
						}
					}
				});
			});
			
			//返回顶部
			var sdelay=0;
			
		
		});
		function returnTop(){
				window.scrollBy(0,-800);
				if(document.body.scrollTop>0) { 
					
				}
			}
			//追加数据
		function addData(result){
				var list=result.list;
				var list_card='';
				var card_code='';
				var classes='';
				for(var i=0;i<list.length;i++){
					var id=list[i]['id'];
					var introduce=list[i]['introduce'].substring(0,15);
					var name=list[i]['name'];
					var role_id=list[i]['role_id'];
					$('#href_'+i).attr('href','/index.php/card-detail-id-'+id+'.html');
					$('#introduce_'+i).html('');
					$('#introduce_'+i).html(introduce);
					
					if(role_id>1){
						$('#name_'+i).html('<span class="red">'+name+'</span><i></i>');
					}else{
						$('#name_'+i).html('<span >'+name+'</span>');
					}
				}
				$('.weixinq_page').html(result.pages);
				returnTop();
			}