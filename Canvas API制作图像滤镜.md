# Canvas API制作图像滤镜

```
HTML 5中的Canvas API可以被用于对一幅图像制作一个滤镜。我们所需要做的就是在一个canvas元素中绘制一幅图像,获取该canvas元素中的所有像素,并且对这些像素添加滤镜效果。你可以将添加滤镜效果后的所有像素输出到一个新的canvas元素或原canvas元素中。
接下来,让我们看一下如何实现这一处理。
处理像素
首先,我们需要在页面上的canvas元素中绘制一幅图像,代码如下所示。
<!DOCTYPE html>
<html>  
<head>    
<meta charset="UTF-8">    
<script>
function draw(){
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext('2d');
    var image = new Image();
    image.src = "images/sl.jpg"; 
    image.onload = function () 
    {
       canvas.width=image.width;
       canvas.height=image.height;
       ctx.drawImage(image,0,0); 
    }       
}
</script>
</head>  
<body onload="draw()">
<canvas id="canvas"></canvas>
</body>
</html>
绘制图像
制作简单滤镜
接下来,我们对绘制完毕的图像制作一些简单的滤镜效果。首先,我们将该图像转换为黑白图像,代码如下所示。
function grayscale() {
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext('2d');
    var pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        var v = 0.2126*r + 0.7152*g + 0.0722*b;
        d[i] = d[i+1] = d[i+2] = v;
    }
    ctx.putImageData(pixels,0,0);
}
制作黑白滤镜
对图像添加一个亮度滤镜的处理也是非常简单,其代码如下所示。
function brightness(){
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext('2d');
    var pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
         d[i] += 100;
         d[i+1] +=100;
         d[i+2] += 100;
    }
    ctx.putImageData(pixels,0,0);
}
制作亮度滤镜
制作高级滤镜
在对进行复杂的图像操作时,仅仅使用如上所示的简单滤镜是不够的。大多数时候,我们需要制作诸如图像模糊(blur),图像锐化(sharpen)、浮雕效果(emboss)等高级滤镜。实现这些高级滤镜的基本原理是使用canvas元素中的像素数组与一个用于制作滤镜的变换矩阵数组进行相乘运算,然后将经过运算后的像素数组输出到canvas元素中。
接下来,我们首先来看如何制作一个图像锐化滤镜,为了实现该滤镜,我们使用一个3*3的矩阵数组,如下所示。
[0, -1, 0,
-1, 10, -1,
0, -1, 0]
实现该滤镜的代码如下所示：
function sharpenFilter() {
    var weights=[0,-1,0,
                 -1,10,-1,
                 0,-1,0];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext('2d');
    var pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
    var src= pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    var w = sw;
    var h = sh;

    var dst = pixels.data;
    var opaque=1;
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
        for (var x=0; x<w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y*w+x)*4;
            //将canvas元素中的像素数组与变换矩阵数组进行相乘运算
            var r=0, g=0, b=0, a=0;
            for (var cy=0; cy<side; cy++) {
                for (var cx=0; cx<side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy*sw+scx)*4;
                        var wt = weights[cy*side+cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff+1] * wt;
                        b += src[srcOff+2] * wt;
                        a += src[srcOff+3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
        }
    }
    //将经过运算后的像素数组输出到canvas元素中
    ctx.putImageData(pixels,0,0);
};
制作锐化滤镜
通过同样方法,我们也可以制作一个图像模糊滤镜,为了实现该滤镜,我们使用一个3*3的矩阵数组,如下所示。
[1/9,1/9,1/9,
1/9,1/9,1/9,
1/9,1/9,1/9]
实现该滤镜的代码同上所示,只需修改变换矩阵即可。
制作模糊滤镜
本文小结
本文中介绍了如何通过HTML 5中的Canvas API制作常用的图像滤镜。如果想更多了解Canvas API的知识,可以参阅笔者所著《HTML 5与CSS 3权威指南》。

```
