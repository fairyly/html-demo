# babel-handbook

* https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
* http://axetroy.xyz/#/post/170


### Babel 的处理步骤
Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

Babel 实际上是一组模块的集合。

### api

#### babylon

Babylon 是 Babel 的解析器。

最初是 从Acorn项目fork出来的。

Acorn非常快，易于使用，并且针对非标准特性(以及那些未来的标准特性) 设计了一个基于插件的架构。

首先，让我们安装它。

```
$ npm install --save babylon
先从解析一个代码字符串开始：

import * as babylon from "babylon";

const code = `function square(n) {
  return n * n;
}`;

babylon.parse(code);
// Node {
//   type: "File",
//   start: 0,
//   end: 38,
//   loc: SourceLocation {...},
//   program: Node {...},
//   comments: [],
//   tokens: [...]
// }
我们还能像下面这样传递选项给 parse()方法：

babylon.parse(code, {
  sourceType: "module", // default: "script"
  plugins: ["jsx"] // default: []
});
```
