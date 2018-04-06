### gitbook 使用

### 安装
```
  npm install -g gitbook-cli
  
  使用 gitbook init 初始化书籍目录
  使用 gitbook serve 编译书籍
```

### Token

```
be87tttbttd
git config --global gitbook.user fairyly
git config --global gitbook.token be87tttbttd

每次 clone 需要输入 fairyly  和 be87tttbttd
```

### 常用命令

```
gitbook init //初始化目录文件
gitbook help //列出gitbook所有的命令
gitbook --help //输出gitbook-cli的帮助信息
gitbook build //生成静态网页
gitbook serve //生成静态网页并运行服务器
gitbook build --gitbook=2.0.1 //生成时指定gitbook的版本, 本地没有会先下载
gitbook ls //列出本地所有的gitbook版本
gitbook ls-remote //列出远程可用的gitbook版本
gitbook fetch 标签/版本号 //安装对应的gitbook版本
gitbook update //更新到gitbook的最新版本
gitbook uninstall 2.0.1 //卸载对应的gitbook版本
gitbook build --log=debug //指定log的级别
gitbook builid --debug //输出错误信息
```


### 克隆 gitbook 本地查看
```
  git clone https://git.gitbook.com/fairyly/node-js-blockchain-dev.git
  输入 用户名： fairyly 和 token ：be87tttbttd
  
  cd node-js-blockchain-dev
  gitbook serve
  Serving book on http://localhost:4000


```

### 绑定域名

```
settting-->domains   如：https://legacy.gitbook.com/book/fairyly/node-js-blockchain-dev/settings/domains
```

### 插件

```
gitbook 还支持许多插件，用户可以从 NPM 上搜索 gitbook 的插件，gitbook 文档 推荐插件的命名方式为：

gitbook-plugin-X: 插件
gitbook-theme-X: 主题
所以，可以通过以上两种方式来搜索 gitbook 的插件或者主题。
```

### 发布到 GitHub Pages

```
gh-pages, 保存书籍编译后的 HTML 文件
构建书籍
首先，使用 gitbook build 将书籍内容输出到默认目录，也就是当前目录下的 _book 目录。

$ gitbook build
Starting build ...
Successfully built!

$ ls _book
GLOSSARY.html       chapter1            chapter2            gitbook             glossary_index.json index.html          search_index.json
创建 gh-pages 分支
执行如下命令来创建分支，并且删除不需要的文件：

$ git checkout --orphan gh-pages
$ git rm --cached -r .
$ git clean -df
$ rm -rf *~
现在，目录下应该只剩下 _book 目录了，首先，忽略一些文件：

$ echo "*~" > .gitignore
$ echo "_book" >> .gitignore
$ git add .gitignore
$ git commit -m "Ignore some files"
然后，加入 _book 下的内容到分支中：

$ cp -r _book/* .
$ git add .
$ git commit -m "Publish book"
上传书籍内容到 GitHub
现在，可以将编译好的书籍内容上传到 GitHub 中 test 项目的 gh-pages 分支了，虽然这里还没有创建分支，上传和创建会一步完成！

$ git push -u origin gh-pages
Counting objects: 49, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (45/45), done.
Writing objects: 100% (49/49), 1.34 MiB | 131.00 KiB/s, done.
Total 49 (delta 5), reused 0 (delta 0)
To https://github.com/***/test.git
 * [new branch]      gh-pages -> gh-pages
Branch gh-pages set up to track remote branch gh-pages from github.
现在，书籍的内容已经上传到 GitHub 上，所以通过访问 ***.github.io/test 就可以阅读 test 这本书了！


注意：由于将 ***.github.io 重定向到了个人站点 www.***.cn，所以可以看到，浏览器中的 URL 自动变成了 www.***.cn/test，非常 cool! 关于怎样重定向 GitHub Pages 到个人域名
```


### 参考

* GitBook 简明教程：http://www.chengweiyang.cn/gitbook/index.html
