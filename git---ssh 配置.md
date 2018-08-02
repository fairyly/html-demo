# 生成 SSH Key 免密码提交 GitHub

### Step1. 检查是否已经存在 SSH Key

运行 Git Bush 客户端，执行以下代码：


$ ls -al ~/.ssh 
#如果存在，将会列出.ssh 目录下的所有文件

#如果不存在则会给出如下提示
```
ls: cannot open directory /Users/you/.ssh: Permission denied
```
检查列出来的目录，看看是否已经有了一个 SSH Key。默认情况下，key 的文件名是下列之一：
```
> id_dsa.pub 
> id_ecdsa.pub 
> id_ed25519.pub 
> id_rsa.pub 
```
如果已经存在(如 id_rsa 和 id_rsa.pub)而且你想使用已经存在的密钥对直接连接 GitHub ，那么可以跳过 Step2，直接进入 Step3

### Step2. 生成 SSH Key

复制下面的代码(记得请将email修改成自己的email地址)：

```
$ ssh-keygen -t rsa -b 4096 -C "your_name@example.com" 
Generating public/private rsa key pair.
```
这里 GitHub 的建议是保持默认，所以只需要按 Enter 继续：

```
Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press Enter]
```
如果存在，将会提示是否覆盖：

```
/Users/you/.ssh/id_rsa already exists.
Overwrite (y/n)?
```
继续后会提示输入密码：

```
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```
然后你就会得到你的 SSH Key 的指纹，看起来像下面的代码：

```
Your identification has been saved in /Users/you/.ssh/id_rsa.
Your public key has been saved in /Users/you/.ssh/id_rsa.pub.
The key fingerprint is:
01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```
### Step3. 添加 SSH Key 到 GitHub

先拷贝 id_rsa.pub 文件的内容，可以用编辑器打开然后复制，也可以用 git 命令复制：

1
$ clip < ~/.ssh/id_rsa.pub
进入 GitHub 账户设置，点击左边 SSH Key ，点击 Add SSH key ，粘贴刚刚复制的内容，然后保存。
输入 GitHub 账户的密码就能看到刚刚添加的 SSH Key 了。

Step4. 测试是否添加成功

在 Git Bush 中输入下面的代码，然后回车

```
$ ssh -T git@GitHub.com
# Attempts to ssh to GitHub
```
会得到如下的指纹提示：键入yes

```
The authenticity of host 'GitHub.com (207.97.227.239)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?
```
如果出现下面的提示，恭喜你，验证成功。


Hi username! You've successfully authenticated, but GitHub does not provide shell access.
如果你看到的是 access denied(拒绝访问) ，可以点击这里 ，查看解决办法。

然后将https替换成ssh重新下载下代码，就OK了~~~



## git clone 错误
- github clone fatal: unable to access '': OpenSSL SSL_r       
  - 有人说设置 `git config --global http.sslVerify false`

## 参考文档

Generating SSH keys:https://help.github.com/articles/connecting-to-github-with-ssh/
