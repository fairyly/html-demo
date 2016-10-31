$(document).ready(function()
{
	var index;  //当前点击的元素的索引
	var isClick = false;  //首次加载时，是否点击了其它导航菜单，没有点击则高亮第一个菜单
	var clickCount = 0; //点击次数，点击过时，用于判断调用isHighlight且只调用一次

	function over(){
		$(this).children('a').css({
			backgroundColor:"#FFF",
			color:"#1F90DE"
		})
		.end()
		.children('ul').slideDown(500)
		.on({
			mouseenter:function(){
				$(this).parent().children('a').css({
					backgroundColor:"#FFF",
					color:"#1F90DE"
				});
			},
			mouseleave:function(){
				$(this).hide().parent().children('a').css({
					backgroundColor:"#1F90DE",
					color:"#FFF"
				});
			}
		});
	}
	function leave(){
		$(this).children('ul').stop(true,true).hide()
		.end()
		.children('a').css({
			backgroundColor:"#1F90DE",
			color:"#FFF"
		});
	}
	function isHighlight(isClick){
		if(isClick){
			$(".nav-ul").children().first().on("mouseleave",leave);
		}else{
			$(".nav-ul").children().first().off("mouseleave",leave);
		}
	}
	$(".nav-ul").children().each(function(){
		$(this).on({
			mouseover:over,
			mouseleave:leave,
			click:function(){
				isClick = true;
				clickCount += 1;
				if(clickCount === 1){
					isHighlight(isClick);
				}

				var _this = $(this);
				index = $(this).index();
				//存在下拉列表，根据是否有子菜单判断更通用
				if(_this.children('ul').length !== 0){
					$(this).off("mouseover");
					_this.children('ul').hide();
				}
				else{
					$(".nav-ul").children().last().on("mouseover",over);
				}

				_this.off('mouseleave',leave).children('a').css({
					backgroundColor:"#FFF",
					color:"#1F90DE"
				})
				.end().siblings().children('a')
				.css({
					backgroundColor:"#1F90DE",
					color:"#FFF"
				});
				_this.on("mouseleave",function(){
					_this.siblings().each(function(){
						$(this).mouseleave(function(){
							if($(this).index()!== index){
								$(this).children('ul').stop(true,true).hide()
								.end()
								.children('a').css({
									backgroundColor:"#1F90DE",
									color:"#FFF"
								});
							}
						});
					});

				});
			}
		});
	});

	//高亮第一个菜单
	isHighlight(isClick);

	$(".left-article-content").find("img").hover(
		function(){
			/*$(this).animate({width:"220px",height:"180px"},500);*/
			$(this).animate({width:"105%",height:"110%"},500);
		},
		function(){
			/*$(this).animate({width:"200px",height:"150px"},500);*/
			$(this).animate({width:"100%",height:"100%"},500);
		}
	);
	//更多的联系我们--》js控制
	$(".care-us-list").children().each(function(){
		$(this).on('mouseover',function(){
			$(".social-content").children().not("#move-triangle")
			.eq($(this).index()).show().siblings().not("#move-triangle").hide();
			$("#move-triangle").css("left",$(this).position().left-28+"px");
		});
	});

	// 返回顶部
	$(window).scroll(function(){
		if($(this).scrollTop() > 275){
			$("#return-top").fadeIn(500);
		}else{
			$("#return-top").fadeOut(300);
		}
	});
	$("#return-top").click(function(){
		$("html,body").animate({scrollTop: "0px"}, 500);
	});

	/*小于680px的设备*/
	var isShowNav = false;     //菜单是否显示
	var isShowSoso = false;    //搜索是否显示
	$("#ht-nav").click(function(){
		if(isShowSoso){
			$("#soso").parent().next().slideUp(300);
			isShowSoso = false;
		}
		
		if(!isShowNav){
			$(this).next().animate({left:0},500);
			isShowNav = true;
		}else{
			$(this).next().animate({left:"-103%"},500);
			isShowNav = false;
		}
	});

	$("#soso").click(function(){
		if(isShowNav){
			$(".ht-nav-ul").animate({left:"-103%"},0);
			isShowNav = false;
		}
		if(!isShowSoso){
			$(this).parent().next().slideDown(300);
			isShowSoso = true;
		}else{
			$(this).parent().next().slideUp(300);
			isShowSoso = false;
		}
	});
});