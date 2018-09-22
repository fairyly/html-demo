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


## 参考
- https://stackoverflow.com/questions/33911379/git-rebase-fatal-needed-a-single-revision-invalid-upstream-i

