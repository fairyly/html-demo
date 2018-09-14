# Git多分支开发上线合并问题


##  master dev1 dev2

### rebase 合并

master 分支是基准干净分支

dev1 开发提交东西了

dev2 也有改动没提交,  就先 `git rebase dev1`

```
git pull --rebase
git add .
git commit -m 'add'
git push origin dev2

这时候 dev2 中已经包含 dev1 中所有提交了
```

切换 master:

```
git chekout master
git rebase dev2
git push origin master

这时候 master 已经包含 dev1 和 dev2 的所有提交了 ,应该说是最新代码了
```

可是 dev1 中代码还不是 master 中所有的代码

```
git checkout dev1
git rebase master
git push origin dev1

这时候 dev1 dev2 master 分支代码都是一样的了
```






一、项目背景：

项目AB分支同时进行开发时，A分支开发过程中有其他分支B上线，并且B分支上线版本已同步（merge）到master，

则须合并已上线版本到正在开发的分支A上，避免A分支上线时覆盖B分支的代码，导致功能倒退。

二、命令行合并步骤：

方案一：
```
1.克隆配置库到本地：
git clone 【git url】 【本地路径】
2.切换到开发分支A：
git checkout 【开发分支】
3.合并master到开发分支(因为B已经同步到master，于是将master合并到A，保证A上涵盖B以上线的最新代码)：
git merge --no-ff master
4.将合并后代码推送到远程库：
git push origin 【开发分支】

以上步即已经完成B分支上线后，将代码同步到master，再将master代码合并给A的操作。根据公司要求，还需要打tag标识。

5.打合并后标签，合并标签命名规则：tag/Tag_git库名_模块名称_三位版本名称_merge_四位版本名称   例如：tag/Tag_pmo_testgit-dwf_6-0-11_merge_6-0-9-2
git tag -a 【mergetagname】 -m 'create merge tag ,name is 【mergetagname】'
6..将标签推送到远程库：
git push origin 【mergetagname】
7.手工合并完成
```



- 查看分支及主干流程图: git log --graph --pretty=oneline --abbrev-commit


```
git pull origin master

合并命令行:

快进合并 master 分支，使之包含来自 client 分支的修改

将 server 分支中的修改也整合进来。 使用 git rebase [basebranch] [topicbranch] 命令可以直接将特性分支（即本例中的 server）变基到目标分支（即 master）上。

这样做能省去你先切换到 server 分支，再对其执行变基命令的多个步骤。

$ git rebase master server


server 中的代码被“续”到了 master 后面。


 将 server 中的修改变基到 master 上
然后就可以快进合并主分支 master 了：

$ git checkout master
$ git merge server

client 和 server 分支中的修改都已经整合到主分支里了，你可以删除这两个分支，：

$ git branch -d client
$ git branch -d server

通过测试发现

需要先 merge 到 master,再  git rebase master dev1

在 push 

___________________________________________________



sourvetree 合并分支: 

先到 master 分支

选择 合并 dev 到 master 分支

切换 dev 分支

选择 将当前变更变基到 master分支


将开发分支变基到 master分支


feat： 新增 feature
fix: 修复 bug
docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
refactor: 代码重构，没有加新功能或者修复 bug
perf: 优化相关，比如提升性能、体验
test: 测试用例，包括单元测试、集成测试等
chore: 改变构建流程、或者增加依赖库、工具等 
revert: 回滚到上一个版本
```







## 参考
- https://blog.csdn.net/daybreak1209/article/details/77063572
