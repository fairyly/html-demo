# Git rebase "unable to create file" "Permission denied"

```
在 master 分支

git rebase dev 

提示：
First, rewinding head to replay your work on top of it...
error: unable to create file static/css/public.css: Permission denied
error: unable to create file static/font/iconfont.css: Permission denied

```


- 解决

```
关闭 IDE Visual Studio Code

切换到 dev 分支

补被删除的文件

再重新切换 master 分支，再合代码

git rebase dev 
```
