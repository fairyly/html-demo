# rollup.js

rollup.js: https://rollupjs.org/#quick-start

1.npm install --global rollup  简写： npm i rollup -g

for example  
假设您的应用程序的入口点名为main.js，并且您希望将所有导入都编译为名为bundle.js的单个文件

```
For browsers:

# compile to a <script> containing a self-executing function ('iife')
$ rollup main.js --o bundle.js --f iife
For Node.js:

# compile to a CommonJS module ('cjs')
$ rollup main.js --o bundle.js --f cjs
For both browsers and Node.js:

# UMD format requires a bundle name
$ rollup main.js --o bundle.js -f umd --name "myBundle"

```
2.tree-shaking: 类似于死代码消除(DCE),保留活代码，是实现DCE的一种方式

```
例如，使用 CommonJS，必须导入整个工具或库。

// import the entire utils object with CommonJS
var utils = require( 'utils' );
var query = 'Rollup';
// use the ajax method of the utils object
utils.ajax( 'https://api.example.com?search=' + query ).then( handleResponse );

但是使用ES6模块，而不是导入整个utils对象，我们可以导入ajax我们需要的一个函数：

// import the ajax function with an ES6 import statement
import { ajax } from 'utils';
var query = 'Rollup';
// call the ajax function
ajax( 'https://api.example.com?search=' + query ).then( handleResponse );
```

3.创建一个简单的项目：
  - npm install rollup --global  //全局安装
  - rollup   // 使用说明。这与运行相同rollup --help，或者rollup -h  
  创建一个简单的项目:
  - mkdir -p my-rollup-project/src
  - cd my-rollup-project
  - 首先，我们需要一个入口点。将其粘贴到一个新文件中src/main.js
    ```
    // src/main.js
    import foo from './foo.js';
    export default function () {
      console.log(foo);
    }
    ```
  - 然后，我们创建foo.js我们的入口点导入的模块
    ```
    // src/foo.js
    export default 'hello world!';
    ```
  - 现在我们准备好创建一个包:
    rollup src/main.js -f cjs ,该-f选项（简称--output.format）指定了我们正在创建什么样的捆绑包,因为我们没有指定输出文件，它将直接打印到stdout
    ```
    'use strict';

     var foo = 'hello world!';

    var main = function () {
       console.log(foo);
    };

    module.exports = main;
    ```
  - 也可以将捆绑包保存为如下所示的文件
    ```
    rollup src/main.js -o bundle.js -f cjs
    也可以这样做rollup src/main.js -f cjs > bundle.js，但是我们稍后会看到，如果你正在生成源代码图，那么这个方法的灵活性就会降低
    ```
  - 尝试运行代码：
    ```
    node
    > var myBundle = require('./bundle.js');
    > myBundle();
    'hello world!'
    ```

4. 使用配置文件

```
在项目根目录中创建一个文件rollup.config.js，并添加以下代码：

// rollup.config.js
export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  }
};
要使用配置文件，我们使用--config或-c标志：

rm bundle.js # so we can check the command works!
rollup -c
您可以使用等效的命令行选项覆盖配置文件中的任何选项：

rollup -c -o bundle-2.js # `-o` is short for `--output.file`

如果您愿意，可以从默认值中指定一个不同的配置文件rollup.config.js：

rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js
```
5. 使用插件
