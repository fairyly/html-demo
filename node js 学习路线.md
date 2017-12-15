# Nodejs学习路线图

<div class="p-cont">
    <h2>Nodejs学习路线图</h2>
    <div class="entry">
        <p><a title="从零开始nodejs系列文章" href="http://blog.fens.me/series-nodejs/" target="_blank">从零开始nodejs系列文章</a>，将介绍如何利Javascript做为服务端脚本，通过Nodejs框架web开发。Nodejs框架是基于V8的引擎，是目前速度最快的Javascript引擎。chrome浏览器就基于V8，同时打开20-30个网页都很流畅。Nodejs标准的web开发框架Express，可以帮助我们迅速建立web站点，比起PHP的开发效率更高，而且学习曲线更低。非常适合小型网站，个性化网站，我们自己的Geek网站！！</p>
        <p><strong>关于作者</strong></p>
        <ul>
            <li>张丹(Conan), 程序员Java,R,PHP,Javascript</li>
            <li>weibo：@Conan_Z</li>
            <li>blog:&nbsp;<a title="粉丝日志|跨界的IT博客" href="http://blog.fens.me/" target="_blank">http://blog.fens.me</a></li>
            <li>email: bsspirit@gmail.com</li>
        </ul>
        <p><strong>转载请注明出处：</strong>
            <br>
            <a title="Nodejs学习路线图" href="http://blog.fens.me/nodejs-stage-20/" target="_blank">http://blog.fens.me/nodejs-roadmap/</a></p>
        <p><a href="http://blog.fens.me/wp-content/uploads/2014/06/nodejs-roadmap.png"><img src="http://blog.fens.me/wp-content/uploads/2014/06/nodejs-roadmap.png" alt="nodejs-roadmap" width="600" height="400" class="alignnone size-full wp-image-6692"></a></p>
        <p><strong>前言</strong></p>
        <p>用Nodejs已经1年有余，陆陆续续写了48篇关于Nodejs的博客文章，用过的包有上百个。和所有人一样，我也从Web开发开始，然后到包管理，再到应用系统的开发，最后开源自己的Nodejs项目。一路走来，Nodejs已经成为我做Web项目的标配。我非常愿意把原Java、PHP的Web系统向Nodejs迁移，因为1个人可以很容易的完成10个人的活了。</p>
        <p>本文把我的学习和使用经验进行归纳总结，希望给新入门Nodejs的同学做一些指引。</p>
        <p><strong>目录</strong></p>
        <ol>
            <li>Nodejs的介绍</li>
            <li>15个Nodejs应用场景</li>
            <li>Nodejs学习路线图</li>
        </ol>
        <h2>1. Nodejs的介绍</h2>
        <p>Node.js的是建立在Chrome的JavaScript的运行时，可方便地构建快速，可扩展的网络应用程序的平台。Node.js使用事件驱动，非阻塞I/O模型，轻量、高效，可以完美地处理时时数据，运行在不同的设备上。</p>
        <p><strong>1.1. 谁在用Nodejs?</strong></p>
        <p>从Nodejs官方网站的企业登记页(<a href="https://github.com/joyent/node/wiki/Projects,-Applications,-and-Companies-Using-Node">https://github.com/joyent/node/wiki/Projects,-Applications,-and-Companies-Using-Node</a>)，包括我们熟知的公司有LinkedIn, Yahoo, Paypal, eBay, Walmart，Groupon 还有很多的中小型公司，国内的公司如雪球、淘宝、网易、百度等也都有很多项目运行在Node.js之上。</p>
        <p><a href="http://blog.fens.me/wp-content/uploads/2014/06/logo.png"><img src="http://blog.fens.me/wp-content/uploads/2014/06/logo.png" alt="logo" width="600" height="400" class="alignnone size-full wp-image-6643"></a></p>
        <p>这些公司不仅是尝试在用，而且都在向Nodejs迁移。截止到2014年6月本文发稿时，已经有79693包在npm.org上面发布，而且这个数字还在快速增长中。</p>
        <p>那么接下来，大家肯定都会问为什么要是用Nodejs呢？</p>
        <p><strong>1.2. 为什么要用Nodejs?</strong></p>
        <p>从我使用体会来说，Node有4大优势：</p>
        <ul>
            <li>1. Nodejs基于Javascript语言，不用再单独新学一门陌生的语言，从而减低了学习的门槛。同时，Javascript语言在Web前端开发中至关重要，特别HTML5的应用必须要使用，所以前后台统一语言，不仅可以实现程序员的全栈开发，还可以统一公共类库，代码标准化。单凭这一点，Nodejs就已经赢得市场的青睐了。</li>
            <li>2. Nodejs并没有重新开发运行时环境，而是选择了目前最快的浏览器内核V8做为执行引擎，保证了Nodejs的性能和稳定性。</li>
            <li>3. Nodejs的开发非常高效，而且代码简单，得益于Nodejs的单线程机制。而Nodejs的另一个特点异步编程，让Nodejs处理IO密集型应用有了明显的优势。个人感觉，用Nodejs比Java做Web开发要高效10倍，比PHP的代码还要简单。</li>
            <li>4. Nodejs的社区在壮大，不仅包的数量在快速增加，而且包的质量也要明显好于其他语言的。很多明星级的包，都是简单而灵巧的，为了开发者的使用习惯而设计。我最常用到的工具包，如socket.io, moment.js, underscore.js, async.js, express.js, bower.js, grunt.js, forever.js…，确实在改变我以前的编程习惯。</li>
        </ul>
        <p>当然，除了我使用Nodejs的理由，很多公司也都有自己的使用理由。</p>
        <p><a target="_blank" ref="nofllow" href="http://www.ebaytechblog.com/2011/11/30/announcing-ql-io/">ebay选择Nodejs的理由</a>，可以归纳为以下4点：</p>
        <ul>
            <li>动态语言：开发效率非常高，并有能力构建复杂系统，如ql.io。</li>
            <li>性能和I/O负载：Nodejs非常好的解决了IO密集的问题，通过异步IO来实现。</li>
            <li>连接的内存开销：每个Node.js进程可以支持超过12万活跃的连接，每个连接消耗大约2K的内存。</li>
            <li>操作性：实现了Nodejs对于内存堆栈的监控系统。</li>
        </ul>
        <p><strong>1.3. Nodejs不适合的领域</strong></p>
        <p>每一种语言或平台都有不擅长领域，对于Nodejs来说最不擅长的领域在于CPU和内存的编程操作。</p>
        <ul>
            <li>1. 计算密集型应用，让Javascript和C去拼计算性能，估计是不可能赢的。</li>
            <li>2. 内存控制，让Javascript和Java比较复杂数据类型定义，也是很困难的。因为Javascript的面向对象是基于JSON的，而Java是直接使用内存结构。所以，通过JSON序列化和反序列的过程控制内存，Javascript就已经输了。</li>
            <li>3. 大内存的应用，由于V8引擎有内存设计的限制，32位环境中最大堆是1G，64位环境中最大堆也不到2G，如果要一次读入10G数据，对于Nodejs来说也无法实现。</li>
            <li>4. 静态服务器，虽然Nodejs的优势在IO密集集应用，但是和Nginx的处理静态资源还是有很大的差距。</li>
            <li>5. 不需要异步的应用：比如系统管理，自行化脚本等，还是Python更顺手，Nodejs的异步调用可能会给编程带来一些麻烦。</li>
        </ul>
        <h2>2. 15个Nodejs应用场景</h2>
        <p>我们已经对Nodejs有了初步的了解，接下来看看Nodejs的应用场景。</p>
        <p><strong>2.1 Web开发：Express + EJS + Mongoose/MySQL</strong></p>
        <p><a href="http://expressjs.com/" target="_blank" ref="nofollow">express</a> 是轻量灵活的Nodejs Web应用框架，它可以快速地搭建网站。Express框架建立在Nodejs内置的Http模块上，并对Http模块再包装，从而实际Web请求处理的功能。</p>
        <p><a href="https://github.com/visionmedia/ejs" target="_blank" ref="nofollow">ejs</a>是一个嵌入的Javascript模板引擎，通过编译生成HTML的代码。</p>
        <p><a href="http://mongoosejs.com/" target="_blank" ref="nofollow">mongoose</a> 是MongoDB的对象模型工具，通过Mongoose框架，可以进行访问MongoDB的操作。</p>
        <p><a href="https://github.com/felixge/node-mysql" target="_blank" ref="nofollow">mysql</a> 是连接MySQL数据库的通信API，可以进行访问MySQL的操作。</p>
        <p>通常用Nodejs做Web开发，需要3个框架配合使用，就像Java中的SSH。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/05/nodejs-1.png"></p>
        <p><strong>2.2 REST开发：Restify</strong></p>
        <p><a href="http://mcavage.me/node-restify/" target="_blank" ref="nofollow">restify</a> 是一个基于Nodejs的REST应用框架，支持服务器端和客户端。restify比起express更专注于REST服务，去掉了express中的template, render等功能，同时强化了REST协议使用，版本化支持，HTTP的异常处理。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/01/nodejs-restify.png"></p>
        <p><strong>2.3 Web聊天室(IM)：Express + Socket.io</strong></p>
        <p><a href="http://socket.io" target="_blank" ref="nofollow">socket.io</a>一个是基于Nodejs架构体系的，支持websocket的协议用于时时通信的一个软件包。socket.io 给跨浏览器构建实时应用提供了完整的封装，socket.io完全由javascript实现。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/08/socketio.png"></p>
        <p><strong>2.4 Web爬虫：Cheerio/Request</strong></p>
        <p><a href="http://matthewmueller.github.io/cheerio/" target="_blank" ref="nofollow">cheerio</a> 是一个为服务器特别定制的，快速、灵活、封装jQuery核心功能工具包。Cheerio包括了 jQuery核心的子集，从jQuery库中去除了所有DOM不一致性和浏览器不兼容的部分，揭示了它真正优雅的API。Cheerio工作在一个非常简单，一致的DOM模型之上，解析、操作、渲染都变得难以置信的高效。基础的端到端的基准测试显示Cheerio大约比JSDOM快八倍(8x)。Cheerio封装了@FB55兼容的htmlparser，几乎能够解析任何的 HTML 和 XML document。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/06/node-crawler.png"></p>
        <p><strong>2.5 Web博客：Hexo</strong></p>
        <p><a href="http://hexo.io/" target="_blank" ref="nofollow">Hexo</a> 是一个简单地、轻量地、基于Node的一个静态博客框架。通过Hexo我们可以快速创建自己的博客，仅需要几条命令就可以完成。</p>
        <p>发布时，Hexo可以部署在自己的Node服务器上面，也可以部署github上面。对于个人用户来说，部署在github上好处颇多，不仅可以省去服务器的成本，还可以减少各种系统运维的麻烦事(系统管理、备份、网络)。所以，基于github的个人站点，正在开始流行起来….</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/05/hexo-github1.png"></p>
        <p><strong>2.6 Web论坛: nodeclub</strong></p>
        <p><a href="https://github.com/cnodejs/nodeclub/" target="_blank" ref="nofollow">Node Club</a> 是用 Node.js 和 MongoDB 开发的新型社区软件，界面优雅，功能丰富，小巧迅速， 已在Node.js 中文技术社区 <a href="http://cnodejs.org/" target="_blank" ref="nofollow">CNode</a> 得到应用，但你完全可以用它搭建自己的社区。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/06/nodeclub.png"></p>
        <p><strong>2.7 Web幻灯片：Cleaver</strong></p>
        <p><a href="http://jdan.github.io/cleaver/" target="_blank" ref="nofollow">Cleaver</a> 可以生成基于Markdown的演示文稿。如果你已经有了一个Markdown的文档，30秒就可以制作成幻灯片。Cleaver是为Hacker准备的工具。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/12/nodejs-cleaver.png"></p>
        <p><strong>2.8 前端包管理平台: bower.js</strong></p>
        <p><a href="http://bower.io/" target="_blank" ref="nofollow">Bower</a> 是 twitter 推出的一款包管理工具，基于nodejs的模块化思想，把功能分散到各个模块中，让模块和模块之间存在联系，通过 Bower 来管理模块间的这种联系。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/06/bower-search.png"></p>
        <p><strong>2.9 OAuth认证：Passport</strong></p>
        <p><a href="http://passportjs.org/" target="_blank" ref="nofollow">Passport</a>项目是一个基于Nodejs的认证中间件。Passport目的只是为了“登陆认证”，因此，代码干净，易维护，可以方便地集成到其他的应用中。Web应用一般有2种登陆认证的形式：用户名和密码认证登陆,OAuth认证登陆。Passport可以根据应用程序的特点，配置不同的认证机制。本文将介绍，用户名和密码的认证登陆。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/02/nodejs-passport-oauth.png"></p>
        <p><strong>2.10 定时任务工具: later</strong></p>
        <p><a href="http://bunkat.github.io/later/" target="_blank" ref="nofollow">Later</a> 是一个基于Nodejs的工具库，用最简单的方式执行定时任务。Later可以运行在Node和浏览器中。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/12/nodejs-later.png"></p>
        <p><strong>2.11 浏览器环境工具: browserify</strong></p>
        <p><a href="http://browserify.org/" target="_blank" ref="nofollow">Browserify</a> 的出现可以让Nodejs模块跑在浏览器中，用require()的语法格式来组织前端的代码，加载npm的模块。在浏览器中，调用browserify编译后的代码，同样写在&lt;script&gt;标签中。</p>
        <p>用 Browserify 的操作，分为3个步骤。1. 写node程序或者模块, 2. 用Browserify 预编译成 bundle.js, 3. 在HTML页面中加载bundle.js。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/06/browserify.png"></p>
        <p><strong>2.12 命令行编程工具：Commander</strong></p>
        <p><a href="http://visionmedia.github.io/commander.js/" target="_blank" ref="nofollow">commander</a> 是一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能。commander源自一个同名的Ruby项目。commander的特性：自记录代码,自动生成帮助,合并短参数（“ABC”==“-A-B-C”）,默认选项,强制选项&#8203;&#8203;,命令解析,提示符。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/09/commander.png"></p>
        <p><strong>2.13 Web控制台工具: tty.js</strong></p>
        <p><a href="https://github.com/chjj/tty.js/" target="_blank" ref="nofollow">tty.js</a> 是一个支持在浏览器中运行的命令行窗口，基于node.js平台，依赖socket.io库，通过websocket与Linux系统通信。特性：支持多tab窗口模型; 支持vim,mc,irssi,vifm语法; 支持xterm鼠标事件; 支持265色显示; 支持session。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2013/11/tty-console.png"></p>
        <p><strong>2.14 客户端应用工具: node-webkit</strong></p>
        <p><a href="https://github.com/rogerwang/node-webkit" target="_blank" ref="nofollow">Node-Webkit</a> 是NodeJS与WebKit技术的融合，提供一个跨Windows、Linux平台的客户端应用开发的底层框架，利用流行的Web技术（Node.JS，JavaScript，HTML5）来编写应用程序的平台。应用程序开发人员可以轻松的利用Web技术来实现各种应用程序。Node-Webkit性能和特色已经让它成为当今世界领先的Web技术应用程序平台。 </p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/06/node-webkit.png"></p>
        <p><strong>2.15 操作系统: node-os</strong></p>
        <p><a href="http://node-os.com/" target="_blank" ref="nofollow">NodeOS</a> 是采用NodeJS开发的一款友好的操作系统，该操作系统是完全建立在Linux内核之上的，并且采用shell和NPM进行包管理，采用NodeJS不仅可以很好地进行包管理，还可以很好的管理脚本、接口等。目前，Docker和Vagrant都是采用NodeOS的首个版本进行构建的。</p>
        <p><img src="http://blog.fens.me/wp-content/uploads/2014/06/node-os.png"></p>
        <h2>3. Nodejs学习路线图</h2>
        <p>我们看到Nodejs已经被广发地应用在各种的场景了，针对Nodejs的应用场景，我们应该如何学习Nodejs呢？</p>
        <p>以下内容是我整理的文档和教程，每个软件包对应一篇文章，大家可以根据自己的需要进行阅读，完整的文章列表，可以查看：<a href="http://blog.fens.me/series-nodejs/" title="从零开始nodejs系列文章" target="_blank">从零开始nodejs系列文章</a>。</p>
        <ul>
            <li>项目管理：<a href="http://blog.fens.me/nodejs-npm-package/" target="_blank">npm</a>,<a href="http://blog.fens.me/nodejs-grunt-intro/" target="_blank">grunt</a>, <a href="http://blog.fens.me/nodejs-bower-intro/" target="_blank">bower</a>, <a href="http://blog.fens.me/nodejs-yeoman-intro/" target="_blank">yeoman</a></li>
            <li>Web开发：<a href="http://blog.fens.me/nodejs-express3/" target="_blank">express</a>,ejs,<a href="http://blog.fens.me/hexo-blog-github/" target="_blank">hexo</a>, <a href="http://blog.fens.me/nodejs-socketio-chat/" target="_blank">socket.io</a>, <a href="http://blog.fens.me/nodejs-restify/" target="_blank">restify</a>, <a href="http://blog.fens.me/nodejs-slide-cleaver/" target="_blank">cleaver</a>, <a href="http://blog.fens.me/nodejs-stylus-css/" target="_blank">stylus</a>, <a href="http://blog.fens.me/nodejs-browserify/" target="_blank">browserify</a>,cheerio </li>
            <li>工具包：<a href="http://blog.fens.me/nodejs-express3/" target="_blank">underscore</a>,moment,<a href="http://blog.fens.me/nodejs-connect/" target="_blank">connet</a>,<a href="http://blog.fens.me/nodejs-cron-later/" target="_blank">later</a>,<a href="http://blog.fens.me/nodejs-log4js/" target="_blank">log4js</a>,<a href="http://blog.fens.me/nodejs-express-passport/" target="_blank">passport</a>,<a href="http://blog.fens.me/nodejs-oauth-passport/" target="_blank">passport(oAuth)</a>,<a href="http://blog.fens.me/nodejs-core-domain/" target="_blank">domain</a>,<a href="http://blog.fens.me/nodejs-requirejs/" target="_blank">require</a>,<a href="http://blog.fens.me/nodejs-gc-reap/" target="_blank">reap</a>,
                <br>
                <a href="http://blog.fens.me/nodejs-commander/" target="_blank">commander</a>,<a href="http://blog.fens.me/nodejs-retry/" target="_blank">retry</a></li>
            <li>数据库：<a href="http://blog.fens.me/nodejs-mysql-intro/" target="_blank">mysql</a>,<a href="http://blog.fens.me/nodejs-mongoose-json/" target="_blank">mongoose</a>,redis</li>
            <li>异步：<a href="http://blog.fens.me/nodejs-async/" target="_blank">async</a>,<a href="http://blog.fens.me/nodejs-async-windjs/" target="_blank">wind</a></li>
            <li>部署：<a href="http://blog.fens.me/nodejs-server-forever/" target="_blank">forever</a>,pm2</li>
            <li>测试：<a href="http://blog.fens.me/nodejs-jasmine-bdd/" target="_blank">jasmine</a>,<a href="http://blog.fens.me/nodejs-karma-jasmine/" target="_blank">karma</a></li>
            <li>跨平台：<a href="http://blog.fens.me/r-rserve-nodejs/" target="_blank">rio</a>,<a href="http://blog.fens.me/nodejs-linux-sh-tty/" target="_blank">tty</a></li>
            <li>内核：<a href="http://blog.fens.me/nodejs-core-cluster/" target="_blank">cluster</a>,<a href="http://blog.fens.me/nodejs-https-server/" target="_blank">http</a>,<a href="http://blog.fens.me/nodejs-crawler-douban/" target="_blank">request</a></li>
            <li>算法：<a href="http://blog.fens.me/algorithm-quicksort-nodejs/" target="_blank">ape-algorithm(快速排序)</a>,<a href="http://blog.fens.me/algorithm-bucketsort-nodejs/" target="_blank">ape-algorithm(桶排序)</a></li>
        </ul>
        <p>Nodejs在快速的发展着，软件包版本升级的很快，文章有运行不通的地方请参考官方文档解决。我也会不定期更新文章，尽量保持文章代码的可用性。</p>
        <p>祝大家在Nodejs的世界里，享受开发的乐趣！</p>
        <p>######################################################
            <br> 看文字不过瘾，作者视频讲解，请访问网站：
            <a href="http://onbook.me/video" target="_blank">http://onbook.me/video</a>
            <br> ######################################################
        </p>
        <p><strong>转载请注明出处：</strong>
            <br>
            <a title="Nodejs学习路线图" href="http://blog.fens.me/nodejs-stage-20/" target="_blank">http://blog.fens.me/nodejs-roadmap/</a></p>
        <p></p>
        <div class="clear"></div>
        <p class="inner-meta">This entry was posted in <a href="http://blog.fens.me/category/javascript%e8%af%ad%e8%a8%80%e5%ae%9e%e8%b7%b5/" rel="category tag">Javascript语言实践</a></p>
    </div>
    
        
        
    </div>
</div>
