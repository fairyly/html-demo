// JavaScript Document
	var demoArr = [
		{title:'Js',author:'作者：鹰博空',date:'2016.01.03',desc:'3D拖拽旋转相册',src:'demo/3Ddrag/index.html',img:'demo/3Ddrag/index.png'},
		{title:'HTML',author:'作者：鹰博空',date:'2015.12.5',desc:'div+css制作的哆啦A梦',src:'demo/Doraemon/Doraemon.html',img:'demo/Doraemon/Doraemon.png'},
		{title:'HTMl',author:'作者：鹰博空',date:'2015.12.15',desc:'html+jQuery制作轮播图',src:'demo/hnhwly/hnhwly.html',img:'demo/hnhwly/hnhwly.png'},
		{title:'HTML',author:'作者：鹰博空',date:'2015.11.29',desc:'HTML制作静态仿京东网页',src:'demo/JD/index.html',img:'demo/JD/JD.png'},
	];




$(function(){
	init();
	drag();
	
});

function init(){
	
	var num = 5*5*5;
	
	for( var i = 0; i < num; i++ ){
		var $Li = $("<li class='elements'>"+
						"<div class='e-titl'>Fly</div>"+
						"<div class='e-time'>2026.06.08</div>"+
						"<div class='e-index'></div>"+
					"</li>");
		var x = (Math.random() - 0.5)*5000,
			y = (Math.random() - 0.5)*5000,
			z = (Math.random() - 0.5)*5000;
		$Li.css({
			'transform' : 'translate3d( '+ x +'px,'+ y +'px,'+ z +'px)'
		});
		$("#wrapper").append($Li);	
	};

	
	setTimeout(function(){
		Table();
	} , 300);
	$('#styleBtn li').click(function(){
		var index = $(this).index();
		switch ( index )
		{
			case 0:
				Table();
				break;
			case 1:
				Helix();
				break;
			case 2:
				Grid();
				break;
		}
	});
	
	//弹出层
	(function(){
		var $mainLi = $('#wrapper li');
		var $show = $('#show');
		var dl =  demoArr.length;
		$("#wrapper li").each(function(i) {
			if( i < dl){
				$(this).find('.e-titl').html(demoArr[i].title);
				$(this).find('.e-time').html(demoArr[i].date);
				$(this).find('.e-index').html(i+1);
			}	
		});
			
		$mainLi.click(function(ev){
			var _index = $(this).index();
			$show.find('.s-title').html(demoArr[_index].title);
			$show.find('.s-author').html(demoArr[_index].author);
			$show.find('.s-dec').html(demoArr[_index].desc);
			$show.find('.s-img').attr( 'src' ,demoArr[_index].img);
			$show.find('.s-ht').attr( 'href' ,demoArr[_index].src);
			
			
			ev = ev || window.event;
			$show.fadeIn(1000).css({
				'transform' : 'rotateY(0deg)scale(1)'
			});
			ev.stopPropagation();
		});
		$(document).click(function(){
			$show.fadeOut(1000,function(){
				$(this).css({
					'transform' : 'rotateY(0deg) scale(1.5)'
				});
			}).css({
				'transform' : 'rotateY(180deg) scale(0.1)'
			});
		});
		$show.click(function(ev){
			
			var Src = $show.find('.s-ht').attr('href');
			
			$('#wrap').animate({
				'marginLeft' : '-100%'
			},1000,function(){
				$show.css({
					'transform' : 'rotateY(0deg) scale(1.5)',
					display : 'none'
				});
			});
			$('#frame').show().animate({
				left : 0
			},1000).find('iframe').attr('src' , Src);
			ev.stopPropagation();
		});
		$('#back').click(function(ev){
			$('#wrap').animate({
				'marginLeft' : 0
			},1000);
			$('#frame').show().animate({
				left :'100%'
			},1000);
			ev.stopPropagation();
		});
	})();
};

function Table(){
	var tX = 160 , tY = 200;
	var firstX = -9*tX + 60;
	var firstY = -4*tY;
	var arr = [
		{x:firstX,y:firstY},
		{x:firstX+17*tX,y:firstY},
		{x:firstX , y:firstY+tY },
		{x:firstX+tX , y:firstY+tY},
		{x:firstX+12*tX , y:firstY+tY },
		{x:firstX+13*tX , y:firstY+tY },
		{x:firstX+14*tX , y:firstY+tY },
		{x:firstX+15*tX , y:firstY+tY },
		{x:firstX+16*tX , y:firstY+tY },
		{x:firstX+17*tX , y:firstY+tY },
		{x:firstX , y:firstY+tY*2 },
		{x:firstX+tX , y:firstY+tY*2},
		{x:firstX+12*tX , y:firstY+tY*2 },
		{x:firstX+13*tX , y:firstY+tY*2 },
		{x:firstX+14*tX , y:firstY+tY*2 },
		{x:firstX+15*tX , y:firstY+tY*2 },
		{x:firstX+16*tX , y:firstY+tY*2 },
		{x:firstX+17*tX , y:firstY+tY*2 }
	];
	$('#wrapper li').each(function(i){
		var x , y;
		if ( i < 18 )
		{
			x = arr[i].x;
			y = arr[i].y;
		}else
		{
			var iX = (i+18) % 18;
			var iY = parseInt((i+18)/18) + 1;
			x = firstX+iX*tX;
			y = firstY+iY*tY;
		}
		$(this).css({
			transform : 'translate('+x+'px,'+y+'px)'
		});
	});
};



function Helix(){
	
	var tY = 10;
	var roY = 10;
	
	var firstY = -Math.floor($("#wrapper li").length/2)*tY;
	
	$("#wrapper li").each(function(i){
		$(this).css({
			'transform':'rotateY('+ roY*i +'deg) translateY( ' + (firstY + tY*i) + 'px) translateZ( '+ 1000 +'px)'
		});
	});
};

function Grid(){
	var tX = 300,
		tY = 300,
		tZ = 600; //间隔
	
	var firstX = -2*tX,  	//第一个li水平偏移量
		firstY = -2*tY,		//第一个li垂直偏移量
		firstZ = -2*tZ;		//第一个li Z轴偏移量
		
	$("#wrapper li").each(function(i) {
		var iX = (i % 25) % 5,
			iY = parseInt((i%25) / 5),
			iZ = parseInt(i/25);
			
		$(this).css({
			'transform' : 'translate3d( '+ (firstX + iX*tX) +'px,'+ (firstY + iY*tY) +'px,'+ (firstZ + iZ*tZ) +'px)'
		});
    });
};



function drag(){
	var nowX , lastX , minusX = 0 , nowY , lastY , minusY = 0 , tZ = -2000;
	var roY = 0 , roX = 0;
	var timer1 , timer2;
	
	$(document).mousedown(function(ev){
		ev = ev || window.event;
		lastX = ev.clientX;
		lastY = ev.clientY;
		
		$(this).on("mousemove",function(ev){
			ev = ev || window.event;
			nowX = ev.clientX;
			nowY = ev.clientY;
			
			minusX = nowX - lastX;
			minusY = nowY - lastY;
			
			roY += minusX*0.2;
			roX -= minusY*0.2;
			
			$("#wrapper").css({
				'transform' : '  translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'	
			});
			
			lastX = nowX; // 存放前一点的x坐标
			lastY = nowY;
			
		});
	}).mouseup(function(){
		$(this).off('mousemove');
		
		timer1 = setInterval(function(){
			minusX *= 0.95;
			minusY *= 0.95;
			
			if(Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5){
				clearInterval(timer1);	
			};
			
			roY += minusX*0.2;
			roX -= minusY*0.2;
			
			$("#wrapper").css({
				'transform' : '  translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'	
			});
		}, 13);
		
	}).mousewheel(function(e , d){
		e = e || window.event;
		roY += minusX*0.2;
		roX -= minusY*0.2;
		tZ += d*80;
		
		tZ = Math.min(0 , tZ);
		tZ = Math.max(-6000 , tZ);
		
		$("#wrapper").css({
			'transform' : '  translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'	
		});
		
		timer2 = setInterval(function(){
			d *= 0.85;
			
			if ( Math.abs(d) < 0.01 ){
					clearInterval( timer2 );
			}
			tZ += d*80;
			tZ = Math.min(0,tZ); // Math.min()  取参数里面最小的
			tZ = Math.max(-6000,tZ); // Math.max()  …… 最大
				// -6000 < tZ < 0
			$('#main').css({
					'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
			});	
		},13);
	});
};
