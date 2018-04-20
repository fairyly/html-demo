# javascript 解释器,AST

AST: 抽象语法树简写

### 首先用 JavaScript 写一个 JavaScript 解释器

热更的第一步，就是用 JavaScript 写一个 JavaScript 解释器。

对于很多小伙伴来说，写一个JavaScript 解释器这听起来天方夜谭，但事实上却是非常简单，

因为使用 JavaScript 实现 JavaScript 解释器，所以语义几乎可以完全复用。

列一下具体实现步骤：

```
解析 JavaScript 代码字符串，得到 JavaScript 代码的抽象语法树（AST）。
解析这个步骤不需要自己做，有非常多优秀的现成的库，比如 [acornjs/acorn](https://github.com/acornjs/acorn) 。
结果会解析成标准的 ESTree。

因为 JavaScript 的语法树是有标准格式的 estree/estree ，所以只需要对照这个标准格式进行实现语法树的求值，
只要保证 JavaScript 一样的语义，
就和 eval / new Function 等效果差不多了。

需要注意的细节：

1. 作用域。 比如 var 声明的变量是函数作用域，const / let 是词法作用域，这些要注意区分。
2. || 和 && 运算符。 这两个运算符有短路的效果，所以不能和其他运算符一样先求两边的值。
3. 函数闭包。 就像上述所说的，用 JavaScript 实现 JavaScript 解释器几乎可以完全复用 JavaScript 语义，
在这里就体现的淋漓精致了。

解释器函数闭包就可以用语言本身的闭包来进

```
