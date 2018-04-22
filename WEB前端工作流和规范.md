# 腾讯IVWEB前端工作流和规范

* https://github.com/feflow
* doc: http://www.feflowjs.org/zh-cn/docs/

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
  | ----------- | -------------------- | ------------------------------------- | ---------------------------------  ---------- |
  | index     | 首页        | https://now.qq.com  | 无                                                |
  
  
  - - -

  ### 2.2 xxx 入口
  
  ...
  
  ## 3. 其他
  
  XXX
  
  > 项目备注
  

## ESlint规范
  

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
