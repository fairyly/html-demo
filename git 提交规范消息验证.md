# git 提交规范消息验证

- ghooks： https://github.com/ghooks-org/ghooks
- validate-commit-msg：这个库已经被弃用，改用：https://github.com/marionebl/commitlint

## Git提交规范

代码有编写规范，Git提交的信息当然也要有规范啦。
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
type用于说明本次提交的类型：

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

scope用于说明本次改动涉及的范围，如数据层、控制层，选填。  
subject为本次提交的简要概述。   
这里是一个栗子：
```
fix(model): fix something

- fix first bug
- fix second bug

```
## 验证Git提交信息
使用ghooks和validate-commit-msg可以在git提交时检查信息。
```
"ghooks": {
  "pre-commit": "npm run eslint && npm test",  // 提交前检查代码格式和运行测试用例
  "commit-msg": "validate-commit-msg"  // 提交时验证提交信息是否符合格式
}
```
但还需要一个验证规则的文件.vcmrc：
```
{
  "types": [
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "build",
    "ci",
    "chore",
    "revert"
  ],
  "scope": {
    "required": false,
    "allowed": [
      "*"
    ],
    "validate": false,
    "multiple": false
  },
  "warnOnFail": false,
  "maxSubjectLength": 100,
  "subjectPattern": ".+",
  "subjectPatternErrorMsg": "subject does not match subject pattern!",
  "helpMessage": "",
  "autoFix": false
}
```
这样就可以检验提交信息是否符合格式，不符合是不能提交成功的



## 参考
- https://juejin.im/post/5b5d4e9cf265da0f5d4ce0aa#heading-6
