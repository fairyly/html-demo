$(function()
{
	var scrollTimer;
	$(".scroll_box_img2").html($(".scroll_box_img").html());
	function scrollAuto()
	{
		if($("#scrollbox").scrollLeft() >= ($(".scroll_box_img").width()+940))
		{
			$("#scrollbox").scrollLeft(0);
		}
		else
		{
			$("#scrollbox").scrollLeft($("#scrollbox").scrollLeft()+1);
		}
	}
	scrollTimer = setInterval(scrollAuto,20);
	$("#scrollbox>div").on({
		mouseover:function()
		{
			clearInterval(scrollTimer);
		},
		mouseout:function()
		{
			scrollTimer = setInterval(scrollAuto,20);
		}
	});

})