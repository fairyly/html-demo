# google 扩展插件开发

1.翻墙

2. 360把Chrome的开发文档翻译了
  - http://open.chrome.360.cn/extension_dev/overview.html
  
  - 如何从零开始写一个 Chrome 扩展: https://www.zhihu.com/question/20179805
  - http://www.jianshu.com/p/049eecc2062f
  - 图灵社区图书: http://www.ituring.com.cn/book/1421
3. 文件
```
每个应用（扩展）都应该包含下面的文件：

一个manifest文件
一个或多个html文件（除非这个应用是一个皮肤）
可选的一个或多个javascript文件
可选的任何需要的其他文件，例如图片
```
4. 开发者信息中心
  - https://chrome.google.com/webstore/developer/dashboard
  - 要发布新应用、扩展程序或主题背景，请点击`添加新内容`

5. Chrome插件安装的本机目录: chrome://version/

1.如何优雅的调试
  右键Chrome工具栏的小图标会弹出一个窗口，选择审查弹出内容即可调试。  
  但是这种方法极度低效，直接chrome://extensions/找到你插件的ID：  
  然后浏览器访问： 
  比如:
  chrome-extension://<插件ID>/�插件入口html文件  :
  chrome-extension://fnfchnalfnjbjbfeccpophocngdgapad/index.html   
  
2.如何查看其他插件的源码
  访问chrome://version 找到Chrome插件安装的本机目录:  
  然后找到extension目录，所有插件和数据都在这里，可以随便参考其他插件源码。

3.不要把JS代码写在html文件里  
出于安全考虑，入口html文件中的JS代码只能通过script标签引用外部脚本文件，内嵌的JS代码会失效的。

4.注意国际化  
webstore面向的是全球用户，你辛辛苦苦写的小工具肯定不想只限于国内用户吧，所以在你的项目里面加上_locales文件夹，写代码的时候时刻考虑到如何才能更好地支持国际化。

5.用好Google  
开发遇到的问题Google一下一般能找到，StackOverflow 和Google网上论坛这两个站点要尤其留意，大部分问题这上面�都有解决方案。

