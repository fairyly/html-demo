# Git 工作流及常见操作


## git merge

```
git clone ****

git add . && git commit -m 'feat: 增加***'
git push origin master

合并

git merge --no-ff master,把主分支合并到自己的分支里
```


## git rebase

```
git clone ****

git add . && git commit -m 'feat: 增加***'
git push origin master


合并当前分支的提交记录

1.如果想合并最近三次的提交修改为: git rebase -i HEAD~3
  弹出一个编辑器
 第二行以后的 pick 改为 s “s” 为 “squash” 的缩写

 “squash” 的意思是 将倒数第二次提交 压缩为最后一次提交
 
 :wq // 保存退出
 
 然后会弹出编辑器，将 This is the commit message #2 下面的内容都改成空的


2.rebase 某个分支合并：git rebase -i origin/master
  下面操作和 1 类似

  遇到冲突，解决冲突，git add . && git rebase --continue
 
```


## 多人同一分支开发

```
git add . && git commit -m 'feat: 增加***'

git pull -rebase
git push origin master
```


## 暂存本地

```
git stash

# 应用暂存
git stash pop  #应用第一个
```

## 修改提交信息

```
git commit --amend -m 'feat: ***'


# 修改多个提交信息,相当于合并多次提交
git rebase -i HEAD~3
```


## 回退

```
git reset --hard HEAD^  

# 在 reset --hard 后，所有的改动都被擦掉了

git reset --soft HEAD^


这就是--soft 和 --hard 的区别：--hard 会清空工作目录和暂存区的改动,*而 --soft则会保留工作目录的内容，并把因为保留工作目录内容所带来的新的文件差异放进暂存区

# 指定版本回退
1、在gitlab上找到要恢复的版本号，如：

139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96 

2、在客户端执行如下命令（执行前，先将本地代码切换到对应分支）：

git reset --hard 139dcfaa558e3276b30b6b2e5cbbb9c00bbdca96 

3、强制push到对应的远程分支（如提交到develop分支）

git push -f -u origin develop


# git revert
1、找到你误提交之前的版本号

2、git revert -n 版本号

3、git commit -m xxxx 提交

4、git push 推送到远程
```
