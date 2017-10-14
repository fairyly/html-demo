# svn 常见命令

一般使用 TortoiseSVN

* 常用命令
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

