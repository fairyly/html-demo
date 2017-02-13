 $(document).ready(function(){
       // $(".footer a").eq(1).css({"background":"url(http://weiyounew.oss-cn-hangzhou.aliyuncs.com/images/aa4.png) center 13px no-repeat","backgroundSize":"20px auto"});  
	   $(".footer a:eq(1)").css("color","#6F46E0");
	   $(".footer a").children("span").css("color","#b2b2b2");
	   $(".footer a").eq(1).children("span").css("color","#6F46E0")
	   var bodywidth= document.body.clientWidth;
	   var bodyH= document.body.clientHeight;

			//地区控件
				
				//省份
				$('#prov').bind('change',function(){
					var prov=$(this).val();
					$('#yprov').val(prov);
					$("#address_1 span").eq(0).html($("#prov").find("option:selected").text());
					if(prov==''){
						$('#city').html('<option value="">不限</option>');
						$('#city').selectmenu('refresh', true);
						$('#city_select_toggle').text('全部地区');
						$('#ycity').val('');
						return false;
					}else{
						$.ajax({
							type:'POST',
							url:'/index.php/card-getcity.html',
							data:'prov='+prov,
							beforeSend:function(){
							   $('#ycity').val('');
                               $('#city_select_toggle').text('不限');
							   $('#city').html('<option value="">不限</option>');
							 
							},
							success:function(res){
								$("#address_1 span").eq(1).html('不限');
								 result=jQuery.parseJSON(res);
								if(result.status==1){
									$('#city').html('<option value="">不限</option>'+ result.data);
								}else{
									alertMo(result.message);
								}
							},
							complete:function(){
							    prov_name=$('#prov option:selected').text();
							   $('#city_select_toggle').text(prov_name);
                                                           
							},
							error:function(){
							   alertMo('出错了');
							}         
						});
					}
				});
				//城市
				$('#city').bind('change',function(){
					var city=$(this).val();
					$('#ycity').val(city);
					$("#address_1 span").eq(1).html($("#city").find("option:selected").text());
				});
				//查询
				$('#search').bind('click',function(){
					var prov=$('#yprov').val();
					var city=$('#ycity').val();
					var sex=$('#sex').val();
					if(prov=='' && city=='' && sex==''){
						window.location.href="/index.php/card-lists.html";
						return false;
					}
					$.ajax({
						type:'POST',
						url:'/index.php/card-searchCard.html',
						data:'ajax=1&prov='+prov+'&city='+city+'&sex='+sex,
						/*beforeSend:function(){
							$('#list_card li').remove();
							//$('.pages').html('<p align="center">加载中,请稍等...</p>');
						},*/
						success:function(res){
						   var result=jQuery.parseJSON(res);
							if(result.status==1){
								addData(result);
								setTimeout('closeLayers()',100);
								return false;
							}else{
								alertMo(result.message);
							}
						}
					});
				});
				//下一页面
				$('.weixinq_page').on('click','#page_buttonsnext',function(){
					 prov=$('#yprov').val();
					 city=$('#ycity').val();
					 sex=$('#sex').val();
					 urls=$(this).attr('_href');                    
					$.ajax({
						type:'POST',
						url:urls,
						data:'ajax=1&prov='+prov+'&city='+city+'&sex='+sex,
                                                datatype:'json',
						beforeSend:function(){
							//$('#list_card li').remove();
							//$('.pages').html('<p align="center">加载中,请稍等...</p>');
						},
						success:function(res){
							 result=jQuery.parseJSON(res);
							 // console.log(result);
							if(result.status==1){
								addData(result);
								return false;
							}else{
								alertMo(result.message);
							}
						}
					});
				});
             $('.weixinq_page').on('click','#page_buttonsprev',function(){
					 prov=$('#yprov').val();
					 city=$('#ycity').val();
					 sex=$('#sex').val();
					 urls=$(this).attr('_href');
                                        
					$.ajax({
						type:'POST',
						url:urls,
						data:'ajax=1&prov='+prov+'&city='+city+'&sex='+sex,
                                                datatype:'json',
						beforeSend:function(){
							$('#list_card li').remove();
							//$('.pages').html('<p align="center">加载中,请稍等...</p>');
						},
						success:function(res){
							 result=jQuery.parseJSON(res);
							 // console.log(result);
							if(result.status==1){
								addData(result);
								return false;
							}else{
								alertMo(result.message);
							}
						}
					});
				});

				//追加数据
				function addData(result){
					if(result.count==0){
						$('#list_card li').remove();
						$('.card_code').html('');
						$('.pages').html('');
					}else{
						var list=result.list;
						var list_card='';
						var card_code='';
						var classes='';
						for(var i=0;i<list.length;i++){
							var id=list[i]['id'];
							var weixin=list[i]['weixin'];
							var thumb=list[i]['thumb'];//头像
							var role_id=list[i]['role_id'];
							var location=list[i]['location'];
							var introduce=list[i]['introduce'];
							var name=list[i]['name'];
                                                        var openid=list[i]['openid'];
							var img=list[i]['img'];//二维码
							$('#href_'+i).attr('href','#erweicode_'+i);
							$('#href_'+i).attr('aria-owns','erweicode_'+id);
							$('#thumb_'+i).attr('src',thumb);
							
							if(role_id>1){
								$('#name_'+i).html('<span>昵称 :</span><span class="red">'+name+'</span><i></i>');
							}else{
								$('#name_'+i).html('<span>昵称 :</span><span >'+name+'</span>');
							}
							$('#location_'+i).html(location);
							$('#introduce_'+i).html(introduce);
							$('#code_'+i).attr('href','#erweicode_'+id);
							//$('#code_'+i).attr('aria-owns','erweicode_'+id);
							$('#erweicode_'+i).attr('data',id);
							$('#code_img_'+i).attr('src',img);
							$('#weixin_'+i).html(weixin);
							$('#wx_openid_'+i).html(openid);
						        $('#friendid_'+i).attr('value',openid);
						}
						$('.weixinq_page').html(result.pages);
						returnTop();
					} 
				}
				//返回顶部
				var sdelay=0;
				
				$('.darenxiu_box').bind('click',function(){
					var ids=$(this).attr('href');
                                        $(ids).css("display","block");
	
				});
				$('.ok').bind('click',function(){
					 $(".ui-popup-container").slideUp();
				});
		});
        function returnTop(){
			window.scrollBy(0,-500);
				if(document.body.scrollTop>0) { 
			}
		}
		function closeLayers(){
			$(".address_d").slideUp();
		}
		$("#sex").change(function(){
		    $("#address_2 span").eq(0).html($("#sex").find("option:selected").text())
		})
		  
		$('.talk').click(function(){
			var id=$(this).attr('data');
			$('#talk_'+id).submit();
		})