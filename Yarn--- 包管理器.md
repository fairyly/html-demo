# Yarn

文档：https://yarnpkg.com/zh-Hans/docs/getting-started

GitHub：https://github.com/yarnpkg/yarn/

1. 安装：https://yarnpkg.com/zh-Hans/docs/install  
  在 Windows 系统中安装 Yarn 有三种方法：
  - 下载安装程序，运行它时带领你安装 Yarn 到 Windows 上，先安装 Node.js
  - 用 Chocolatey 安装,
    ```
      管理员权限 运行 cmd 粘贴
      @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
      完成后

      choco install yarn
    ```
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

### 基本工作流你应该知道几个简单的事：

* 创建一个新项目：   `yarn init`
* 增加／更新／删除依赖  `yarn add [package]`, `yarn upgrade [package]`,`yarn remove [package]`
* 安装／重装你的依赖  
  ```
    安装所有依赖：yarn 或 yarn install
    安装一个包的单一版本：yarn install --flat
    强制重新下载所有包：yarn install --force
    只安装生产环境依赖：yarn install --production
  ```
* 引入版本控制系统（例如 git）
  ```
    为了别人能使用你的包，以下文件必须被提交进版本控制系统：

    package.json：包含包的所有依赖信息；
    yarn.lock：记录每一个依赖项的确切版本信息；
    包实现功能的实际项目代码。
  ```
* 持续集成: 详见：https://yarnpkg.com/zh-Hans/docs/install-ci  
  - Yarn 很容易在许多持续构建系统中使用。为了加速构建，Yarn 缓存目录可以跨构建保存起来
  ```
    1.Yarn已预先安装在 AppVeyor 上，所以不需要在构建流程中做别的事情。

    要让 build 更快，你可以把以下配置加到appveyor.yml，这会缓存 Yarn 的 缓存文件夹。

    cache:
       - "%LOCALAPPDATA%\\Yarn"
  ```



