# git changlog 生成


>conventional-changelog 就是生成 Change log 的工具.


## useage

```
$ npm install -g conventional-changelog-cli

$ cd my-project

$ conventional-changelog -p angular -i CHANGELOG.md -s
```


## 修改 package.json 文件 做法： `npm version`

我们可以把命令放在script里面：

修改package.json文件，在script中添加

```
{
  "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"
  }
```


- 做一次提交来试试看:
```
git add .
git commit -m "feat: 添加生成changelog功能"
```

然后运行：

```
npm run version
```

之后看到 CHANGELOG.md 文件有了我们的提交日志


## 参考
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#readme)
