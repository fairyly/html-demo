# git 遇到的问题汇总


## `fatal: Could not reset index file to revision 'HEAD'.`
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
