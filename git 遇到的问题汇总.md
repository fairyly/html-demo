# git 遇到的问题汇总


## 1.`fatal: Could not reset index file to revision 'HEAD'.`
```
$ git reset --hard origin/master
error: unable to unlink old 'Library/Homebrew/macos/xcode.rb' (Permission denied)
fatal: Could not reset index file to revision 'origin/master'.
$ sudo !!
sudo git reset --hard origin/master
Password:
HEAD is now at 97302bf xrootd 3.2.2
```

- 参考：[brew-update-failure-while-executing-git-checkout](https://stackoverflow.com/questions/9370552/brew-update-failure-while-executing-git-checkout)

## 2.`Git：The following untracked working tree files would be overwritten by merge`

```
git clean -d -fx


延伸阅读
$ git clean -f -n         # 1
$ git clean -f            # 2
$ git clean -fd           # 3
$ git clean -fX           # 4
$ git clean -fx           # 5

(1): 选项-n将显示执行（2）时将会移除哪些文件。
(2): 该命令会移除所有命令（1）中显示的文件。
(3): 如果你还想移除文件件，请使用选项-d。
(4): 如果你只想移除已被忽略的文件，请使用选项-X。
(5): 如果你想移除已被忽略和未被忽略的文件，请使用选项-x。
```
- 参考： [The following untracked working tree files would be overwritten by merge](https://www.jianshu.com/p/7b1c58e0a9ef)
