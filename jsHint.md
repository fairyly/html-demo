jsHint 配置参数小结
jsHint 同jsLint 一样都是js代码检查工具

jsHint 规则 参考资料http://www.cnblogs.com/code/articles/4103070.html；http://www.htmlhifive.com/conts/web/view/library/JSLint_JSHint

 

选项	 内容	 值	错误信息
bitwise	 禁用位运算符(如^，&)	  设置：true; 不设置：false	 Unexpected use of '・・・'.(设置true时)
curly	 if和while等语句中使用{}来明确代码块	  设置：true; 不设置：false	 Expected '{' and instead saw '・・・'.
eqeqeq	 使用===和!==替代==和!=	  设置：true; 不设置：false	 Use '===' to compare with 'null'.
 forin	
 在for in循环中使用Object.prototype.hasOwnProperty()来过滤原型链中的属性

 

  设置：true; 不设置：false 	 The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype
 immed	
匿名函数调用必须

(function() {
   // body 
}());
而不是

(function() {
   // body
})();
这是为了表明，表达式的值是函数的结果，而不是函数本身。
设置：true; 不设置：false 
 	Move the invocation into the parens that contain the function. ・Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself. 
 latedef	 变量定义前禁止使用	 设置：true; 不设置：false	 ' ' was・・・used before it was defined .
 newcap	 构造函数名首字母必须大写	 设置：true; 不设置：false	 A constructor name should start with an uppercase letter.
 noarg	 禁止使用arguments.caller和arguments.callee	 设置：true; 不设置：false	 Avoid arguments.callee.
 noempty	 禁止出现空的代码块	 设置：true; 不设置：false	 Empty block.
 nonew	 禁止使用构造器	 设置：true; 不设置：false	 Do not use 'new' for side effects.
 plusplus	 禁止使用++和--	 设置：true; 不设置：false	 Unexpected use of '++'.
 undef	 禁止使用不在全局变量列表中的未定义的变量	 设置：true; 不设置：false	'・・・' is not defined.
 strict	 强制使用ES5的严格模式 	 设置：true; 不设置：false	 Missing "use strict" statement.
 freeze	
 禁止复写原生对象(如Array, Date)的原型

 

/* jshint freeze:true */
Array.prototype.count = function (value) { return 4; };
// -> Warning: Extending prototype of native object: 'Array'.
 

 设置：true; 不设置：false 	 Warning: Extending prototype of native object: 'Array'.
 	 	 	 
 	 	 	 
 	 	 	 
 	 	 	 
 	 	 	 
 asi	 允许省略分号	 允许：true; 不允许：false	 Missing semicolon.
 boss	 允许在if，for，while语句中使用赋值;在条件语句中使用赋值经常是笔误if (a = 10) {}	 允许：true; 不允许：false	 Expected a conditional expression and instead saw an assignment.
 debug	 允许debugger语句	 允许：true; 不允许：false	 All 'debugger' statements should be removed.
 eqnull	
 允许==null

==null通常用来比较=== null;=== undefined

 允许：true; 不允许：false	Use '===' to compare with '～'. 
 evil	 允许使用eval	 允许：true; 不允许：false	 eval is evil.
 expr	 允许应该出现赋值或函数调用的地方使用表达式	 允许：true; 不允许：false	 Expected an assignment or function call and instead saw an expression.
 iterator	 允许__iterator__;不是所有的浏览器都支持__iterator__。	 允许：true; 不允许：false	 __iterator__' is only available in JavaScript 1.7.
 lastsemic	
 允许单行控制块省略分号

 

var name = (function() { return 'Anton' }());
 

 

 允许：true; 不允许：false	Missing semicolon. 
 laxbreak	 允许不安全的行中断(与laxcomma配合使用)	 允许：true; 不允许：false	 Bad line breaking before '～'.
 laxcomma	 允许逗号开头的编码样式	 允许：true; 不允许：false	 Comma warnings can be turned off with 'laxcomma'.
 loopfunc	 允许循环中定义函数	 允许：true; 不允许：false	 Don't make functions within a loop.
 onecase	 允许只有一个case条件的switch语句吗	 允许：true; 不允许：false	 This 'switch' should be an 'if'.
 proto	 允许 proto（不是所有的浏览器都支持__proto__.）	 允许：true; 不允许：false	 The '__proto__' property is deprecated.(反对)
 regexdash	
 待了解---》好像可以这么理解：

在正则表达式的控制语句，连字符开头或方括号的结束 - 容忍的存在。

 允许：true; 不允许：false	 Unescaped '-'.
 scripturl	 	 允许：true; 不允许：false	 
 shadow	
 允许变量shadow

 

function test() {
    var x = 10;

    if (true) {
        var x = 20;
    }

    return x;
}
基于“函数作用域”，多次定义变量和单次定义是没有区别的，但是会造成阅读障碍。
 

 允许：true; 不允许：false	'・・・' is already defined. 
sub	
 允许person[‘name’]

JSHint推荐使用person.name代替person[‘name’]

 允许：true; 不允许：false	 ['・・・'] is better written in dot notation.
 supernew	 允许new function() {…}和new Object;	 允许：true; 不允许：false	 Weird construction. Delete
 validthis	 允许严格模式下在非构造函数中使用this	 允许：true; 不允许：false	 Possible strict violation.
 	 	 	 
 	 	 	 
 	 	 	 
