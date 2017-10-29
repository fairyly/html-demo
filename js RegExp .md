## js 正则表达式 (RegExp 对象)

* 正则表达式修饰符
  - i 执行对大小写不敏感的匹配
  - g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止)
  - m 执行多行匹配

* 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search() 和 split()
  - String.prototype.match 调用 RegExp.prototype[Symbol.match]
  - String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
  - String.prototype.search 调用 RegExp.prototype[Symbol.search]
  - String.prototype.split 调用 RegExp.prototype[Symbol.split]

* 写法：
  - var pattern = /t\w{2}e/g;  // g:全局标志,全局匹配; 字面的正则都是以一个 / 开始和结束
  - new RegExp('t\\w{2}e','g');  //也可以使用内建的 RegExp 对象  
  ```
    var str = " now is the time,this is the tame"
    var pattern = /t\w{2}e/g;
    var newstr = str.replace(pattern,'place'); //用 place 字符串 替换 匹配正则的 字符串部分
  ```
