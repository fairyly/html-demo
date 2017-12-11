# svn 常见命令


* [Subversion 版本控制手册 [草稿]1.8](http://svnbook.red-bean.com/nightly/zh/svn-book.html#svn.tour.cycle.resolve.diff)

一般使用 TortoiseSVN

* 常用命令:  
  svn update  -- 把仓库上的最新数据同步到本地 的工作副本

  svn add file|dir -- 添加文件或整个目录

  svn checkout -- 获取svn代码

  svn commit  -- 提交本地修改代码

  svn status    -- 查看本地修改代码情况：修改的或本地独有的文件详细信息

  svn merge   -- 合并svn和本地代码

  svn revert   -- 撤销本地修改代码

  svn resolve -- 合并冲突代码

  svn help [command] -- 查看svn帮助，或特定命令帮助
  
  svn diff -- 查看修改的细节
  
  
* 新浪云SVN部署应用步骤
  ```
  1.先在新浪云创建应用，fairy,git仓库地址：https://git.sinacloud.com/fairy   用户名 498745097@qq.com qing1503534781;

  2.打开本地git bash;
	mkdir fairy && cd fairy；
	git init;

  3.在应用的git代码目录里，添加一个新的git远程仓库 sae
	$ git remote add sae https://git.sinacloud.com/fairy

  4.把编辑好的代码放到fairy目录中；

  5.将代码部署到 `sae` 的版本1。
	$ git add .
	$ git commit -m 'Init my first app'
	$ git push sae master:1  （注意master:1就是1分支，分支只能是数字）这一步需要输入用户名和密码


  6.再次部署代码到新浪云，重复步骤，只需要最后一步$ git push sae master:2就可以


  克隆仓库：git clone -o sae https://git.sinacloud.com/fairy
  cd fairy
  切换分支：git checkout 4

  重复3--5，最后一步只需 $git push sae
  
  SVN:
  
  右键–>点击“SVN Checkout”
  svn checkout https://svn.sinacloud.com/newapp
  cd newapp/1
  svn add .
  svn commit -m"add wordpress"
  ```

```
svn 回退/更新/取消至某个版本命令详解

1. 取消Add/Delete

取消文件
svn revert 文件名
取消目录
svn revert --depth=infinity 目录名
2. 回退版本
方法1： 用svn merge
1) 先 svn up，保证更新到最新的版本，如20；
2) 然后用 svn log ，查看历史修改，找出要恢复的版本，如10 。如果想要更详细的了解情况，可以使用svn diff -r 10:20 [文件或目录];
3) 回滚到版本号10：svn merge -r 20:10 [文件或目录]，注意版本号之间的顺序，这个叫反向合并；
4) 查看当前工作版本中的文件，如test.cpp和版本号10中文件的差别：svn diff -r 10 test.cpp， 有差别则手动改之；
5) 若无差别，则提交：svn ci -m“back to r 10，xxxxx” [文件或目录]。这时svn库中会生成新的版本，如21。
方法2: 用svn up
前2步如方法1，然后直接 svn up -r 10。当前的工作版本就是版本10了。但是注意，这时svn库中并不会生成新的版本，下次svn up之后，还是会回到当前的版本。
========================
改动已经被提交（commit）。
用svn merge命令来进行回滚。
回滚的操作过程如下：
1、保证我们拿到的是最新代码：
svn update
假设最新版本号是28。
2、然后找出要回滚的确切版本号：
svn log
假设根据svn log日志查出要回滚的版本号是25，此处的something可以是文件、目录或整个项目
如果想要更详细的了解情况，可以使用svn diff -r 28:25 ""
3、回滚到版本号25：
svn merge -r 28:25 ""
为了保险起见，再次确认回滚的结果：
svn diff ""
发现正确无误，提交。
4、提交回滚：
svn commit -m "Revert revision from r28 to r25,because of ..."
提交后版本变成了29。
将以上操作总结为三条如下：
1. svn update，svn log，找到最新版本（latest revision）
2. 找到自己想要回滚的版本号（rollbak revision）
3. 用svn merge来回滚： svn merge -r : something
更新至某个版本
svn update -r 版本号
svn help update
update (up): 将版本库的修改合并到工作副本中。
用法: update [PATH...]
如果没有指定版本，则将工作副本更新到 HEAD 版本。否则同步到 -r 选项所
指定的版本。
每更新一项就输出一行信息，使用首字符来报告执行的动作。这些字符的含义是:
A 已添加
D 已删除
U 已更新
C 合并冲突
G 合并成功
E 已存在
R 已替换
第一列字符报告项目本身。
```
