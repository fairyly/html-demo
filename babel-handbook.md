# Babel 插件手册: babel-handbook

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


`sourceType` 可以是 `"module"` 或者 `"script"`，它表示 Babylon 应该用哪种模式来解析。 `"module"` 将会在严格模式下解析并且允许模块定义，`"script"` 则不会。

> **注意：** `sourceType` 的默认值是 `"script"` 并且在发现 `import` 或 `export` 时产生错误。 使用 `scourceType: "module"` 来避免这些错误。

由于 Babylon 使用了基于插件的架构，因此有一个 `plugins` 选项可以开关内置的插件。 注意 Babylon 尚未对外部插件开放此 API 接口，不排除未来会开放此API。

要查看完整的插件列表，请参见 [Babylon README](https://github.com/babel/babylon/blob/master/README.md#plugins)文件。.

## <a id="toc-babel-traverse"></a>[`babel-traverse`](https://github.com/babel/babel/tree/master/packages/babel-traverse)

Babel Traverse（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点。

运行以下命令安装：

```sh
$ npm install --save babel-traverse
```

我们可以和 Babylon 一起使用来遍历和更新节点：

```js
import * as babylon from "babylon";
import traverse from "babel-traverse";

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (
      path.node.type === "Identifier" &&
      path.node.name === "n"
    ) {
      path.node.name = "x";
    }
  }
});
```

## <a id="toc-babel-types"></a>[`babel-types`](https://github.com/babel/babel/tree/master/packages/babel-types)

Babel Types模块是一个用于 AST 节点的 Lodash 式工具库（译注：Lodash 是一个 JavaScript 函数工具库，提供了基于函数式编程风格的众多工具函数）， 它包含了构造、验证以及变换 AST 节点的方法。 该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用。

可以运行以下命令来安装它：

```sh
$ npm install --save babel-types
```

然后按如下所示来使用：

```js
import traverse from "babel-traverse";
import * as t from "babel-types";

traverse(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
});
```
