# nodejs Node.js 包教不包会 （我的 windows 环境）

1.  搭建 node 环境  
    可以按照教程先安装一个 nvm（ https://github.com/creationix/nvm ）或者自己下载安装 node 安装包  
    nvm 的全称是 Node Version Manager，之所以需要这个工具，是因为 Node.js 的各种特性都没有稳定下来，  
    所以我们经常由于老项目或尝新的原因，需要切换各种版本。  
    window下使用nvmw控制nodejs的版本: http://www.jianshu.com/p/82c5f3a39559  
    
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

### 1，学习使用外部模块

npm install express utility --save
```
var express = require('express');
var utility = require('utility');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // 从 req.query 中取出我们的 q 参数。
  // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
  // 如果分不清什么是 query，什么是 body 的话，那就需要补一下 http 的知识了
  var q = req.query.q;

  // 调用 utility.md5 方法，得到 md5 之后的值
  // 之所以使用 utility 这个库来生成 md5 值，其实只是习惯问题。每个人都有自己习惯的技术堆栈，
  // 我刚入职阿里的时候跟着苏千和朴灵混，所以也混到了不少他们的技术堆栈，仅此而已。
  // utility 的 github 地址：https://github.com/node-modules/utility
  // 里面定义了很多常用且比较杂的辅助方法，可以去看看
  var md5Value = utility.md5(q);
  console.log(md5Value);
  res.send(md5Value);
});

直接访问 http://localhost:3000/ 会抛错

访问 http://localhost:3000/?q=html 出现 html 的 MD5 值
```
### 2，使用 superagent 与 cheerio 完成简单爬虫

目标：当在浏览器中访问 http://localhost:3000/ 时，输出 CNode(https://cnodejs.org/ ) 社区首页的所有帖子标题和链接，以 json 的形式。

superagent(http://visionmedia.github.io/superagent/ ) 是个 http 方面的库，可以发起 get 或 post 请求。

cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的。

```
npm install --save superagent
npm install --save cheerio

//应用的核心逻辑长这样

var superagent = require('superagent');
var cheerio = require('cheerio');
app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
    });
});
```

### 3. 使用 eventproxy 控制并发

* https://github.com/JacksonTian/eventproxy

```
Node.js中url的详解:

var url = require('url');
var str = 'http://zhufengnodejs:123@github.com:80/2016jsnode?name=zfpx&age=8#top';
var urlObj = url.parse(str,true); //用于将字符串转成对象
console.log(urlObj);
console.log(url.format(urlObj));//用于将对象转成字符串
/**
 protocol: 'http:', 协议
 slashes: true, 是否有//
 auth: 'zhufengnodejs:123', 用户名和密码
 host: 'github.com:80', 主机
 port: '80', 端口
 hostname: 'github.com',域名
 hash: '#top', 片断标识符 指向HTML页面某个DOM元素的ID
 search: '?name=zfpx&age=8', ?+查询字符串
 query: 'name=zfpx&age=8',查询字符串
 pathname: '/2016jsnode', 端口号和？中间的那部分
 path: '/2016jsnode?name=zfpx&age=8', pathname+search
 href: 'http://zhufengnodejs:123@github.com:80/2016jsnode?name=zfpx&age=8#top' 原始的URL
 **/
 url.resolve(from, to)

给定一个基URL路径，和一个href URL路径，并且象浏览器那样处理他们可以带上锚点

url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'

不要在该奋斗的年纪选择去偷懒，只有度过一段连自己都被感动了的日子，才会变成那个最好的自己.

```
```
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);
    
    
    // 得到 topicUrls 之后

      // 得到一个 eventproxy 的实例
      var ep = new eventproxy();

      // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
      ep.after('topic_html', topicUrls.length, function (topics) {
        // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair

        // 开始行动
        topics = topics.map(function (topicPair) {
          // 接下来都是 jquery 的用法了
          var topicUrl = topicPair[0];
          var topicHtml = topicPair[1];
          var $ = cheerio.load(topicHtml);
          return ({
            title: $('.topic_full_title').text().trim(),
            href: topicUrl,
            comment1: $('.reply_content').eq(0).text().trim(),
          });
        });

        console.log('final:');
        console.log(topics);
      });

      topicUrls.forEach(function (topicUrl) {
        superagent.get(topicUrl)
          .end(function (err, res) {
            console.log('fetch ' + topicUrl + ' successful');
            ep.emit('topic_html', [topicUrl, res.text]);
          });
      });
  });
  ```

### 4.《使用 async 控制并发》

 async(https://github.com/caolan/async )
 
 我们在写爬虫的时候，如果有 1000 个链接要去爬，那么不可能同时发出 1000 个并发链接出去对不对？我们需要控制一下并发的数量，比如并发 10 个就好，然后慢慢抓完这 1000 个链接。
 
 要介绍的是 async 的 mapLimit(arr, limit, iterator, callback) 接口。另外，还有个常用的控制并发连接数的接口是 queue(worker, concurrency)，大家可以去 https://github.com/caolan/async#queueworker-concurrency 看看说明。
 
 当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。大部分场景是前者，所以我个人大部分时间是用 eventproxy 的。

```
// 并发连接数的计数器
var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
  // delay 的值在 2000 以内，是个随机的整数
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};

接着来伪造一组链接

var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

使用 async.mapLimit 来并发抓取，并获取结果。

async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});

也可以接着上次爬虫的 
var concurrencyCount = 0;
      var fetchUrl = function (url, callback) {
        var delay = parseInt((Math.random() * 10000000) % 2000, 10);
        concurrencyCount++;
        console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
        setTimeout(function () {
          concurrencyCount--;
          callback(null, url + ' html content');
        }, delay);
      };

      async.mapLimit(topicUrls, 5, function (url, callback) {
        console.log("说这事：",url,callback)
        fetchUrl(url, callback);
      }, function (err, result) {
        console.log('final:');
        console.log(result);
      });
```
