$(function(){
	var timer;  //定时器
	var curIndex = 0; //当前索引
	var init = false;  //初始化
	function handleScroll(){
		if(!init)
		{
			curIndex = 1;
			init=true;
		}
		timer = setInterval(function(){
			curIndex = curIndex > 2?0:curIndex;
			showPic(curIndex++);
		},2000);	
	}
	/*自动转换*/
	function showPic(curIndex){
		var prevIndex = ( curIndex - 1 < 0) ? 2:(curIndex - 1);
		var nextIndex = (curIndex + 1 > 2) ? 0:(curIndex + 1);
		//console.log(prevIndex+","+curIndex+","+nextIndex);
		$("#lunbo-img-ul").children().eq(curIndex).animate({left:"0px",zIndex:10},300);
		$("#lunbo-img-ul").children().eq(prevIndex).animate({left:-680+"px",zIndex:0},300);
		$("#lunbo-img-ul").children().eq(nextIndex).animate({left:680+"px",zIndex:0},0);
		$("#control-ul").children().eq(curIndex).css("backgroundColor","#FF6600")
		.siblings().css("backgroundColor","#DDDDDD");
	}
	handleScroll();

	/*焦点控制*/
	function controlPic(picIndex){
		var prevIndex = (picIndex - 1 < 0) ? 2:(picIndex - 1);
		var nextIndex = (picIndex + 1 > 2) ? 0:(picIndex + 1);
		$("#lunbo-img-ul").children().eq(picIndex).animate({left:"0px",zIndex:10},300);
		$("#lunbo-img-ul").children().eq(prevIndex).animate({left:-680+"px",zIndex:0},0);
		$("#lunbo-img-ul").children().eq(nextIndex).animate({left:680+"px",zIndex:0},0);
	}

	$("#control-ul,#lunbo-img-ul").on({
		mouseover:function(){
			clearInterval(timer);
		},
		mouseleave:function(){
			timer = setInterval(function(){
				curIndex = curIndex > 2?0:curIndex;
				showPic(curIndex++);
			},2000);
		}
	})
	.filter("#control-ul")
	.children().each(function(){
		$(this).on({
			mouseover:function(){
				$(this).css("backgroundColor","#FF6600")
				.siblings().css("backgroundColor","#DDDDDD");
				clearInterval(timer);
				curIndex = $(this).index()+1;  //鼠标离开控制区域时自动播放下一张
				controlPic($(this).index());
			}
		});
	});
})