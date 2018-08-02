#  问题

- fatal: unable to access 'https://github.com/fairyly/scratch-gui-demo.git/': Empty reply from server

1.获取Github相关网站的ip

访问https://www.ipaddress.com，找到页面中下方的“IP Address Tools - Quick Links”，
分别输入github.global.ssl.fastly.net和github.com，查询ip地址。

2.修改本地host文件

以Mac为例，命令行下输入：sudo vi /etc/host，然后输入电脑的密码，打开host文件。

3.增加host映射

参考如下，增加github.global.ssl.fastly.net和github.com的映射。

151.101.113.194 github.global.ssl.fastly.net

192.30.253.112 github.com

4.更新DNS缓存

命令行输入：sudo dscacheutil -flushcache，使增加的映射生效

##  RPC failed; curl 56 OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054

- `git config http.postBuffer 524288000`

这里命令设置了通信缓存大小，之前发生错误是同步数据过大导致
