# vscode: Visual Studio Code (简称 VS Code / VSC) 是一款免费开源的现代化轻量级代码编辑器，

- vue 中有的代码不高亮,可以找扩展,安装一下高亮插件

- 编辑
  - 打开文件,不能编辑,按住 i 键后,可以编辑
- 选中多行操作
  - alt + 鼠标左键
  
- 添加过个文件夹到工作区
  - 文件--》将文件夹添加到工作区

- 设置中文
  - 安装插件: Chinese (Simplified) Language Pack for Visual Studio Code
  - ctrl+shift+p
  - configure language
  ```
    "locale": "zh-CN"
  ```

- vscode安装了vim插件之后: ctrl+c ctrl+v 快捷键用不了
  - 是在INSERT模式下，使用ctrl+c复制，按下去之后，就别成图2的NORMAL模式了，按ctrl+v就变成了VISUAL BLOCK模式
  - vim.useCtrlKeys 选项设置为 false，关掉vim对ctrl的绑架即可
  - 最后卸载了 vim 插件才可以


- 按住 ctrl 选择多个


- 保存文件自动格式化代码
>后把JS-CS-HTML Formatter这个插件禁用


- markdown 预览
>快捷键： ctrl+shift +v
  
## 一、vs code 的常用快捷键

1、注释：

　　a) 单行注释：[ctrl+k,ctrl+c] 或 ctrl+/

　　b) 取消单行注释：[ctrl+k,ctrl+u] (按下ctrl不放，再按k + u)

　　c) 多行注释：[alt+shift+A]

　　d) 多行注释：/**

2、移动行：alt+up/down

3、显示/隐藏左侧目录栏  ctrl + b

4、复制当前行：shift + alt +up/down

5、删除当前行：shift + ctrl + k

6、控制台终端显示与隐藏：ctrl + ~

7、查找文件/安装vs code 插件地址：ctrl + p

 

8、代码格式化：shift + alt +f

9、新建一个窗口 : ctrl + shift + n

10、行增加缩进:  ctrl + [

11、行减少缩进:  ctrl + ]

12、裁剪尾随空格(去掉一行的末尾那些没用的空格) : ctrl + shift + x

13、字体放大/缩小:  ctrl + ( + 或 - )

14、拆分编辑器 :  ctrl + 1/2/3

15、切换窗口 :  ctrl + shift + left/right

16、关闭编辑器窗口 :  ctrl + w

17、关闭所有窗口 :  ctrl + k + w

18、切换全屏 :   F11

19、自动换行 :  alt + z

20、显示git  :   ctrl + shift + g

21、全局查找文件：ctrl + shift + f

22、显示相关插件的命令(如：git log)：ctrl + shift + p

23、选中文字：shift + left / right / up / down

24、折叠代码： ctrl + k + 0-9 (0是完全折叠)

25、展开代码： ctrl + k + j (完全展开代码)

26、删除行 ： ctrl + shift + k 

27、快速切换主题：ctrl + k / ctrl + t

28、快速回到顶部 ： ctrl + home

29、快速回到底部 : ctrl + end

30、格式化选定代码 ：ctrl + k / ctrl +f

31、选中代码 ： shift + 鼠标左键

32、多行同时添加内容（光标） ：ctrl + alt + up/down

33、全局替换：ctrl + shift + h

34、当前文件替换：ctrl + h

35、打开最近打开的文件：ctrl + r

36、打开新的命令窗：ctrl + shift + c

 

## 二、vs code 的常用插件
1、Auto Rename Tag   修改html标签，自动帮你完成尾部闭合标签的同步修改，和webstorm一样。

2、Auto Close Tag   自动闭合HTML标签

4、Beautiful   格式化代码的工具

5、Dash   Dash是MacOS的API文档浏览器和代码段管理器

6、Ejs Snippets  ejs 代码提示

7、ESLint   检查javascript语法错误与提示

8、File Navigator  快速查找文件

9、Git History(git log)   查看git log

10、Gulp Snippets   写gulp时用到，gulp语法提示。

11、HTML CSS Support   在HTML标签上写class智能提示当前项目所支持的样式

12、HTML Snippets   超级好用且初级的H5代码片段以及提示

13、Debug for Chrome   让vs code映射chrome的debug功能，静态页面都可以用vscode来打断点调试、配饰稍微复杂一点

14、Document this         Js的注释模板

15、jQuery Code Snippets   jquery提示工具

16、Html2jade   html模板转pug模板

17、JS-CSS-HTML Formatter  格式化

18、Npm intellisense   require 时的包提示工具

19、Open in browser  打开默认浏览器

20、One Dark Theme  一个vs code的主题

21、Path Intellisense   自动路径补全、默认不带这个功能

22、Project Manager   多个项目之间快速切换的工具

23、Pug(Jade) snippets   pug语法提示

24、React Components   根据文件名创建反应组件代码。

25、React Native Tools    reactNative工具类为React Native项目提供了开发环境。

26、Stylelint   css/sass代码审查

27、Typings auto installer   安装vscode 的代码提示依赖库，基于typtings的

28、View In Browser  　默认浏览器查看HTML文件（快捷键Ctrl+F1可以修改）

29、Vscode-icons  让vscode资源目录加上图标、必备

30、VueHelper   Vue2代码段（包括Vue2 api、vue-router2、vuex2）

31、Vue 2 Snippets   vue必备vue代码提示

32、Vue-color   vue语法高亮主题

33、Auto-Open Markdown Preview markdown文件自动开启预览

34、EverMonkey 印象笔记

35、atom one dark atom的一个高亮主题(个人推荐)

 

## 三、常用的电脑快捷键

1、ctrl + shift + delete 快速清除浏览器缓存

2、ctrl + alt + delete  快速进入任务管理器页面

3、window + L  快速锁定电脑

4、window + d  所有窗口最小化

5、 window + e  打开我的资源管理器(我的电脑)

6、 window + f  快速打开搜索窗口

7、 alt + tab  快速查看打开的应用与窗口

## 资料
- vscode 一些基本知识: https://blog.csdn.net/amyloverice/article/details/79388270
- https://www.cnblogs.com/weihe-xunwu/p/6687000.html
- 快捷键：https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
