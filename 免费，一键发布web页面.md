# 免费，一键发布web页面

* 使用parcel打包构建web页面（parcel几乎是零配置的，即可使用线下流行的技术）
* 使用docsify编写文档（文档风格更为优雅美观，示例）
* 使用firebase去托管我们页面（提供免费的https静态文件托管服务）

使用以上三种工具，只需要少数几条命令，即可完成：打包自己的web应用，编写文档，并且拥有属于自己完全免费的线上地址
```
node请使用8.x版本
```

### 使用firebase免费托管web页面（需要翻墙）
```
使用firebase，首先请先注册一个google账号
step 1: 全局安装firebase-tools

npm install -g firebase-tools

step 2: 首次使用firebase的话需要授权登录，如已经授权登录，请跳过该步骤

firebase login

注：window环境下如果报错了，请注意要使用cmd而不是git bash

step 3: 打开firebase base控制台，点击添加项目，如下图
![](https://user-gold-cdn.xitu.io/2018/4/16/162ce6723d3b984a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

step 4: 输入项目名称，并记下项目ID，如下图
![](https://user-gold-cdn.xitu.io/2018/4/16/162ce67240fd2be8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

step 5: 新建文件夹test-firebase（名字仅做举例用）

step 6: cd test-firebase

step 7: firebase init，选择Hosting，按下空格 & 回车；选择刚才创建的项目；其他一路按回车，部分截图如下
![](https://user-gold-cdn.xitu.io/2018/4/16/162ce67240a88939?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

step 8: firebase deploy，运行该命令发布应用到线上，等待一会，即可在控制台看到你的线上地址！初始的页面是这样子：示例
到这里为止，如果一切顺利，即可使用firebase免费托管静态页面并且拥有属于自己的线上地址，此外，还可以在firebase控制台进行版本管理。

在step 7中，有一条选项What do you want to use as your public directory，默认是使用public作为静态文件最终的上传路径，
这里是可以修改的，在firebase.json中可以进行定制，更多内容参考[firebase](https://firebase.google.com/docs/hosting/?hl=zh-cn)托管


作者：nw2018
链接：https://juejin.im/post/5ad495416fb9a028cb2e1bca
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```


### 使用parcel打包构建
```
现下流行的技术一般都需要编译，而webpack被人诟病最多的地方莫过于配置过于繁琐且容易出错，这里推荐使用parcel打包构建我们的应用，使用上很方便，学习参考资料如下：

parcel官网
parcel awesome

虽然parcel号称零配置，实际上还是需要配置一点点的内容，比如babel环境等，这里写了个种子项目，以parcel结合vue作为示例，parcel&vue demo

如你此前已安装parcel，请确保全局安装的parcel版本 >= 1.7.0

npm install -g parcel-bundler
git clone git@github.com:nwa2018/parcel-vue-demo.git
cd parcel-vue-demo
npm i
parcel serve ./index.html --open -p 4567 --out-dir dist --no-cache
当需要将应用发布到线上的时候，参照上述介绍的firebase完成初始化(此处参照第一步，不再赘述)，最终发布上线只需要两条命令
parcel build ./index.html --out-dir public --no-cache
firebase deploy
最终发布上线的初始页面长这样：[示例]()
```

### 使用docsify编写文档
```
docsify支持使用md语法编写文档，编写出来的文档优雅舒适，甚至可以使用docsify编写类似vue官网的文章，可以参考docsify官网以及docsify awesome，此篇文章的docsify版本
以docisfy-start-demo示例
安装
npm i docsify-cli -g
本地编写文档
git clone git@github.com:nwa2018/docisfy-start-demo.git
docsify serve docisfy-start-demo/ -o -p 3456
发布到线上，使用firebase完成初始化(此处参照第一步，不再赘述)
注：这里需要修改firebase.json中的public字段为./，因为是需要将docisfy-start-demo目录下的所有文件提交上去进行托管
cd docisfy-start-demo
firebase deploy
最终线上效果：示例
总结

通过命令parcel serve ./index.html --open -p 4567 --out-dir dist --no-cache本地开发vue应用，配置内容非常少，即可使用现下流行的语法特性与工程化特性
通过命令parcel build ./index.html --out-dir public --no-cache firebase deploy去打包构建我们的应用，并通过firebase deploy一键发布应用，并且拥有属于自己的线上地址
通过命令docsify serve docisfy-start-demo/ -o -p 3456本地开启服务编写文档，并通过firebase deploy一键发布文档，并且拥有属于自己的线上地址

作者：nw2018
链接：https://juejin.im/post/5ad495416fb9a028cb2e1bca
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
