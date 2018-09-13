# Git多分支开发上线合并问题


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

## 参考
- https://blog.csdn.net/daybreak1209/article/details/77063572
