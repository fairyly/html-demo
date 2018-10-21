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

- 完成提交
首先，设置一下用户名和 Email，保存快照的时候，会记录是谁提交的。

```
$ git config user.name "用户名" 
$ git config user.email "Email 地址"
```
接下来，要保存当前的目录结构。前面保存对象的时候，只是保存单个文件，并没有记录文件之间的目录关系（哪个文件在哪里）。

git write-tree命令用来将当前的目录结构，生成一个 Git 对象。

```
$ git write-tree

c3b8bb102afeca86037d5b5dd89ceeb0090eae9d
```
上面代码中，目录结构也是作为二进制对象保存的，也保存在.git/objects目录里面，对象名就是哈希值。

看一下这个文件的内容。

```
$ git cat-file -p c3b8bb102afeca86037d5b5dd89ceeb0090eae9d

100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad    test.txt
```
可以看到，当前的目录里面只有一个test.txt文件。

所谓快照，就是保存当前的目录结构，以及每个文件对应的二进制对象。上一个操作，目录结构已经保存好了，现在需要将这个目录结构与一些元数据一起写入版本历史。

git commit-tree命令用于将目录树对象写入版本历史。

```
$ echo "first commit" | git commit-tree c3b8bb102afeca86037d5b5dd89ceeb0090eae9d

c9053865e9dff393fd2f7a92a18f9bd7f2caa7fa
```
上面代码中，提交的时候需要有提交说明，echo "first commit"就是给出提交说明。然后，git commit-tree命令将元数据和目录树，一起生成一个 Git 对象。


Git 提供了git commit命令，简化提交操作。保存进暂存区以后，只要git commit一个命令，就同时提交目录结构和说明，生成快照。




## 参考
- [git 原理](http://www.ruanyifeng.com/blog/2018/10/git-internals.html)
