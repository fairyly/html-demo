# 腾讯IVWEB前端工作流和规范

* https://github.com/feflow
* doc: http://www.feflowjs.org/zh-cn/docs/

- 爱彼迎 JavaScript Style Guide: https://github.com/airbnb/javascript

## README规范
  项目名：[project name]，git仓库地址：[repository's url from origin] 。本项目第一负责人为 `[owner]`。


  ## 1. 如何运行
  
  > node版本 `[xxx]`
  
  ### 1.1 开发环境配置
  
  xxxxxx
  
  ### 1.2 开发过程

  #### 1.2.1 命令
  
  ```sh
  # 开发
  npm start
  
  # 发布
  npm run build
  ```

  #### 1.2.2 代理配置
  
  `Fiddler` 代理：
  
  - `regex:^https?://now\.qq\.com/(.*\.(js|css|png|jpg|gif|jpeg|svg|blob).*)$` `ROOT:/path/$1`
  
  `Whistle` 代理：
  
  - `/^https?://now\.qq\.com/(.*\.(js|css|png|jpg|gif|jpeg|svg|blob).*)$/` `ROOT:/path/$1`

  ### 1.3 发布
  
  | 发布产品 | 发布模块 |
  | --- | --- |
  | `[xxx]` | `[xxx]` |
  
  > 发布时的备注
  
  ### 1.4 错误告警及监控

  
  ### 1.5 CGI
  
  | CGI                                | 描述                | CGI开发人员 |
  | ---------------------------------- | ------------------- | --- |
  | [xxx](xxxx) | XXXX          | xxx |
  | [xxx](xxxx)   | XXXX    | xxx |
  
  
  ### 1.6 相关人员
  
  | 角色 | 人员 |
  | --- | --- |
  | 产品经理 | xxx,yyy |
  | 前端开发 | xxx |
  | 后台开发 | xxx,yyy,zzz |
  | 交互设计 | xxx,yyy |
  

  ### 1.7 其他
  
  - [数据上报](xxx)
  - [设计稿](xxx)


  ## 2. 业务介绍

  ### 2.1 xx业务入口

  入口地址为 `xxx`，目前有哪些渠道:

  1. AAA
  2. BBB
  3. CCC
  
  | 页面目录    | 页面描述             | 页面链接                                 | 参数描述                                   |
  | ----------- | -------------------- | ------------------------------------- | ------------------------------------------- |
  | index     | 首页        | https://now.qq.com  | 无                                                |
  
  
  - - -

  ### 2.2 xxx 入口
  
  ...
  
  ## 3. 其他
  
  XXX
  
  > 项目备注
  
========================================================
## ESlint规范
[![npm package](https://img.shields.io/npm/v/eslint-config-ivweb.svg?style=flat-square)](https://www.npmjs.org/package/eslint-config-ivweb)
[![NPM downloads](http://img.shields.io/npm/dt/eslint-config-ivweb.svg?style=flat-square)](https://npmjs.org/package/eslint-config-ivweb)

- Google： [eslint-config-google](https://github.com/google/eslint-config-google)
- airbnb: [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

```
如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

.eslintrc.js
.eslintrc.yaml
.eslintrc.yml
.eslintrc.json
.eslintrc
package.json
```

腾讯IVWEB团队ESLint共享配置规则

## 安装

```
$ npm install --save-dev eslint eslint-plugin-react eslint-config-ivweb
```

## 文档
* [介绍](docs/eslint-standard.md)
* [规则解释](docs/RULE.md)

## 使用
一旦`eslint-config-ivweb`安装成功，你可以通过[ESLint配置文件]((http://eslint.org/docs/user-guide/configuring)) 中的字段extends中使用它

```js
{
  "extends": "ivweb",
  "rules": {
    // Additional, per-project rules...
  }
}
```

### 配合`eslint:recommended`使用`ivweb`
有部分[eslint:recommended](http://eslint.org/docs/rules/)提到的规则在ivweb中没有提到，因此最好配合eslint:recommend一起使用。

只需要同时继承eslint:recommend 和 ivweb 即可，确保 ivweb 放置在最后。部分eslint:recommend定义的规则有点严格，ivweb里面有做定制化的修改。

```js
{
  "extends": ["eslint:recommended", "plugin:react/recommended", "ivweb"],
  "rules": {
    // Additional, per-project rules...
  }
}
```
  

=======================================================
## Git commit日志基本规范
  - https://github.com/feflow/git-commit-style-guide
  ![](https://github.com/feflow/git-commit-style-guide/raw/master/img/git-commit-message-mindmap.png)

  所有的 type 类型如下：

  > type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。

  - feat： 新增 feature
  - fix: 修复 bug
  - docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
  - style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  - refactor: 代码重构，没有加新功能或者修复 bug
  - perf: 优化相关，比如提升性能、体验
  - test: 测试用例，包括单元测试、集成测试等
  - chore: 改变构建流程、或者增加依赖库、工具等
  -revert: 回滚到上一个版本
