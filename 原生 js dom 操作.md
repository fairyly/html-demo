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

### createDocumentFragment
本方法用来创建一个 DocumentFragment ，也就是文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，大量操作DOM时用它可以大大提升性能。

- 假设现有一题目，要求给ul添加10000个li，我们先用最简单的拼接字符串的方式来实现：
```
<ul id="ul"></ul>
<script>
(function()
{
    var start = Date.now();
    var str = '';
    for(var i=0; i<10000; i++) 
    {
        str += '<li>第'+i+'个子节点</li>';
    }
    document.getElementById('ul').innerHTML = str;
    console.log('耗时：'+(Date.now()-start)+'毫秒'); // 44毫秒
})();
</script>
```
- 再换逐个append的方式，不用说，这种方式效率肯定低：
```
<ul id="ul"></ul>
<script>
(function()
{
    var start = Date.now();
    var str = '', li;
    var ul = document.getElementById('ul');
    for(var i=0; i<10000; i++)
    {
        li = document.createElement('li');
        li.textContent = '第'+i+'个子节点';
        ul.appendChild(li);
    }
    console.log('耗时：'+(Date.now()-start)+'毫秒'); // 82毫秒
})();
</script>
```

- 最后再试试文档碎片的方法，可以预见的是，这种方式肯定比第二种好很多，但是应该没有第一种快：
```
<ul id="ul"></ul>
<script>
(function()
{
    var start = Date.now();
    var str = '', li;
    var ul = document.getElementById('ul');
    var fragment = document.createDocumentFragment();
    for(var i=0; i<10000; i++)
    {
        li = document.createElement('li');
        li.textContent = '第'+i+'个子节点';
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    console.log('耗时：'+(Date.now()-start)+'毫秒'); // 63毫秒
})();
</script>
```

### 节点修改API
- appendChild
这个其实前面已经多次用到了，语法就是：
```
parent.appendChild(child);
```
它会将child追加到parent的子节点的最后面

- insertBefore
将某个节点插入到另外一个节点的前面，语法：
```
parentNode.insertBefore(newNode, refNode);
```
这个API个人觉得设置的非常不合理，因为插入节点只需要知道newNode和refNode就可以了，parentNode是多余的，所以jQuery封装的API就比较好：

```
newNode.insertBefore(refNode); // 如 $("p").insertBefore("#foo");
```

所以切记不要把这个原生API和jQuery的API使用方法搞混了！为了加深理解，这里写一个简单的例子：
```
<div id="parent">
    我是父节点
    <div id="child">
        我是旧的子节点
    </div>
</div>
<input type="button" id="insertNode" value="插入节点" />
<script>
var parent = document.getElementById("parent");
var child = document.getElementById("child");
document.getElementById("insertNode").addEventListener('click', function()
{
    var newNode = document.createElement("div");
    newNode.textContent = "我是新节点";
    parent.insertBefore(newNode, child);
}, false);
</script>
```

关于第二个参数：

refNode是必传的，如果不传该参数会报错；  
如果refNode是undefined或null，则insertBefore会将节点添加到末尾；

- removeChild
removeChild用于删除指定的子节点并返回子节点，语法：
```
var deletedChild = parent.removeChild(node);
```

deletedChild指向被删除节点的引用，它仍然存在于内存中，可以对其进行下一步操作。另外，如果被删除的节点不是其子节点，则将会报错。  
一般删除节点都是这么删的：
```
function removeNode(node)
{
    if(!node) return;
    if(node.parentNode) node.parentNode.removeChild(node);
}
```

- replaceChild
replaceChild用于将一个节点替换另一个节点，语法：
```
parent.replaceChild(newChild, oldChild);
```

## 节点关系API
- 父关系API
  - parentNode ：每个节点都有一个parentNode属性，它表示元素的父节点。Element的父节点可能是Element，Document或DocumentFragment；
  - parentElement ：返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element元素，如果不是，则返回null；
- 子关系API
  - children ：返回一个实时的 HTMLCollection ，子节点都是Element，IE9以下浏览器不支持；
  - childNodes ：返回一个实时的 NodeList ，表示元素的子节点列表，注意子节点可能包含文本节点、注释节点等；
  - firstChild ：返回第一个子节点，不存在返回null，与之相对应的还有一个 firstElementChild ；
  - lastChild ：返回最后一个子节点，不存在返回null，与之相对应的还有一个 lastElementChild ；
- 兄弟关系型API
  - previousSibling ：节点的前一个节点，如果不存在则返回null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
  - nextSibling ：节点的后一个节点，如果不存在则返回null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。
  - previousElementSibling ：返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。
  - nextElementSibling ：返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。


## 元素属性型API
- setAttribute
给元素设置属性：
```
element.setAttribute(name, value);
```
- getAttribute
getAttribute返回指定的特性名相应的特性值，如果不存在，则返回null：
```
var value = element.getAttribute("id");
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
- https://blog.csdn.net/hj7jay/article/details/53389522
