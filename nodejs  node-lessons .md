# nodejs Node.js 包教不包会 （我的 windows 环境）

- nodejs 官网: https://nodejs.org/zh-cn/
- 脚本性能分析:https://jsperf.com/

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

* 大家去装个 nodemon https://github.com/remy/nodemon 。
```
$ npm i -g nodemon

这个库是专门调试时候使用的，它会自动检测 node.js 代码的改动，然后帮你自动重启应用。在调试时可以完全用 nodemon 命令代替 node 命令。

$ nodemon app.js 启动我们的应用试试，然后随便改两行代码，就可以看到 nodemon 帮我们重启应用了。
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


### 5.测试用例：mocha，should，istanbul

* 学习使用测试框架 mocha : http://mochajs.org/
* 学习使用断言库 should : https://github.com/tj/should.js
* 学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
* 简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886
```
npm install mocha -g
npm i istanbul -g
npm i should -g

1.建立我们的 main.js 文件，编写 fibonacci 函数。
var fibonacci = function (n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0');
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
};

 exports.fibonacci = fibonacci;
 
 在 test/main.test.js 中引用我们的 main.js
 var main = require('../main');
var should = require('should');

describe('test/main.test.js', function () {
  it('should equal 0 when n === 0', function () {
    main.fibonacci(0).should.equal(0);
  });

  it('should equal 1 when n === 1', function () {
    main.fibonacci(1).should.equal(1);
  });

  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });

  it('should throw when n > 10', function () {
    (function () {
      main.fibonacci(11);
    }).should.throw('n should <= 10');
  });

  it('should throw when n < 0', function () {
    (function () {
      main.fibonacci(-1);
    }).should.throw('n should >= 0');
  });

  it('should throw when n isnt Number', function () {
    (function () {
      main.fibonacci('呵呵');
    }).should.throw('n should be a Number');
  });
});

直接执行

$ mocha


安装一个 istanbul : $ npm i istanbul -g

执行 $ istanbul cover _mocha

这会比直接使用 mocha 多一行覆盖率的输出，
不完美的地方就在于 mocha 和 istanbul 版本依赖的问题
```

### 6. 浏览器端测试：mocha，chai，phantomjs

* 学习使用测试框架 mocha 进行前端测试 : http://mochajs.org/
* 了解全栈的断言库 chai: http://chaijs.com/
* 了解 headless 浏览器 phantomjs: http://phantomjs.org/

```
首先搭建一个测试原型，用 mocha 自带的脚手架可以自动生成。

cd vendor            # 进入我们的项目文件夹
npm i -g mocha       # 安装全局的 mocha 命令行工具
mocha init .         # 生成脚手架
mocha就会自动帮我们生成一个简单的测试原型, 
其中 index.html 是单元测试的入口，tests.js 是我们的测试用例文件。

直接在 index.html 插入上述示例的 fibonacci 函数以及断言库 chaijs。

然后在tests.js中写入对应测试用例

var should = chai.should();
describe('simple test', function () {
  it('should equal 0 when n === 0', function () {
    window.fibonacci(0).should.equal(0);
  });
});

打开index.html，可以发现测试结果，我们完成了浏览器端的脚本测试

使用mocha-phantomjs帮助我们在命令行运行测试。

首先安装mocha-phantomjs

npm i -g mocha-phantomjs
然后在 index.html 的页面下加上这段兼容代码

<script>mocha.run()</script>
改为

<script>
  if (window.initMochaPhantomJS && window.location.search.indexOf('skip') === -1) {
    initMochaPhantomJS()
  }
  mocha.ui('bdd');
  expect = chai.expect;
  
  mocha.run();
</script>
这时候, 我们在命令行中运行

mocha-phantomjs index.html --ssl-protocol=any --ignore-ssl-errors=true

更进一步，我们可以直接在 package.json 的 scripts 中添加 (package.json 通过 npm init 生成，这里不再赘述)

"scripts": {
  "test": "mocha-phantomjs index.html --ssl-protocol=any --ignore-ssl-errors=true"
},
将mocha-phantomjs作为依赖

npm i mocha-phantomjs --save-dev
直接运行

npm test


```

### 7测试用例：supertest

Nodeclub 里面的测试使用的技术跟前面介绍的是一样的，should mocha supertest 那套，应该是很容易看懂的:

nodeclub: test https://github.com/cnodejs/nodeclub/blob/master/test/controllers/topic.test.js

学习 supertest 的使用 (https://github.com/tj/supertest )

将使你有一个 app: var app = express();，想对它的 get 啊，post 接口啊之类的进行测试，  
那么只要把它传给 supertest：var request = require('supertest')(app  
之后调用 requset.get('/path') 时  
就可以对 app 的 path 路径进行访问了   
它的 API 参照 superagent 的来就好了：http://visionmedia.github.io/superagent/ 。  

API 是一模一样的。superagent 是用来抓取页面用的，  
而 supertest，是专门用来配合 express （准确来说是所有兼容 connect 的 web 框架）进行集成测试的


```
 request
   .post('/api/pet')
   .send({ name: 'Manny', species: 'cat' })
   .set('X-API-Key', 'foobar')
   .set('Accept', 'application/json')
   .then(function(res) {
      alert('yay got ' + JSON.stringify(res.body));
   });
   
   
   request
   .get('/search')
   .then(function(res) {
      // res.body, res.headers, res.status
   })
   .catch(function(err) {
      // err.message, err.response
   });
```
  - 关于 cookie 持久化
  有两种思路

1.在 supertest 中，可以通过 var agent = supertest.agent(app) 获取一个 agent 对象，这个对象的 API 跟直接在 superagent 上调用各种方法是一样的。agent 对象在被多次调用 get 和 post 之后，可以一路把 cookie 都保存下来。
```
var supertest = require('supertest');
var app = express();
var agent = supertest.agent(app);

agent.post('login').end(...);
// then ..
agent.post('create_topic').end(...); // 此时的 agent 中有用户登陆后的 cookie
```
2.在发起请求时，调用 .set('Cookie', 'a cookie string') 这样的方式。
```
var supertest = require('supertest');
var userCookie;
supertest.post('login').end(function (err, res) {
    userCookie = res.headers['set-cookie']
  });
// then ..

supertest.post('create_topic')
  .set('cookie', userCookie)
  .end(...)
```
这里有个相关讨论：https://github.com/tj/supertest/issues/46


### 8 正则表达式

/some/(i/m/g)

* i 的意义是不区分大小写
* g 的意义是，匹配多个
* m 的意义是，是 ^ 和 $ 可以匹配每一行的开头。

在 js 中，g flag 会影响 String.prototype.match() 和 RegExp.prototype.exec() 的行为

String.prototype.match() 中，返回数据的格式会不一样，加 g 会返回数组，不加 g 则返回比较详细的信息
```
> 'hello hell'.match(/h(.*?)\b/g)
[ 'hello', 'hell' ]
```

RegExp.prototype.exec() 中，加 g 之后，如果你的正则不是字面量的正则，而是存储在变量中的话，特么的这个变量就会变得有记忆！！
```
> /h(.*?)\b/g.exec('hello hell')
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]
> /h(.*?)\b/g.exec('hello hell')
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]


> var re = /h(.*?)\b/g;
undefined
> re.exec('hello hell')
[ 'hello',
  'ello',
  index: 0,
  input: 'hello hell' ]
> re.exec('hello hell')
[ 'hell',
  'ell',
  index: 6,
  input: 'hello hell' ]
>
```

第三，大家知道，. 是不可以匹配 \n 的。如果我们想匹配的数据涉及到了跨行，比如下面这样的。
```
var multiline = require('multiline');

var text = multiline.stripIndent(function () {
/*
    head
    ```
    code code2 .code3```
    ```
    foot
*/
});
```


### 9 benchmark

https://github.com/bestiejs/benchmark.js


### 10  《线上部署：heroku》

详细介绍：https://github.com/fairyly/html-demo/blob/gh-pages/heroku.md

### 11 持续集成平台：travis

学习使用 travis-ci 对项目进行持续集成测试 (https://travis-ci.org/ )：`github授权登录即可`

为什么要使用 travis 这样的平台，是因为它可以让你明白自己的项目在一个“空白环境”中，是否能正确运行；也可以让你知道，用不同的 Node.js 版本运行的话，有没有兼容性问题。

travis 应该是把虚拟机的技术玩得比较好，它每次跑测试时，都会提供一个空白的环境。这个环境只有 Linux 基本的 build-essential 和 wget、git 那些依赖。连 Node.js 的运行时都是现跑现安装的。

需要给出一些配置信息，配置信息以 .travis.yml 文件的形式放在项目根目录，比如一个简单的 .travis.yml。
```
language: node_js
node_js:
 - '0.8'
 - '0.10'
 - '0.11'

script: make test
```
这个文件传递的信息是：

* 这是一个 node.js 应用
* 这个测试需要用 0.8、0.10 以及 0.11 三个版本来跑
* 跑测试的命令是 make test
将这个文件添加到项目的根目录下，再 push 上 github，这时候 travis 就会被触发了。

行覆盖率的那个 badge 是由一个叫 coveralls(https://coveralls.io/ ) 的服务提供的可以试着自己接入

如果你的应用有使用到数据库, 需要在 .travis.yml 中添加一些内容.

以 MongoDB 为例:
```
services:
    mongodb
```
其它数据库详细内容参考travis 官方文档:https://docs.travis-ci.com/user/database-setup/


### 10 Mongodb 与 Mongoose 的使用

32位系统已经不支持 安装Mongodb  
64位可以

mongoose 是个 odm。odm 的概念对应 sql 中的 orm。也就是 ruby on rails 中的 activerecord 那一层。orm 全称是 Object-Relational Mapping，对象关系映射；而 odm 是 Object-Document Mapping，对象文档映射。

```
mongoose 的官网给出了类似这样一个示例，我改造了一下：

// 首先引入 mongoose 这个模块
var mongoose = require('mongoose');
// 然后连接对应的数据库：mongodb://localhost/test
// 其中，前面那个 mongodb 是 protocol scheme 的名称；localhost 是 mongod 所在的地址；
// 端口号省略则默认连接 27017；test 是数据库的名称
// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
// 关于 mongodb 的安全性，mongodb 我印象中安全机制很残废，用户名密码那套都做得不好，更
// 别提细致的用户权限控制了。不过不用担心，mongodb 的默认配置只接受来自本机的请求，内网都连不上。
// 当需要在内网中为其他机器提供 mongodb 服务时，或许可以去看看 iptables 相关的东西。
mongoose.connect('mongodb://localhost/test');

// 上面说了，我推荐在同一个 collection 中使用固定的数据形式。
// 在这里，我们创建了一个名为 Cat 的 model，它在数据库中的名字根据传给 mongoose.model 的第一个参数决定，mongoose 会将名词变为复数，在这里，collection 的名字会是 `cats`。
// 这个 model 的定义是，有一个 String 类型的 name，String 数组类型的 friends，Number 类型的 age。
// mongodb 中大多数的数据类型都可以用 js 的原生类型来表示。至于说 String 的长度是多少，Number 的精度是多少。String 的最大限度是 16MB，Number 的整型是 64-bit，浮点数的话，js 中 `0.1 + 0.2` 的结果都是乱来的。。就不指望什么了。。
// 这里可以看到各种示例：http://mongoosejs.com/docs/schematypes.html
var Cat = mongoose.model('Cat', {
  name: String,
  friends: [String],
  age: Number,
});

// new 一个新对象，名叫 kitty
// 接着为 kitty 的属性们赋值
var kitty = new Cat({ name: 'Zildjian', friends: ['tom', 'jerry']});
kitty.age = 3;

// 调用 .save 方法后，mongoose 会去你的 mongodb 中的 test 数据库里，存入一条记录。
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});

可以验证一下

$ mongo
MongoDB shell version: 2.6.4
connecting to: test
> show dbs
> use test
> show collections
> db.cats.find()
会发现里面就有一条记录了。
```

示例程序  
Nodeclub 是使用 Node.js 和 MongoDB 开发的社区系统

https://github.com/cnodejs/nodeclub

### 11 cookie 和 session

express 在 4.x 版本之后，session管理和cookies等许多模块都不再直接包含在express中，而是需要单独添加相应模块。

express4 中操作 cookie 使用 cookie-parser 模块(https://github.com/expressjs/cookie-parser )。
```
var express = require('express');
// 首先引入 cookie-parser 这个模块
var cookieParser = require('cookie-parser');

var app = express();
app.listen(3000);

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串（下面会提到 signedCookies）
// options 传入上面介绍的 cookie 可选参数
app.use(cookieParser());

app.get('/', function (req, res) {
  // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
  // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
  if (req.cookies.isVisit) {
    console.log(req.cookies);
    res.send("再次欢迎访问");
  } else {
    res.cookie('isVisit', 1, {maxAge: 60 * 1000});
    res.send("欢迎第一次访问");
  }
});
```
**session**

session 可以存放在 1）内存、2）cookie本身、3）redis 或 memcached 等缓存中，或者4）数据库中。线上来说，缓存的方案比较常见，存数据库的话，查询效率相比前三者都太低，不推荐；cookie session 有安全性问题，下面会提到。

express 中操作 session 要用到 express-session (https://github.com/expressjs/session ) 这个模块，主要的方法就是 session(options)，其中 options 中包含可选参数，主要有：
```
name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
cookie: 设置存放 session id 的 cookie 的相关选项，默认为
(default: { path: '/', httpOnly: true, secure: false, maxAge: null })
genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
rolling: 每个请求都重新设置一个 cookie，默认为 false。
resave: 即使 session 没有被修改，也保存 session 值，默认为 true。
```

1） 在内存中存储 session

express-session 默认使用内存来存 session，对于开发调试来说很方便。
```
var express = require('express');
// 首先引入 express-session 这个模块
var session = require('express-session');

var app = express();
app.listen(5000);

// 按照上面的解释，设置 session 的可选参数
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 }
}));

app.get('/', function (req, res) {

  // 检查 session 中的 isVisit 字段
  // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
});
```
2） 在 redis 中存储 session

session 存放在内存中不方便进程间共享，因此可以使用 redis 等缓存来存储 session。

假设你的机器是 4 核的，你使用了 4 个进程在跑同一个 node web 服务，当用户访问进程1时，他被设置了一些数据当做 session 存在内存中。而下一次访问时，他被负载均衡到了进程2，则此时进程2的内存中没有他的信息，认为他是个新用户。这就会导致用户在我们服务中的状态不一致。

使用 redis 作为缓存，可以使用 connect-redis 模块(https://github.com/tj/connect-redis )来得到 redis 连接实例，然后在 session 中设置存储方式为该实例。
```
var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
app.listen(5000);

app.use(session({
  // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
  // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
  // 编写自己的 store 也很简单
  store: new redisStore(),
  secret: 'somesecrettoken'
}));

app.get('/', function (req, res) {
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send('欢迎第一次来这里');
  }
});
```
上面我们说到，session 的 store 有四个常用选项：1）内存 2）cookie 3）缓存 4）数据库

其中，开发环境存内存就好了。一般的小程序为了省事，如果不涉及状态共享的问题，用内存 session 也没问题。但内存 session 除了省事之外，没有别的好处。

```
cookie-session
上面一直提到 session 可以存在 cookie 中，现在来讲讲具体的思路。这里所涉及的专业名词叫做 对称加密。
假设我们想在用户的 cookie 中存 session data，使用一个名为 session_data 的字段。

存

var sessionData = {username: 'alsotang', age: 22, company: 'alibaba', location: 'hangzhou'}
这段信息的话，可以将 sessionData 与我们的 secret_string 一起做个对称加密，存到 cookie 的 session_data 字段中，只要你的 secret_string 足够长，那么攻击者也是无法获取实际 session 内容的。对称加密之后的内容对于攻击者来说相当于一段乱码。

而当用户下次访问时，我们就可以用 secret_string 来解密 sessionData，得到我们需要的 session data。

signedCookies 跟 cookie-session 还是有区别的：

1）是前者信息可见不可篡改，后者不可见也不可篡改

2）是前者一般是长期保存，而后者是 session cookie

cookie-session 的实现跟 signedCookies 差不多。

不过 cookie-session 我个人建议不要使用，有受到回放攻击的危险。

回放攻击指的是，比如一个用户，它现在有 100 积分，积分存在 session 中，session 保存在 cookie 中。他先复制下现在的这段 cookie，然后去发个帖子，扣掉了 20 积分，于是他就只有 80 积分了。而他现在可以将之前复制下的那段 cookie 再粘贴回去浏览器中，于是服务器在一些场景下会认为他又有了 100 积分。

如果避免这种攻击呢？这就需要引入一个第三方的手段来验证 cookie session，而验证所需的信息，一定不能存在 cookie 中。这么一来，避免了这种攻击后，使用 cookie session 的好处就荡然无存了。如果为了避免攻击而引入了缓存使用的话，那不如把 cookie session 也一起放进缓存中。

session cookie
初学者容易犯的一个错误是，忘记了 session_id 在 cookie 中的存储方式是 session cookie。即，当用户一关闭浏览器，浏览器 cookie 中的 session_id 字段就会消失。

常见的场景就是在开发用户登陆状态保持时。

假如用户在之前登陆了你的网站，你在他对应的 session 中存了信息，当他关闭浏览器再次访问时，你还是不懂他是谁。所以我们要在 cookie 中，也保存一份关于用户身份的信息。

比如有这样一个用户

{username: 'alsotang', age: 22, company: 'alibaba', location: 'hangzhou'}
我们可以考虑把这四个字段的信息都存在 session 中，而在 cookie，我们用 signedCookies 来存个 username。

登陆的检验过程伪代码如下：

if (req.session.user) {
  // 获取 user 并进行下一步
  next()
} else if (req.signedCookies['username']) {
  // 如果存在则从数据库中获取这个 username 的信息，并保存到 session 中
  getuser(function (err, user) {
    req.session.user = user;
    next();
  });
} else {
  // 当做为登陆用户处理
  next();
}

etag 当做 session，保存 http 会话
很黑客的一种玩法：https://cnodejs.org/topic/5212d82d0a746c580b43d948
```


### 12 使用 promise 替代回调函数

学习 q 的 API，利用 q 来替代回调函数(https://github.com/kriskowal/q )

* promise只有三种状态，未完成，完成(fulfilled)和失败(rejected)。
* promise的状态可以由未完成转换成完成，或者未完成转换成失败。
* promise的状态转换只发生一次

```
学习一个简单的例子：

var Q = require('q');
var defer = Q.defer();
/**
 * 获取初始promise
 * @private
 */
function getInitialPromise() {
  return defer.promise;
}
/**
 * 为promise设置三种状态的回调函数
 */
getInitialPromise().then(function(success){
	console.log(success);
},function(error){
	console.log(error);
},function(progress){
	console.log(progress);
});
defer.notify('in progress');//控制台打印in progress
defer.resolve('resolve');   //控制台打印resolve
defer.reject('reject');		//没有输出。promise的状态只能改变一次
```
* promise的传递

想要读取一个文件的内容，然后把这些内容打印出来

```
var Q = require('q');
var fs = require('fs');
var defer = Q.defer();

/**
 * 通过defer获得promise
 * @private
 */
function getInputPromise() {
	return defer.promise;
}

/**
 * 当inputPromise状态由未完成变成fulfil时，调用function(fulfilled)
 * 当inputPromise状态由未完成变成rejected时，调用function(rejected)
 * 将then返回的promise赋给outputPromise
 * function(fulfilled)将新的promise赋给outputPromise
 * 未完成改变为reject
 * @private
 */
var outputPromise = getInputPromise().then(function(fulfilled){
	var myDefer = Q.defer();
	fs.readFile('test.txt','utf8',function(err,data){
		if(!err && data) {
			myDefer.resolve(data);
		}
	});
	return myDefer.promise;
},function(rejected){
	throw new Error('rejected');
});

/**
 * 当outputPromise状态由未完成变成fulfil时，调用function(fulfilled)，控制台打印test.txt文件内容。
 *
 */
outputPromise.then(function(fulfilled){
	console.log(fulfilled);
},function(rejected){
	console.log(rejected);
});

/**
 * 将inputPromise的状态由未完成变成rejected
 */
//defer.reject();

/**
 * 将inputPromise的状态由未完成变成fulfilled
 */
defer.resolve(); //控制台打印出 test.txt 的内容
```

* promise链
promise链提供了一种让函数顺序执行的方法。

```
var Q = require('q');
var defer = Q.defer();

//一个模拟数据库
var users = [{'name':'andrew','passwd':'password'}];

function getUsername() {
return defer.promise;
}

function getUser(username){
	var user;
	users.forEach(function(element){
		if(element.name === username) {
			user = element;
		}
	});
	return user;
}

//promise链
getUsername().then(function(username){
 return getUser(username);
}).then(function(user){
 console.log(user);
});

defer.resolve('andrew');
```

* promise组合


```
var Q = require('q'),
	fs = require('fs');
function printFileContent(fileName) {
	return function(){
		var defer = Q.defer();
		fs.readFile(fileName,'utf8',function(err,data){
		  if(!err && data) {
			console.log(data);
			defer.resolve();
		  }
		})
		return defer.promise;
	}
}
//手动链接
printFileContent('sample01.txt')()
	.then(printFileContent('sample02.txt'))
	.then(printFileContent('sample03.txt'))
	.then(printFileContent('sample04.txt'));   //控制台顺序打印sample01到sample04的内容
很有成就感是不是。然而如果仔细分析，我们会发现为什么要他们顺序执行呢，如果他们能够并行执行不是更好


```

可以通过Q.all([promise1,promise2...])将多个promise组合成一个promise返回。 注意：

当all里面所有的promise都fulfil时，Q.all返回的promise状态变成fulfil  
当任意一个promise被reject时，Q.all返回的promise状态立即变成reject  
我们来把上面读取文件内容的例子改成并行执行吧  

```
var Q = require('q');
var fs = require('fs');
/**
 *读取文件内容
 *@private
 */
function printFileContent(fileName) {
		//Todo: 这段代码不够简洁。可以使用Q.denodeify来简化
		var defer = Q.defer();
		fs.readFile(fileName,'utf8',function(err,data){
		  if(!err && data) {
			console.log(data);
			defer.resolve(fileName + ' success ');
		  }else {
			defer.reject(fileName + ' fail ');
		  }
		})
		return defer.promise;
}

Q.all([printFileContent('sample01.txt'),printFileContent('sample02.txt'),printFileContent('sample03.txt'),printFileContent('sample04.txt')])
	.then(function(success){
		console.log(success);
	}); //控制台打印各个文件内容 顺序不一定
	
	
	
	现在知道Q.all会在任意一个promise进入reject状态后立即进入reject状态。如果我们需要等到所有的promise都发生状态后(有的fulfil, 有的reject)，再转换Q.all的状态, 这时我们可以使用Q.allSettled

var Q = require('q'),
	fs = require('fs');
/**
 *读取文件内容
 *@private
 */
function printFileContent(fileName) {
	//Todo: 这段代码不够简洁。可以使用Q.denodeify来简化
	var defer = Q.defer();
	fs.readFile(fileName,'utf8',function(err,data){
	  if(!err && data) {
		console.log(data);
		defer.resolve(fileName + ' success ');
	  }else {
		defer.reject(fileName + ' fail ');
	  }
	})
	return defer.promise;
}

Q.allSettled([printFileContent('nosuchfile.txt'),printFileContent('sample02.txt'),printFileContent('sample03.txt'),printFileContent('sample04.txt')])
	.then(function(results){
		results.forEach(
			function(result) {
				console.log(result.state);
			}
		);
	});
```


* 结束promise链

通常，对于一个promise链，有两种结束的方式。第一种方式是返回最后一个promise

如 return foo().then(bar);

第二种方式就是通过done来结束promise链

如 foo().then(bar).done()
