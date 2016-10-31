$(function(){

	// 搜索
	$(".search input[type='text']").focus(function(){
		$(this).animate({width:$(this).width()+200+"px"},1000);
	});
	$(".search input[type='text']").blur(function(){
		$(this).animate({width:$(this).width()-200+"px"},500);
	});

	//登陆表单
	$("#login-form input[type='text']").on({
		focus:function(){
			$(this).css({
				backgroundImage:"url(./imgs/yx2.png)",
				outline:"none",                   /*去掉边框*/
			});
			$("#border-span-1").fadeIn(500);
		},
		blur:function(){
			$(this).css({
				backgroundImage:"url(./imgs/yx1.png)",
			});
			$("#border-span-1").fadeOut(500);
		},
		keydown:function(){
			if($("#login-form input[type='password']").val().length !== 0){
				$("#login-form input[type='submit']").css("backgroundColor","#32BE77");
			}
			$(".login-error-tips").hide();
		},
		keyup:function(){
			if($(this).val().length === 0){
				$("#login-form input[type='submit']").css({
					backgroundColor:"#8AAF96",
					opacity: 0.75
				});
			}
		}
	});
	$("#login-form input[type='password']").on({
		focus:function(){
			$(this).css({
				backgroundImage:"url(./imgs/pw2.png)",
				outline:"none",
			});
			$("#border-span-2").fadeIn(500);
		},
		blur:function(){
			$(this).css({
				backgroundImage:"url(./imgs/pw1.png)",
			});
			$("#border-span-2").fadeOut(500);
		},
		keydown:function(){
			if($("#login-form input[type='text']").val().length !== 0){
				$("#login-form input[type='submit']").css("backgroundColor","#32BE77");
			}
			$(".login-error-tips").hide();
		},
		keyup:function(){
			if($(this).val().length === 0){
				$("#login-form input[type='submit']").css({
					backgroundColor:"#8AAF96",
					opacity: 0.75
				});
			}
		}
	});

	$("#login-form~span img,#regis-form~span img").on({
		mouseover:function(){
			$(this).attr("src","./imgs/git2.png");
		},
		mouseout:function(){
			$(this).attr("src","./imgs/git1.png");
		}
	});

	/*注册*/
	$("#regis-yx").on({
		focus:function(){
			$(this).val(" ").css({
				backgroundImage:"url(./imgs/yx2.png)",
				outline:"none",                   /*去掉边框*/
			});
			$("#border-span-1").css("top","67px").fadeIn(500);
		},
		blur:function(){
			$(this).css({
				backgroundImage:"url(./imgs/yx1.png)",
			});
			$("#border-span-1").hide().css({top:0,marginTop:"15px"});
		}
	});
	$("#regis-gx").on({
		focus:function(){
			$(this).val(" ");
			$("#border-span-2").css("top","147px").fadeIn(500);
		},
		blur:function(){
			$("#border-span-2").css("top","80px").hide();
		},
	});

	$("#res-ul").children("li:gt(0)").hide().end().click(function(e){
		e.stopPropagation();
		$(this).css("backgroundColor","rgba(188,206,219,.5)").children("li:gt(0)").show();
	});
	$("body").not("#res-ul").click(function(){
		$("#res-ul").css("backgroundColor","rgba(188,206,219,0)").children("li:gt(0)").hide();
	});
})