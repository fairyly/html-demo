# web 元素

阮一峰《JavaScript标准教程》：http://javascript.ruanyifeng.com/htmlapi/elements.html

* HTML元素的id属性的名字，会自动成为全局变量，指向该HTML元素
  - 已有全局变量名，这时id属性就不会自动变成全局变量
  - 默认的全局变量名（比如，history、location、navigator等），最好不要设为id属性的名字
* 以下HTML元素的name属性，也会成为全局变量  。
```
  - <applet>
  - <area>
  - <embed>
  - <form>
  - <frame>
  - <frameset>
  - <iframe>
  - <img>
  - <object>
```

* Form 元素（表单）
```
如果<form>元素带有name或者id属性，这个元素节点会自动成为window和document的属性，并且可以从document.forms上取到。<form name="myForm">节点用下面几种方法可以拿到。

window.myForm
document.myForm
document.forms.myForm
document.forms[n]
document.forms返回一个类似数组的对象（HTMLCollection的实例），包含了当前页面中所有表单（<form>元素）。HTMLCollection的实例都可以使用某个节点的id和name属性，取到该节点。

表单对象本身也是一个HTMLCollection对象的实例，它里面的各个子节点也可以用id属性、name属性或者索引值取到。举例来说，myForm表单的第一个子节点是<input type="text" name="address">，它可以用下面的方法取到。

document.forms.myForm[0]
document.forms.myForm.address
document.myForm.address
表单节点都有一个elements属性，包含了当前表单的所有子元素，所以也可以用下面的方法取到address子节点。

document.forms.myForm.elements[0]
document.forms.myForm.elements.address
表单之中，会有多个元素共用同一个name属性的情况。

<form name="myForm">
  <label><input type="radio" name="method" value="1">1</label>
  <label><input type="radio" name="method" value="2">2</label>
  <label><input type="radio" name="method" value="3">3</label>
</form>
上面代码中，三个单选框元素共用同一个name属性，这时如果使用这个name属性去引用子节点，返回的将是一个类似数组的对象。

document.forms.myForm.elements.method.length // 3
如果想知道，用户到底选中了哪一个子节点，就必须遍历所有的同名节点。

var methods = document.forms.myForm.elements.method;
var result;

for (var i = 0; i < methods.length; i++) {
  if (methods[i].checked) value = methods[i].value;
}
```

* images 元素
```
// 方法一：HTML5构造函数Image
var img1 = new Image();
img1.src = 'image1.png';
img1.alt = 'alt';
document.body.appendChild(img1);

// 方法二：DOM HTMLImageElement
var img2 = document.createElement('img');
img2.src = 'image2.jpg';
img2.alt = 'alt text';
document.body.appendChild(img2);

document.images[0].src
// image1.png
```
  - height属性，width属性
    这两个属性返回image元素被浏览器渲染后的高度和宽度。
  - naturalWidth属性，naturalHeight属性
    表示image对象真实的宽度和高度。
    ```
    myImage.addEventListener('onload', function() {
	      console.log('My width is: ', this.naturalWidth);
	      console.log('My height is: ', this.naturalHeight);
    });
    ```
* table元素
    ```
    insertRow()：在指定位置插入一个新行（tr）。
    deleteRow()：在指定位置删除一行（tr）。
    insertCell()：在指定位置插入一个单元格（td）。
    deleteCell()：在指定位置删除一个单元格（td）。
    createCaption()：插入标题。
    deleteCaption()：删除标题。
    createTHead()：插入表头。
    deleteTHead()：删除表头。
    
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (var i = 0; i <= 9; i++) {
      var rowcount = i + 1;
      tbody.insertRow(i);
      tbody.rows[i].insertCell(0);
      tbody.rows[i].insertCell(1);
      tbody.rows[i].insertCell(2);
      tbody.rows[i].cells[0].appendChild(document.createTextNode('Row ' + rowcount + ', Cell 1'));
      tbody.rows[i].cells[1].appendChild(document.createTextNode('Row ' + rowcount + ', Cell 2'));
      tbody.rows[i].cells[2].appendChild(document.createTextNode('Row ' + rowcount + ', Cell 3'));
    }
    
    table.createCaption();
    table.caption.appendChild(document.createTextNode('A DOM-Generated Table'));

    document.body.appendChild(table);
    ```
* audio元素，video元素
  - 以下事件按次序发生
  ```
  loadstart：开始加载音频和视频。
  durationchange：音频和视频的duration属性（时长）发生变化时触发，即已经知道媒体文件的长度。如果没有指定音频和视频文件，duration属性等于NaN。如果播放流媒体文件，没有明确的结束时间，duration属性等于Inf（Infinity）。
  loadedmetadata：媒体文件的元数据加载完毕时触发，元数据包括duration（时长）、dimensions（大小，视频独有）和文字轨。
  loadeddata：媒体文件的第一帧加载完毕时触发，此时整个文件还没有加载完。
  progress：浏览器正在下载媒体文件，周期性触发。下载信息保存在元素的buffered属性中。
  canplay：浏览器准备好播放，即使只有几帧，readyState属性变为CAN_PLAY。
  canplaythrough：浏览器认为可以不缓冲（buffering）播放时触发，即当前下载速度保持不低于播放速度，readyState属性变为CAN_PLAY_THROUGH。
  ```
  除了上面这些事件，audio元素和video元素还支持以下事件。
  
  ```
  事件	触发条件
  abort	播放中断
  emptied	媒体文件加载后又被清空，比如加载后又调用load方法重新加载。
  ended	播放结束
  error	发生错误。该元素的error属性包含更多信息。
  pause	播放暂停
  play	暂停后重新开始播放
  playing	开始播放，包括第一次播放、暂停后播放、结束后重新播放。
  ratechange	播放速率改变
  seeked	搜索操作结束
  seeking	搜索操作开始
  stalled	浏览器开始尝试读取媒体文件，但是没有如预期那样获取数据
  suspend	加载文件停止，有可能是播放结束，也有可能是其他原因的暂停
  timeupdate	网页元素的currentTime属性改变时触发。
  volumechange	音量改变时触发（包括静音）。
  waiting	由于另一个操作（比如搜索）还没有结束，导致当前操作（比如播放）不得不等待
  ```
