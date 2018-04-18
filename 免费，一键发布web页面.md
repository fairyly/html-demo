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
![](https://user-gold-cdn.xitu.io/2018/4/16/162ce6723d3b984a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
step 3: 打开firebase base控制台，点击添加项目，如下图

作者：nw2018
链接：https://juejin.im/post/5ad495416fb9a028cb2e1bca
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
