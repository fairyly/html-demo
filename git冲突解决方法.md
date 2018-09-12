# git冲突解决方法


团队中每个人对一个分支的内容修改后，推送到远程分支，难免会遇到冲突的时候，

一个人把一段代码更改后推送了，另一个人也把前一个修改代码的地方 也做了修改，这时候就会有冲突

git add .  
git commit -m '修改***功能'  
git push origin master  

这时候推送的时候就会提示:    ! [rejected]        master -> master (fetch first)

因为远程分支已经变了

然后执行 git pull --rebase

这时候推送的时候就会提示:

```
Falling back to patching base and 3-way merge...
Auto-merging ******  //这里就出现冲突的文件名
CONFLICT (content): Merge conflict in ******//这里就出现冲突的文件名
error: Failed to merge in the changes.
Patch failed at 0001 testmod //这里提交时带的消息

```

这时候查看差异  git diff 就会看到冲突的位置，修改冲突后 git add .

然后   git rebase --continue /或者 git rebase --abort



然后再去 commit push
