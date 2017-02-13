$(function(){
	// $(".con_main.swiper-slide").css("height","16.5rem");
	// $(".describe span").css({"font-size":"0.8rem",
	// "color": "#797676",
	// "margin-top":" 0px",
	// "width": "13rem",
	// "padding-bottom":"5px",
	// "display": "block",
 //    "overflow":"hidden", 
	// "white-space":"nowrap", 
	// "text-overflow":"ellipsis"});
	// var cw=document.documentElement.clientWidth;
	// var ch=document.documentElement.clientHeight;
	var cw=screen.width;
	var ch=screen.height;
	$(".tanpic").css("width",cw);
	$(".tanpic").css("height",ch);
	console.log(cw+','+ch);
	console.log("屏幕宽高为："+screen.width+"*"+screen.height);
	$(".pics_l img").click(function(){
		var picsrc=$(this)[0].src;
		// console.log(picsrc);
		console.log($($(this)[0]).attr('da-src'));
		$(".tanpic").show();
        $(".tanpic img").attr("src",picsrc);
	});
	$(".pics_c img").click(function(){
		var picsrc=$(this)[0].src;
		// console.log(picsrc);
		console.log($($(this)[0]).attr('da-src'));
		$(".tanpic").show();
        $(".tanpic img").attr("src",picsrc);
	});
	$(".pics_r img").click(function(){
		var picsrc=$(this)[0].src;
		// console.log(picsrc);
		console.log($(this)[0]);
		$(".tanpic").show();
        $(".tanpic img").attr("src",picsrc);
	});
	$(".tanpic_close").click(function(){
		$(".tanpic").hide();
	});
	$(".tanpic").click(function(){
		$(".tanpic").hide();
	});
	$(".changepic img").click(function(){
		$(".tanpic").hide();
	});
});