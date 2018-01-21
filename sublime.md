# sublime

* 汉化插件安装---

  ctrl + shift + p  --->  输入 install package ---> 输入 localization
  
  sublime text 3 隐藏菜单后怎么点出来: 单击+alt或者 shift + ctrl + p 调出命令之后选择view: toggle menu。

* 插件介绍：https://github.com/jikeytang/sublime-text  
          http://www.cnblogs.com/hykun/p/sublimeText3.html
  
* 注册码

  ```
  —– BEGIN LICENSE —–  
  TwitterInc  
  200 User License  
  EA7E-890007  
  1D77F72E 390CDD93 4DCBA022 FAF60790  
  61AA12C0 A37081C5 D0316412 4584D136  
  94D7F7D4 95BC8C1C 527DA828 560BB037  
  D1EDDD8C AE7B379F 50C9D69D B35179EF  
  2FE898C4 8E4277A8 555CE714 E1FB0E43  
  D5D52613 C3D12E98 BC49967F 7652EED2  
  9D2D2E61 67610860 6D338B72 5CF95C69  
  E36B85CC 84991F19 7575D828 470A92AB  
  —— END LICENSE ——  
  ```
* 代码格式化插件安装

  HTML-css-js prettify ：ctrl + shift + p  --->  输入 install package ---> 输入 html css js  
  首先要配置插件的node路径才可以使用，，否则报错，无法使用
  
* 插件推荐
```


1、SublimeLinter        = 错误语法
2、JsMinifier           =自动压缩js文件
3、Sublime CodeIntel    =代码自动提示
4、Bracket Highlighter  =代码匹配
5、CSScomb CSS          =属性排序
6、SublimeTmpl          =快速生成文件模板
7、SideBarEnhancements  =设置sublime text2/3支持浏览器预览
8、ColorPicker          =调色盘
9、Tag                  = Html格式化
10、Clipboard History   = 剪贴板历史记录
11、SideBarEnhancements = 侧栏右键功能增强
12、GBK to UTF8         =GBK转黄成UTF8
13、SFTP                =ftp插件
14、WordPress           = WordPress函数
15、PHPTidy             =排版PHP代码
15、YUI Compressor      =压缩JS和CSS文件
16、Alignment           =代码对齐
17、Emmet               =大名鼎鼎呀
18、Prefixr             =css自动添加 -webkit 等私有词缀
```

* sublime常用快捷键
```
Ctrl + /  ---------------------注释

Ctrl + 滚动　--------------字体变大/缩小

Ctrl + N-------------------新建

软件右下角可以选择文档语法模式

Ctrl + Shift + P ------------------命令模式

命令：

sshtml模糊匹配-----语法切换到html模式，同理所得，ss+相应文件名匹配相应模式，如ssphp、ssjava等

Ctrl+Shift +k -----------删除一行

Alt + . ------------快速闭合标签

Ctrl + P -----------菜单上的解释是gotoanythings，用"#"匹配，

Ctrl + 回车 -----------添加一行空行

Ctrl + Shift +V --------粘贴过程中保持缩进

Alt + F3 ---------------选中选择的词

Ctrl + W ---------------关闭当前文档

Ctrl + H ---------------替换

 

Ctrl + D ---------------多行游标选择 可以搭配 Ctrl + K取消选择部分游标 

产生游标的另外一种方式，按住Shift + 鼠标右键拖动光标

 

Ctrl + Shift + D ---------复制这行文本

SHift +Tab --------------去除缩进
```



* sublime Text3 安装错误PyV8

```
1.  View->Show console ->根据官网 https://packagecontrol.io/installation 的提示，安装package Control 

2.Preferences ->package Control ->install package -> Emment

之后可能会报错 ：

Error while loading PyV8 binary: exit code 4  Try to manually install PyV8 from https://github.com/emmetio/pyv8-binaries

解决办法：

a.   https://github.com/emmetio/pyv8-binaries  下载

b.preferences ->Browse packages ,进入上一级菜单，在Installed Packages 里面新建文件夹: PyV8

c.打开刚刚下载的压缩包，copy  pyv8-osx-p3.zip  和 pyv8-osx.zip 两个压缩包到 新建的PyV8文件夹

之后重启 sublime Text ，会自动加载。
```
