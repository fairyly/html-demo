# git rebase 遇到的问题


```
git rebase dev

出现

fatal: Needed a single revision
invalid upstream 'gh-pages'

最后 

git branch --set-upstream-to=origin/master

git rebase -i --root

```

- `There is no tracking information for the current branch`

```
git pull --rebase 出现的
因为本地分支和远程分支没有建立联系 (使用git branch -vv 可以查看本地分支和远程分支的关联关系) .


解决: 
根据命令行提示只需要执行以下命令即可
git branch --set-upstream-to=origin/远程分支的名字 本地分支的名字


指定当前工作目录工作分支，跟远程的仓库，分支之间的链接关系。

在此之前，我们必须要指定想要push或者pull的远程分支。

devzkndeMacBook-Pro:guangyouqian devzkn$ git pull origin develop
devzkndeMacBook-Pro:guangyouqian devzkn$ git branch --set-upstream-to=origin/develop develop
Branch develop set up to track remote branch develop from origin.


参考: https://segmentfault.com/a/1190000012232288
```


## 参考
- https://stackoverflow.com/questions/33911379/git-rebase-fatal-needed-a-single-revision-invalid-upstream-i

