# APP 一站式解决方案

boat: https://boat.alibaba.com/ 轻舟

轻舟（Boat）" 是一个基于云端一体化体验一站式开发和运维 APP 的产品

文档: https://boat.alibaba.com/doc/guide#basic-index

```
npm i -g boat-cli
```

1.创建 App

2. 配置 SSH key

3. 

开发:
```
如何开发?
1 全局安装boat-cli
  npm i -g boat-cli --registry=https://registry.npm.taobao.org

2 新用户首次使用执行下面命令生成SSH Key， 配置SSH Key
  boat ssh
  执行 boat ssh，会自动获取 key 并拷贝到剪贴板。
  打开 配置，粘贴并添加。
  该过程只需要执行一次，后续新建应用不需要再重复配置

3 拷贝仓库
  git clone git@code.aliyun.com:t-2503966162-6/myboatapp.git

4 进入仓库目录，使用 SDK 开始开发
  boat dev
```
