// 禁止选中
document.onselectstart = new Function("event.returnValue=false;");

// 获取元素相对于文档左侧和右侧的距离
function getPosition(node)
{
	var left = node.offsetLeft;
	var top = node.offsetTop;
	var parent = node.offsetParent;  //获取父元素
	while(parent != null)
	{
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {"left":left,"top":top};
}

window.onload = function()
{
	$("#main").draggable({ containment: 'parent' ,drag: setChoice}); //拖动
	var boxDiv = document.getElementById('box');//外层容器
	var mainDiv = document.getElementById('main');//选择层

	var rightMinDiv = document.getElementById("right-mid");
	var topDiv = document.getElementById("top");
	var leftMinDiv = document.getElementById("left-mid");
	var bottomDiv = document.getElementById("bottom");
	var leftTopDiv = document.getElementById("left-top");
	var rightTopDiv = document.getElementById("right-top");
	var leftBottomDiv = document.getElementById("left-bottom");
	var rightBottomDiv = document.getElementById("right-bottom");

	var mouseIsPress = false;    //鼠标是否按下
	var contact = "";   //表示被按下的触点

	// 鼠标按下事件
	rightMinDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "right-mid";
	}
	topDiv.onmousedown=function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "top";
	}
	leftMinDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "left-mid";
	}
	bottomDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "bottom";
	}
	leftTopDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "left-top";
	}
	rightTopDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "right-top";
	}
	leftBottomDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "left-bottom";
	}
	rightBottomDiv.onmousedown = function(e)
	{
		var e = e || window.event;
		e.stopPropagation();
		mouseIsPress = true;
		contact = "right-bottom";
	}

	// 鼠标松开事件
	window.onmouseup = function()
	{
		mouseIsPress = false;
	}

	// 鼠标移动事件
	window.onmousemove = function(e)
	{
		var e = e || window.event;
		if(mouseIsPress)
		{
			switch(contact)
			{
				case "right-mid":
					rightMinMove(e);
					break;
				case "top":
					topMove(e);
					break;
				case "left-mid":
					leftMidMove(e);
					break;
				case "bottom":
					bottomMove(e);
					break;
				case "left-top":
					leftMidMove(e);
					topMove(e);
					break;
				case "right-top":
					rightMinMove(e);
					topMove(e);
					break;
				case "left-bottom":
					leftMidMove(e);
					bottomMove(e);
					break;
				case "right-bottom":
					rightMinMove(e);
					bottomMove(e);
					break;
			}
		}
		setChoice();
		setPreview();
	};

	// 右边触点
	function rightMinMove(e)
	{
		var x = e.clientX;  //鼠标的x坐标，相对于文档
		// 不超出右边边界
		if(x > getPosition(boxDiv).left + boxDiv.offsetWidth)
		{
			x = getPosition(boxDiv).left + boxDiv.offsetWidth;
		}
		var addWidth = "";  //鼠标移动后选取框增加的宽度
		var widthBefore = mainDiv.clientWidth;  //选取框变化前之前的宽度
		addWidth = x - getPosition(mainDiv).left - widthBefore;
		mainDiv.style.width = addWidth + widthBefore + 'px';
	}

	// 上边触点
	function topMove(e)
	{
		var y = e.clientY;
		// 不超出上边边界
		if(y < getPosition(boxDiv).top)
		{
			y = getPosition(boxDiv).top;
		}
		var mainY = getPosition(mainDiv).top;
		var addHeight = mainY - y;
		var heightBefore = mainDiv.clientHeight;
		mainDiv.style.height = heightBefore + addHeight + 'px';
		mainDiv.style.top = mainDiv.offsetTop - addHeight + 'px';
	}

	//左边移动
	function leftMidMove(e)
	{
		var x = e.clientX;
		// 不超出左边边界
		if(x < getPosition(boxDiv).left)
		{
			x = getPosition(boxDiv).left;
		}
		var mainX = getPosition(mainDiv).left;
		var addWidth = mainX - x;   //增加的宽度
		mainDiv.style.width = mainDiv.clientWidth + addWidth +'px';
		mainDiv.style.left = mainDiv.offsetLeft - addWidth + 'px';
	}

	// 下边移动
	function bottomMove(e)
	{
		var y = e.clientY;
		// 不超出下边边界
		if(y > getPosition(boxDiv).top + boxDiv.offsetHeight)
		{
			y = getPosition(boxDiv).top + boxDiv.offsetHeight;
		}
		var mainY = getPosition(mainDiv).top;
		var addHeight = y - mainY - mainDiv.clientHeight;   //增加的高度
		mainDiv.style.height = mainDiv.clientHeight + addHeight +'px';
	}

	// 设置选取区域高亮
	function setChoice()
	{
		var img2 = document.getElementById("img2");

		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetWidth + mainDiv.offsetLeft;
		var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;

		img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}

	// 预览函数
	function setPreview()
	{
		var img3 = document.getElementById("img3");

		var top = mainDiv.offsetTop;
		var right = mainDiv.offsetWidth + mainDiv.offsetLeft;
		var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
		var left = mainDiv.offsetLeft;

		img3.style.top = -top + 'px';
		img3.style.left = -left + 'px';

		img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}
}