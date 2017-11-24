# 鼠标指针锁定API

`Pointer Lock API`有哪些具体API名称？
目前，`Pointer Lock API`共支持3个属性，2个方法和2个事件，分别如下：

3个属性
```
Document.pointerLockElement
Document.onpointerlockchange
Document.onpointerlockerror
```
2个方法
```
Element.requestPointerLock()
Document.exitPointerLock()
```
2个事件
```
pointerlockchange
pointerlockerror
```
其中，2个事件和其中2个属性是一一对应的，因此，我们实际上需要了解的知识点是下面这些：
```
Document.pointerLockElement，以及Element.requestPointerLock()，Document.exitPointerLock()以及pointerlockchange和pointerlockerror事件。
```

1. Document.pointerLockElement

指当前页面触发鼠标无限滚动的元素，通常使用语法为：

`var element = document.pointerLockElement;`
返回的是一个DOM元素对象，如果当前页面是非鼠标锁定状态，则返回值是null。

2. Element.requestPointerLock()

可以让页面进入鼠标锁定状态（鼠标直接消失），鼠标无限滚动，坐标无限变化。通常使用语法为：
```
var element.requestPointerLock();
```

3. Document.exitPointerLock()

让页面从鼠标锁定状态退出，通常使用语法为：
```
document.exitPointerLock();
```
浏览器默认支持按下ESC键退出鼠标锁定状态，但是用户有时候更习惯于点击取消等，此时就可以使用document.exitPointerLock()进行设置。

4. pointerlockchange事件

当页面鼠标锁定状态改变的时候触发。例如：
```
document.addEventListener('pointerlockchange', function () {
    // ...
}, false);
```
5. pointerlockerror事件

当页面鼠标锁定失败的时候触发。例如当你试图同时锁定同一个页面的多个<iframe>时候，就会触发这个出错事件。


## demo
```
CSS代码：
.box {
    line-height: 400px;
    text-align: center;
    position: relative;
    perspective: 200px;
}
.box img {
    vertical-align: middle;
}
HTML代码：
<div class="box">
    <img id="image" src="mm1.jpg">
</div>
JS代码：
var eleImage = document.getElementById('image');
if (eleImage) {
    // 起始值
    var moveX = 0, moveY = 0;
    // 图片无限变换的方法
    var rotate3D = function (event) {
        moveX = moveX + event.movementX;
        moveY = moveY + event.movementY;

        eleImage.style.transform = 'rotateX(' + moveY + 'deg) rotateY(' + moveX + 'deg)';  
    };

    // 触发鼠标锁定
    eleImage.addEventListener('click', function () {
        eleImage.requestPointerLock();
    });

    // 再次点击页面，取消鼠标锁定处理
    document.addEventListener('click', function () {
        if (document.pointerLockElement == eleImage) {
            document.exitPointerLock();
        } 
    });

    // 检测鼠标锁定状态变化
    document.addEventListener('pointerlockchange', function () {
        if (document.pointerLockElement == eleImage) {
            document.addEventListener("mousemove", rotate3D, false);
        } else {
            document.removeEventListener("mousemove", rotate3D, false);
        }
    }, false);
}
```
