# 腾讯IVWEB前端工作流和规范

* https://github.com/feflow
* doc: http://www.feflowjs.org/zh-cn/docs/


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
