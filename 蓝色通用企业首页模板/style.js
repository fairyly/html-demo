$(function()
{
	// 头部滚动
	var curIndex=0;
	var timer;
	var init = false;
	var banpicChild = $("#banpic").children();
	handle();
	$("#control").find('li').on(
		{
			mouseover:function()
			{
				clearInterval(timer);
				curIndex = $(this).index();
				$(this).css("backgroundColor","#FF7600").siblings()
				.css("backgroundColor","#444444");
				banpicChild.siblings().hide().end().eq(curIndex).hide().fadeIn(500);
			}
		}).end().on("mouseleave",function()
		{
			curIndex++;
			handle();
		});

	function handle()
	{
		if(!init)
		{
			curIndex = 1;
			init=true;
		}
		timer = setInterval(function()
		{
			if(curIndex>2)
			{
				curIndex=0;
			}
			showPic(curIndex++);
		},2000);
	}
	function showPic(curIndex)
	{
		banpicChild.siblings().hide().end().eq(curIndex).hide().fadeIn(500);
		$("#control").find('li').eq(curIndex).css("backgroundColor","#FF7600")
		.siblings().css("backgroundColor","#444444");
	}

	// 荣誉资质 滚动
	var curIndex2 = 0;
	var timer2;
	var init2=false;
	var ryImgLi = $("#ry_scroll").children();
	handle2();
	$("#img_ctrl_list").children().on(
		{
			mouseover:function()
			{
				clearInterval(timer2);
				curIndex2 = $(this).index();
				$(this).css("backgroundColor","#FF7600").siblings()
				.css("backgroundColor","#FFFFFF").parent().prev()
				.text(ryImgLi.find("img").eq(curIndex2).attr("alt"));
				ryImgLi.siblings().hide().end().eq(curIndex2).hide().fadeIn(500);
			}
		}).end().on("mouseleave",function()
		{
			curIndex2++;
			handle2();
		});
	function handle2()
	{
		if(!init2)
		{
			curIndex2 = 1;
			init2=true;
		}
		timer2 = setInterval(function()
		{
			if(curIndex2>4)
			{
				curIndex2=0;
			}
			showPic2(curIndex2++);
		},2000);
	}
	function showPic2(curIndex2)
	{
		$("#img_ctrl_list").children().eq(curIndex2).css("backgroundColor","#FF7600")
		.siblings().css("backgroundColor","#FFFFFF").parent().prev()
		.text(ryImgLi.find("img").eq(curIndex2).attr("alt"));
		ryImgLi.siblings().hide().end().eq(curIndex).hide().fadeIn(500);
	}
})