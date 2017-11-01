## js 正则表达式 (RegExp 对象)

* 正则表达式修饰符
  - i 执行对大小写不敏感的匹配
  - g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止)
  - m 执行多行匹配

* 插入特殊字符
```
  - \' 单引号
  - \" 双引号
  - \\ 反斜杠
  - \b 退格
  - \f 换页符
  - \n 换行
  - \r 回车
  - \t 水平制表位
  - \ddd 八进制序列
  - \xdd 十六进制序列
  - \udddd unicode 序列
```

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
    
    使用正则表达式搜索 "Runoob" 字符串，且不区分大小写：
    var str = "Visit Runoob!"; 
    var n = str.search(/Runoob/i); // n:返回显示匹配的起始位置
  ```
* test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。
  ```
    常见写法：
    var num = 333;
    var pattern = /^[0-9]$/
    if(pattern.test(num)){
      console.log(pattern.test(num))
    }
  ```
* exec() 方法用于检索字符串中的正则表达式的匹配,该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
  
* 中国大陆加港澳台手机正则验证: /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/
