$(function() {
	$(".link .button").hover(
		function(){
			var title = $(this).attr("data");
			var position = $(this).position().left;
			$(".tip em").text(title);
			var dis = $(this).outerWidth()-$(".tip").outerWidth()>0?
				($(this).outerWidth()-$(".tip").outerWidth()) / 2:-($(".tip").outerWidth()-$(this).outerWidth()) / 2;
			$(".tip").stop(true,true).css("left",position+dis+15+"px").animate({
				opacity:"1",
				top:"183px"
			},300);
		},
		function(){
			$(".tip").stop(true,true).animate({
				opacity:"0",
				top:"120px"
			},300);
		}
	);
})