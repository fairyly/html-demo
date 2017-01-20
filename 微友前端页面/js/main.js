$(document).ready(function(){
  /*底部js*/
 function footerb(){
      $(".footer a").eq(0).css({"background":"url(./images/aa1.png) center 12px no-repeat","backgroundSize":"18px auto"});
	  $(".footer a").eq(1).css({"background":"url(./images/aa3.png) center 13px no-repeat","backgroundSize":"20px auto"});
	  $(".footer a").eq(2).css({"background":"url(./images/aa5.png) center 11px no-repeat","backgroundSize":"18px auto"});
	  $(".footer a").eq(3).css({"background":"url(./images/vip1.png) center 10px no-repeat","backgroundSize":"20px auto"});
	  $(".footer a").eq(4).css({"background":"url(./images/my1.png) center 12px no-repeat","backgroundSize":"17px auto"}); 
      $(".footer a").each(function(){
	  $(".footer a").click(function(){
		   $(".footer a").children("span").css("color","black");
		   $(this).children("span").css("color","#3CAF36")
	    })
      })
  } 
  footerb();
  var bsize="20px auto";
    $(".footer a").eq(0).click(function(){
	   footerb();
	   $(this).css({"background":"url(./images/aa2.png) center 12px no-repeat","backgroundSize":"18px auto"});
	   
   }) 
   $(".footer a").eq(1).click(function(){
	   footerb();
	   $(this).css({"background":"url(./images/aa4.png) center 13px no-repeat","backgroundSize":bsize});
       $("#main").children().css("display","none");
       $("#main #darenxiu").css("display","block");
 })
    $(".footer a").eq(2).click(function(){
	   footerb();
	   $(this).css({"background":"url(./images/aa6.png) center 11px no-repeat","backgroundSize":"17px auto"});
       $("#main").children().css("display","none");
       $("#main .list9").css("display","block");
  })
   $(".footer a").eq(3).click(function(){
	   footerb();
	   $(this).css({"background":"url(./images/vip2.png) center 10px no-repeat","backgroundSize":"20px auto"});
       $("#main").children().css("display","none");
       $("#main .vip_content").css("display","block");
   })
    $(".footer a").eq(4).click(function(){
	   footerb();
	   $(this).css({"background":"url(./images/my2.png) center 12px no-repeat","backgroundSize":"17px auto"});
       $("#main").children().css("display","none");
       $("#main .my_center").css("display","block");
   })
    $(".list9>a").eq(0).click(function(){
	   footerb();
	   $(".footer a").eq(1).css({"background":"url(./images/aa4.png) center 12px no-repeat","backgroundSize":bsize});
       $(".footer a").children("span").css("color","black");
	   $(".footer a").eq(1).children("span").css("color","#3CAF36")
	   $("#main").children().css("display","none");
       $("#main #darenxiu").css("display","block");
	})
	$(".list9>a").eq(2).click(function(){
	   footerb();
	   $(".footer a").eq(4).css({"background":"url(./images/my2.png) center 11px no-repeat","backgroundSize":"18px auto"});
       $(".footer a").children("span").css("color","black");
	   $(".footer a").eq(4).children("span").css("color","#3CAF36")
	   $("#main").children().css("display","none");
       $("#main .my_center").css("display","block");
	})
	$(".list9>a").eq(5).click(function(){
	   footerb();
	   $(".footer a").eq(3).css({"background":"url(./images/vip2.png) center 10px no-repeat","backgroundSize":"20px auto"});
	   $(".footer a").children("span").css("color","black");
	   $(".footer a").eq(3).children("span").css("color","#3CAF36")
       $("#main").children().css("display","none");
       $("#main .vip_content").css("display","block");
	})
  })
/*九宫格宽度*/
 $(document).ready(function(){
    var h=window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
	function gong9(){
		var gongwidth=$(".list9").width();
		var g_a=(gongwidth-2.5)/3;
		$(".list9>a").css({"width":g_a,"height":g_a});
		$(".list9>a>img").css("marginTop",(g_a-32)/2-10);
		for(var i=2;i<=$(".list9 a").length;){
			$(".list9>a").eq(i).css("marginRight","0px");
		    i=i+3;
		}
		$(".list9").css("height",gongwidth);
		$(".vipqu .list9").css("height",gongwidth*0.7)
	}
	gong9();
	$(window).resize(function(){
		gong9();
		$("#main").css("marginBottom","70px")
	})
})  
  
/*VIP特权下面的连接图片大小*/
     $(document).ready(function(){
		 $(".vip_content_huiyuan a").css("backgroundSize","100%")
	     /*点击加群*/
		 $(".w_plus").click(function(){
			 $(".weixinq_plus").slideToggle(400);
		 })
		 for(var i=0;i<=4;i++){
			$(".darenxiu_box_content p").find("span").eq(i).css("margin-right","5px")  
		 }
		 
	 })
	 

	 $(document).ready(function(){
		$(".darenxiu_box_a_a a").click(function(){
			$(".darenxiu_box_a").css("display","none");
		})
		$(".darenxiu_box").click(function(){
			$(".darenxiu_box_a").css("display","block");
		})
		$(".xiaoxi_find input").focus(function(){
			$(this).parent("p").css({
				"border":"1px solid #3CAF36",
				"boxShadow":"0px 0px 3px #3CAF36",
				"borderRadius":"3px"
			})
			$(".xiaoxi_find .find_button").animate({
				 marginRight:"1%"
			},200)
		})
		$(".xiaoxi_find input").blur(function(){
			$(this).parent("p").css({
				"border":"1px solid #E9E9E9",
				"boxShadow":"0px 0px 0px #E9E9E9",
				"borderRadius":"3px"
			})
			$(".xiaoxi_find .find_button").animate({
				 marginRight:"-27%"
			
			},800)
		})
		function liaot(){
			var liaotHeight=$(".liaotian_left p").height();
			$(".liaotian_left").css("height",liaotHeight+30);
			var liaotHeighta=$(".liaotian_right p").height();
			$(".liaotian_right").css("height",liaotHeight+30);
		}
		liaot();
		/*地区选择*/
		$("#f_find a").eq(1).click(function(){
			$(".address_d").css("display","none");
		})
		$("#adds").click(function(){
			$(".address_d").css("display","block");
		})
	 })
  $(document).ready(function(){
	setInterval (function () {
	   $(".dirp_up").animate({opacity:"1",marginTop:"-20px"},1000);
	   $(".dirp_up").animate({opacity:"0",marginTop:"10px"},0)
	   $(".dirp_up").animate({opacity:"1",marginTop:"0px"},2000)
	},5000);   
  })
  
  $(document).ready(function(){
	setInterval (function () {
	   $(".f_tishi").animate({opacity:"1",width:"10px",height:"10px"},500);
	   $(".f_tishi").animate({opacity:"0.2",width:"4px",height:"4px"},500);
	   $(".f_tishi").animate({opacity:"0.5",width:"10px",height:"10px"},500);
	},400);   
  })