# nodejs+express+mongo

* 1.node：先下载安装nodejs，下载地址http://www.nodejs.org/，安装好了之后检查是否在系统环境变量里自动配置好了path，如果没有，
  请把node的安装地址配置到path里去。然后在cmd里敲入node，如果可以，那么这一步ok了，很简单吧
* 2.安装express
  - npm i -g express（旧版本npm i -g express+版本号）
  - npm i -g express-generator
  -（如果想本地安装在和npm同一个目录下，先cd到node_modules目录，再使用npm i express-generator命令，然后再将node_modules目录下的./bin配置到环境变量path里去）
  - 测试：
  - express --version 成功的话会显示版本号
* 3. mongodb：这个数据库安装很简单，下载地址http://www.mongodb.org/。安装好了，就在cmd里cd到mongodb安装目录下的bin目录，然后敲命令：
  - mongod –dbpath d:\momgodb\data  
  - 连接后浏览器输入：http://127.0.0.1:27017   
  - 看到网页中内容说明连接成功
  - (可以不要这些--logpath="mongodb安装目录\log\log.txt" --install --serviceName MongoDB --serviceDisplayName MongoDB)
  - 操作完，你会发现，你的电脑的服务里多了一个MongoDB服务，没错，就是它，然后你运行这个服务就行了。
  
## 搭建简单的node+express+mongodb项目

* 先在cmd控制台里cd到一个目录下面，记住这你的workspace，然后是用是用express创建一个app项目
  express hello-world 
* cd到hello-world目录 npm i （这样就会自动将项目需要的依赖modules安装到项目的modules里去了）
* 
  - npm start 启动项目（也可以是node ./bin/www，旧版本直接node app.js，因为具体要看package.json里的启动配置了）
  - 我们可以在浏览器地址栏里敲入 http://127.0.0.1:3000/ 这就是你的第一个express创建的node app。
  
* 研究下express创建项目
  - 你需要了解的项目主要目录为：routes和views，你最好再在项目里新建一个目录叫models（作用后面讲）
  - routes里index.js配置的都是get和post请求的路径映射关系，很简单的哦。
  - views里index.ejs就相当于一个html文件，里面就是一些html标签和<%%>标签，感觉和jsp差不多哦。
  - 看起来不错的样子，标准的MVC框架（models里放模型，views里面放展示，routes里面放控制）
  
* cmd命令行里：
  - mongo //进入数据库
  - use hello-world //创建项目数据库
  - db.addUser("shuaige", "123456") //给这个数据库创建了一个叫帅哥的账号，密码123456 （但是我觉得可能我理解的不到位，你也可以不做这个操作）
  - 然后，我们就为这个hello-world数据库创建collection（collection就相当于oracle和mysql里的table）
  - db.createCollection("users") //创建一个集合，也就是表
  - db.users.insert({userid: "admin", password: "123456"}) //给users里添加一个文档，也就是一条记录账号admin，密码123456
  - ok，现在检查一下：
  - db.users.find() //如果看到你刚刚添加的文档记录，就ok咯

  简单的数据库集合以及文档设置好，我们就回到express创建的node项目里，我们需要：   

  - 在models下创建一个user.js,作为实体类映射数据库的users集合 
  - 在views下做几个页面（可以用ejs也可以用html，我就用ejs吧）
  - 在routes下的index.js配置路由，也就是请求映射处理
  - 在models下创建一个user.js,作为实体类映射数据库的users集合 
  
  
  
  
## express 路由配置

```
一、为Express添加about路由

1、新建js文件，about.js

2、打开about.js，并输入以下代码：

var express=require('express');

var router=express.Router();

router.get('/',function(req,res,next){

　　res.send('Hello from the about route!');

});

module.exports=router;

2、打开app.js,然后输入以下代码：

var about=require('./routes/about');

app.use('/about',about);

3、在浏览器输入：http://127.0.0.1:3000/about，然后回车，如果显示Hello from the about route!,表示路由配置成功。

二、添加Post路由

1、打开app.js,然后输入以下代码：

app.post('/',function(req,res,next){

　　res.send(req.body);

});

```

