# 前端人脸识别框架

blog: 
  - http://refined-x.com/2017/09/06/%E7%BA%AF%E5%89%8D%E7%AB%AF%E5%AE%9E%E7%8E%B0%E4%BA%BA%E8%84%B8%E8%AF%86%E5%88%AB-%E6%8F%90%E5%8F%96-%E5%90%88%E6%88%90/
  - https://www.cnblogs.com/cgy96/p/6149349.html

Tracking.js是使用js封装的一个框架，使用起来需要自己配置许多的东西，略显复杂

JqueryFaceDetection是使用jquery封装的框架，只留下一个接口，比较方便

* Tracking.js:https://github.com/eduardolundgren/tracking.js/  
  https://trackingjs.com/

```
Tracking.js需要先引入tracking-min.js，然后根据你的需求在选择性的引入eye-min.js,face-min.js,mouth-min.js。
// tracking.ObjectTracker()接受数组参数将你想要标记的对象分类（比如脸部整体、眼睛、鼻子、嘴巴等）。
        // setStepSize()规定用来标记的方框的步长。
        // 我们把要标记的对象和track事件进行绑定，一旦我们要标记的对象完成初始化，就会触发track事件。
        // 数据（Data）保存在对象数组列表中，其中的值是每一个标记对象的长、宽以及x、y坐标。
        window.onload = function () {
            var img = document.getElementById('img');
            var tracker = new tracking.ObjectTracker(['face']); // Based on parameter it will return an array.
            // tracker.setStepSize(1.7);
            tracking.track('#img', tracker);
            tracker.on('track', function (event) {
                if (event.data.length === 0) {
                    alert("无人脸")
                } else {
                    event.data.forEach(function (rect) {
                     // console.log(event)
                        console.log(rect)
                        draw(rect.x, rect.y, rect.width, rect.height);
                     //  alert("有人脸")
                    });
                }
            });
            //画方框
            function draw(x, y, w, h) {
                var rect = document.createElement('div');
                document.querySelector('.imgContainer').appendChild(rect);
                rect.classList.add('rect');
                rect.style.width = w + 'px';
                rect.style.height = h + 'px';
                rect.style.left = (img.offsetLeft + x) + 'px';
                rect.style.top = (img.offsetTop + y) + 'px';
            };
        };
```

* JqueryFaceDetection: https://github.com/jaysalvat/jquery.facedetection  
  http://facedetection.jaysalvat.com/
```
$(function () {
    $('#img').faceDetection({
        complete: function (faces) {
            if (faces.length == 0) { //说明没有检测到人脸
                alert("无人脸")
            } else {
                for (var i in faces) {
                    draw(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
                }
            }
        },
        error: function (code, message) {
            alert("complete回调函数出错")
        }
    })
})
```
