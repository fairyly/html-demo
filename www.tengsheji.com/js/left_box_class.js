// JavaScript Document


$(function(){
	$(".menu_class_a_list ul li:has(div)").hover(function(){
		$(this).children(".pull_down2").stop(true,true).animate({"left": "0"}, 100);
		},function(){
		$(this).children(".pull_down2").stop(true,true).animate({"left": "-150"}, 100);
		})
		
		
})
$(function(){
	$(".menu_class_a_list2 ul .li2:has(div)").hover(function(){
		$(this).children(".pull_down2").stop(true,true).animate({"left": "0"}, 200);
		},function(){
		$(this).children(".pull_down2").stop(true,true).animate({"left": "-190"}, 100);
		})
		
		
})

$(function(){
	$(".right_contact_img ul li:has(div)").hover(function(){
		$(this).children(".pull_down2").stop(true,true).animate({"right": "0"}, 300);
		},function(){
		$(this).children(".pull_down2").stop(true,true).animate({"right": "-201"}, 300);
		})
		
		
})


$(document).ready(function(){
	var move=$('#tbNav');
		
	var window_w = $(window).width();
	
	if(window_w>1000){move.show();}

$('#tbNavLi1').click( function () {$('html,body').animate({scrollTop: $('#num1').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi2').click( function () {$('html,body').animate({scrollTop: $('#num2').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi3').click( function () {$('html,body').animate({scrollTop: $('#num3').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi4').click( function () {$('html,body').animate({scrollTop: $('#num4').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi5').click( function () {$('html,body').animate({scrollTop: $('#num5').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi6').click( function () {$('html,body').animate({scrollTop: $('#num6').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi7').click( function () {$('html,body').animate({scrollTop: $('#num7').offset().top - 30 + 'px'},'slow');});
$('#tbNavLi8').click( function () {$('html,body').animate({scrollTop: $('#num8').offset().top - 30 + 'px'},'slow');});
		
});


$(function (){
	$(".menu_class_a_list .pull_down2").each(function(index){//each变例，每一个a标签
		$(this).mousedown(function(){//鼠标滑过a的时候式
			$("#container_menu .fe:eq("+index+")").animate({"min-height": "260px"}, 300)
			$("#container_menu .fe:eq("+index+")").css("display","table")//给对应的a添加样式hover
		})
	})
})
