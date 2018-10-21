# git 原理

本质上，Git是一套内容寻址（content-addressable）文件系统，而和我们直接接触的Git界面，只不过是封装在其之上的一个应用层。

这个关系颇有点类似于计算机网络中应用层和下属层的关系。

在Git中，那些和应用层相关的命令（也就是我们最常用的命令，如git commit、 git push等），我们称之为porcelain命令（瓷器之意，意为成品、高级命令）；

而和底层相关的命令（几乎不会在日常中使用，如git hash-object、git update-index等），则称之为plumbing命令（管道之意，是连接git应用界面和git底层实现的一个管道，类似于shell，底层命令）。

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
