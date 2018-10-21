# git 原理

- 二、保存对象
git hash-object命令把test.txt的当前内容压缩成二进制文件，存入 Git。压缩后的二进制文件，称为一个 Git 对象，保存在.git/objects目录。

- 三、暂存区
git update-index命令用于在暂存区记录一个发生变动的文件。

```
$ git update-index --add --cacheinfo 100644 \
3b18e512dba79e4c8300dd08aeb37f8e728b8dad test.txt
```

- git add 命令
上面两步（保存对象和更新暂存区），如果每个文件都做一遍，那是很麻烦的。Git 提供了git add命令简化操作。


## 参考
- [git 原理](http://www.ruanyifeng.com/blog/2018/10/git-internals.html)
