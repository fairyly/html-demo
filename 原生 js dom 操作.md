# 原生 js dom 操作

常见的Node有 element，text，attribute，comment，document 等（所以要注意 节点 和 元素 的区别，元素属于节点的一种）。

## 节点查找API

- document.getElementById ：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个；

- document.getElementsByClassName ：根据类名查找元素，多个类名用空格分隔，返回一个 HTMLCollection 。注意兼容性为IE9+（含）。
  另外，不仅仅是document，其它元素也支持 getElementsByClassName 方法；

- document.getElementsByTagName ：根据标签查找元素， * 表示查询所有标签，返回一个 HTMLCollection 。

- document.getElementsByName ：根据元素的name属性查找，返回一个 NodeList 。

- document.querySelector ：返回单个Node，IE8+(含），如果匹配到多个结果，只返回第一个。

- document.querySelectorAll ：返回一个 NodeList ，IE8+(含）。

- document.forms ：获取当前页面所有form，返回一个 HTMLCollection ；

## 节点创建API
- 节点创建API主要包括` createElement 、 createTextNode 、 cloneNode 和 createDocumentFragment `四个方法。
### createElement
- 创建元素：
```
var elem = document.createElement("div");
elem.id = 'test';
elem.style = 'color: red';
elem.innerHTML = '我是新创建的节点';
document.body.appendChild(elem);
```

### createTextNode
- 创建文本节点：
```
var node = document.createTextNode("我是文本节点");
document.body.appendChild(node);
```

### cloneNode
- 克隆一个节点： node.cloneNode(true/false) ，它接收一个bool参数，用来表示是否复制子元素。
```
var from = document.getElementById("test");
var clone = from.cloneNode(true);
clone.id = "test2";
document.body.appendChild(clone);
```


## 设置标签的样式等方法 
- 对标签的样式设置使用.style
```
var box=document.getElementById("box");
box.style.width="100px";
box.style.backgroundColor="#ff00000"//带有段横线的属性要是用驼峰命名的方式。
```
- 设置标签的内容。 
```
box.innerHtml="哈哈";
```

## 参考资料
- 
