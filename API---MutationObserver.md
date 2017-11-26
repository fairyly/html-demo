# MutationObserver

提供了一种能在某个范围内的DOM树发生变化时作出适当反应的能力.该API设计用来替换掉在DOM3事件规范中引入的Mutation事件.

```
// Firefox和Chrome早期版本中带有前缀
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

// 选择目标节点
var target = document.querySelector('#some-id');
 
// 创建观察者对象
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
  });    
});
 
// 配置观察选项:
var config = { attributes: true, childList: true, characterData: true }
 
// 传入目标节点和观察选项
observer.observe(target, config);
 
// 随后,你还可以停止观察
observer.disconnect();
```


### 假设target为当前文档中某个已知的节点,observer为某个已经实例化的MutationObserver观察者对象,则:
```
observer.observe(target, {childList:true})                              //childList属性只观察子节点的新建与删除,子节点本身的任何变化都不会去理会  
target.appendChild(document.createElement("div"))                       //添加了一个元素子节点,触发回调函数.
target.appendChild(document.createTextNode("foo"))                      //添加了一个文本子节点,触发回调函数.
target.removeChild(target.childNodes[0])                                //移除第一个子节点,触发回调函数.
target.childNodes[0].appendChild(document.createElement("div"))         //为第一个子节点添加一个子节点,不会触发回调函数,如果需要触发,则需要设置subtree属性为true.


observer.observe(target, {childList:true,subtree:true})                 //subtree属性让观察行为进行"递归",这时,以target节点为根节点的整棵DOM树发生的变化都可能会被观察到 
observer.observe(document, {childList:true,subtree:true})               //如果target为document或者document.documentElement,则当前文档中所有的节点添加与删除操作都会被观察到
observer.observe(document, {childList:true,attributes:true,characterData:true,subtree:true})   //当前文档中几乎所有类型的节点变化都会被观察到(包括属性节点的变化和文本节点的变化等)


observer.observe(target, {childList:true})                              //假设此时target的outHTML内容为<div>foo<div>,则: 
target.childNodes[0].data = "bar"                                       //不会触发回调函数,因为childList只观察节点的新建与删除,而这里target节点的子节点仍然只有一个,没有多,没有少
observer.observe(target, {childList:true,characterData:true})           //加上characterData属性,允许观察文本节点的变化,行不行? 
target.childNodes[0].data = "bar"                                       //还是不会触发回调函数,因为发生变化的是target节点的子节点,我们目前的目标节点只有一个,就是target.
observer.observe(target, {childList:true,characterData:true,subtree:true})  //加上subtree属性,观察所有后代节点 
target.childNodes[0].data = "bar"                                       //触发了回调函数,发生变化的是target节点的文本子节点(必须同时有characterData和subtree属性,才能观察到一个元素目标节点里的文本内容的变化)


observer.observe(target, {attributes:true})                             //只观察目标节点的属性节点
target.setAttribute("foo","bar")                                        //不管foo属性存在不存在,都会触发回调函数
target.setAttribute("foo","bar")                                        //即使前后两次的属性值一样,还是会触发回调函数
target.removeAttribute("foo")                                           //移除foo属性节点,触发回调函数
target.removeAttribute("foo")                                           //不会触发回调函数,因为已经没有属性节点可移除了
observer.observe(target, {attributes:true,attributeFilter:["bar"]})     //指定要观察的属性名
target.setAttribute("foo","bar")                                        //不会触发回调函数,因为attributeFilter数组不包含"foo"
target.setAttribute("bar","foo")                                        //触发了回调函数,因为attributeFilter数组包含了"bar"
```
