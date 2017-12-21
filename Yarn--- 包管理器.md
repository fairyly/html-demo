# Yarn

文档：https://yarnpkg.com/zh-Hans/docs/getting-started

GitHub：https://github.com/yarnpkg/yarn/

1. 安装：https://yarnpkg.com/zh-Hans/docs/install  
  在 Windows 系统中安装 Yarn 有三种方法：
  - 下载安装程序，运行它时带领你安装 Yarn 到 Windows 上，先安装 Node.js
  - 用 Chocolatey 安装
  - 通过 Scoop 安装
  - **注意: ** 一般来说, 不推荐通过 npm 安装 Yarn 在用基于 Node 的包管理器安装 Yarn 时，该包未被签名， 并且只通过基本的 SHA1 散列进行唯一完整性检查。 这在安装系统级应用时有安全风险。

2. 运行命令来测试 Yarn 是否安装：
```
yarn --version
```

3. 现在Yarn已经 安装完毕，可以开始使用。以下是一些你需要的最常用的命令
  - 初始化新项目  `yarn init`
  - 添加依赖包 
    ```
      yarn add [package]
      yarn add [package]@[version]
      yarn add [package]@[tag]
    ```
  - 将依赖项添加到不同依赖项类别  
    分别添加到 devDependencies、peerDependencies 和 optionalDependencies：
    ```
      yarn add [package] --dev
      yarn add [package] --peer 
      yarn add [package] --optional
    ```
  - 升级依赖包
    ```
      yarn upgrade [package]
      yarn upgrade [package]@[version]
      yarn upgrade [package]@[tag]
    ```
  - 移除依赖包
    ```
      yarn remove [package]
    ```
  - 安装项目的全部依赖
    ```
    yarn
    或者
    yarn install
    
    ```


