# nodejs Node.js 包教不包会 （我的 windows 环境）

1.  搭建 node 环境  
    可以按照教程先安装一个 nvm（ https://github.com/creationix/nvm ）或者自己下载安装 node 安装包  
    nvm 的全称是 Node Version Manager，之所以需要这个工具，是因为 Node.js 的各种特性都没有稳定下来，  
    所以我们经常由于老项目或尝新的原因，需要切换各种版本。  
    
2.  安装 express 
    以管理员运行 cmd  
    npm i -g express（旧版本npm i -g express+版本号）  
    npm i -g express-generator  
    
3. mongodb：
    这个数据库安装很简单，下载地址http://www.mongodb.org/。安装好了，配置环境变量path   d:\momgodb\bin,  
    就在cmd里cd到mongodb安装目录下的bin目录，然后敲命令：  
    mongod --dbpath d:\momgodb\data  --storageEngine=mmapv1  
    连接后浏览器输入：http://127.0.0.1:27017   看到网页中内容说明连接成功    
    --logpath mongodb d:\momgodb\log\log.txt  --install (可以不要--serviceName MongoDB --serviceDisplayName MongoDB)  
    操作完，你会发现，你的电脑的服务里多了一个MongoDB服务，没错，就是它，然后你运行这个服务就行了。  
    
* 创建 express 项目
```
1. express 项目名：express testpro
2. npm i: 安装依赖
3. npm start 
4. 打开浏览器 输入 http://127.0.0.1:3000/ 
```
