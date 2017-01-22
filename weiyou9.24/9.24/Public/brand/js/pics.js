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
	$(".pics_l img").click(function(){
		var picsrc=$(this)[0].src;
		// console.log(picsrc);
		$(".tanpic").show();
        $(".changepic img").attr("src",picsrc);
	});
	$(".pics_c img").click(function(){
		var picsrc=$(this)[0].src;
		// console.log(picsrc);
		$(".tanpic").show();
        $(".changepic img").attr("src",picsrc);
	});
	$(".pics_r img").click(function(){
		var picsrc=$(this)[0].src;
		// console.log(picsrc);
		$(".tanpic").show();
        $(".changepic img").attr("src",picsrc);
	});
	$(".tanpic_close").click(function(){
		$(".tanpic").hide();
	});
	$(".changepic img").click(function(){
		$(".tanpic").hide();
	});
});