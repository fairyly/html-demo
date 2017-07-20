# 前言

本文是对《ECMAScript 2018 Language Specification》的导读。
本文是对标准的概述性解读，不会针对某个技术点进行详细展开，但是会附上相关文章外链。

# 规格介绍

整个文档有引言+27个章节+7篇附录，大概五六百页的样子。

引言和前面3章部分，都是在讲规格本身，跟JS语言本身无关。内容很少，可以快速过一遍。

`Introduction` 部分 介绍了语言历史和标准化历程;

前3章 `Scope`、`Conformance`、`Normative References` 主要介绍了文档的范围、一致性和参考文献。所谓一致性，实际上是标准实现的一致性，

任何实现ECMAScript 标准的语言，都必须完全实现文档中描述的语法和语义，并且可以有规格之外的自定义程序语法。

# 语言概述

第4章 Overview 是对语言的整体介绍。涵盖了Web脚本语言环境、ES基本概念和专业术语，以及严格模式的简单介绍。这里跟大家分享几个有意思的点。

# 奇葩的面向对象机制

ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment.

ES是一门面向对象的语言，这是官方描述！(这有什么奇怪的啊，大家都知道啊)但是ES的面向对象设计机制却是与众不同，大有学问，这里我专门写了一篇文章[《如何优雅的理解 ECMAScript 中的对象》]()。

# 脚本语言的逆袭

ECMAScript was originally designed to be used as a scripting language, but has become widely used as a general-purpose programming language.

这个就有点屌了，ES最初是被拿来当Web脚本语言用的，但现在已经成了时下最流行的通用编程语言之一。此中缘由大家应该也很清楚，不多说，只是抒发一下感慨：Always bet on JS可不是乱说的。

# 有关对象的描述

本章还列举出了JS中的专业名词及解释，比如类型、原始值、对象、构造器、原型......等概念。有意思的是标准中关于对象的描述在ES5里面有三种：

native object（原生对象），指语义完全由规范定义并且不掺杂任何宿主环境定义的的对象；

build-in object（内置对象），由ECMA实现提供，程序执行时就存在的对象。所有内置对象都是原生对象。

host object（宿主对象），由执行环境提供，比如浏览器的window对象和history对象。JS里的对象不是原生对象就是宿主对象。

但是在ES6之后就改成了四种：

ordinary object：普通对象，只要具备了对象的所有基本内置方法就可以了。

exotic object：外来对象，如果不具备标准对象所有的基本内置方法，就是外来对象。JS里的对象不是普通对象就是外来对象。

standard object：标准对象，语义由本规范定义的对象。

built-in object：内置对象，跟ES5中描述一样。

对比来看，前者是以宿主环境为划分条件，后者则是以对象的基本内置方法。ES6之后其实划分的更细了。

# 记法约定

第5章 Notational Conventions 详细介绍了规范描述中用到的一些句法、词法以及算法约定等内容，如果要看懂后面的有关语法行为，函数实现的详细描述，就得看懂这章，看完之后你甚至可以照着标准实现一遍。你需要知道以下概念：

# 上下文无关文法

作为ECMAScript规格文档，自然需要用一种专业的方式来描述这门语言，这种专业的描述语言的方法，就是所谓的文法（文法由若干产生式组成）。而上下文无关的意思，就是所有产生式的左边只有一个非终结符，因为只有这样，产生式右边的串才能规约到左边的非终结符，否则就是上下文相关。大部分编程语言都是上下文无关文法，ECMAScript也不例外。

词法、正则文法、数字字符串文法、句法约定和文法标记

比如，一个冒号“:”作为分隔符分割句法的产生式。两个冒号“::”作为分隔符分割词法和正则的文法产生式。词法和正则的文法共享某些产生式。三个冒号“:::”作为分隔符分割数字字符串文法的产生式。然后列举了各种句法，文法标记，总之很多概念，此处不展开。

# 内部机制

第6到8章详细描述了语言运行的内部机制，从宏观上对ES进行描述，包括数据类型和值，语言内部的抽象操作，以及代码执行的上下文相关知识。

# 类型

ES中的类型可细分为ES语言类型和规范类型，语言类型对应的是程序中直接被操作的值的类型，包括Undefined,Null,Boolean,Number,String,Object,Symbol。理解类型，是理解这门语言的基础。

首先是Undefind和Null，二者区别可参考 undefined与null的区别。在一门编程语言中对于“空”的描述用到了两种基本类型，估计只有JavaScript了。其实一开始只有null，后来为了解决类型转换和错误处理问题引入了undefined。

undefined 表示此处应该有个值，但是这个值还没给出来，其实就是占了个坑，这个坑是语言内部实现帮你做的，你不用管。null 才是真正意义上的空值，表示对象世界中的“无”。正所谓道生一，一生二，二生三，三生万物。JS中万物皆对象，所有对象的原型链都可以上溯到唯一的Object，而Object的原型，正是万物之始源，混沌之道null。所以JS中null的意义远超其他编程语言，这正是让JS的面向对象思想与道家哲学完美契合的重要一笔。

所以个人理解，Undefined虽然作为基本类型，解决的却是语言内部处理问题，所以永远不要在代码中主动出现，要在语义上处理空就用null。所有因为undefined带来的问题，基本上是占着茅坑不拉屎的行为导致。所以google在Dart中就只有null，而没有undefined，因为undefined解决的问题完全可以在语言内部解决，没必要暴露给用户。

Boolean和Symbol没啥好说的，数值的设计也是从简，只有一个Number类型。有意思的是String，官方对于String类型的描述:

The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 2e53 - 1 elements.

翻译过来就是指所有有限的零个或多个16位无符号整数值的有序序列。更有意思的是,String中的每一个字符都被视为独立的UTF-16代码单元，即占2个字节，作用在字符串上的所有操作都视它们为无差别的16位无符号整数（这里的UTF-16，其实是指内部实现，计算机内存中都是基于unicode编码的，只是在存储或读取时会进行UTF-8或者其他编码类型转换）。但是UTF-16却有两种长度的字符，U+0000到U+FFFF之间的字符占2个字节，U+10000到U+10FFFF之间的字符占4字节。对于4字节的字符ES是无法准确处理的，需要自己去根据编码值情况判断,这也是一大坑爹之处。

对此，可能也需要一篇文章去专门分析：《深入理解JavaScript中的String类型》。

除了以上语言类型，整个规范中还有用于描述这门语言的规范类型，规范类型的值是规范自己造的，有的还是ES表达式计算的中间结果，所以没必要对应到特定的语言类型上。若非特别说明，ES中的类型通常指语言类型。

# 操作摘要

类型之间会涉及到各种运算，这就会涉及到各种操作运算。比如类型转换涉及到的内部机制和算法流程，7.1 Type Conversion 都有详细说明。7.2 Testing and Comparison Operations 讲了测试和比较操作，比如测试一个对象是否是数组，是否数字，是否构造函数，以及 == 和 === 的定义等等。以数组测试操作isArray(argument)为例，标准中的描述如下：

1. If Type(argument) is not Object, return false.
2. If argument is an Array exotic object, return true.
3. If argument is a Proxy exotic object, then
    a. If argument.[[ProxyHandler]] is null, throw a TypeError exception.
    b. Let target be argument.[[ProxyTarget]].
    c. Return ? IsArray(target).
4. Return false.
相对于ES5来说，规范中增加了对Proxy的处理，所以现在很多检测数组的方法，如果不支持 Proxy 的判断，可能会被淘汰哦。

# 语言实现细节

占坑，还在看。

// TODO 这是一个大坑
至于新特性，ES 2018 相对 2017只是对模板字符串做了修订：Template Literal Revision。

想知道未来的 ES 版本各阶段都有哪些新特性，可以关注这里：Feature watch: ECMAScript 2018

# 如何优雅的阅读ECMA标准

由于目前使用最为广泛的还是ECMA 5.1版本，所以在阅读ES2018之前，建议先把5.1的标准看一遍，方便对比。好在W3C中文站有5.1的100%翻译版本：

ES5中文版: HTML5 Chinese Interest Group Wiki

然后可以再看ES6也就是ES2015的标准，虽然没有中文版，不过可以参考阮老师的ES6入门，顺便也可以瞄一眼ES2016的标准：

ES 2015: http://www.ecma-international.org/ecma-262/6.0/

ECMAScript 6入门教程: [ECMAScript 6入门](http://es6.ruanyifeng.com/)

ES 2016: http://www.ecma-international.org/ecma-262/7.0/

期间有任何疑惑可以参考MDN上的JS参考文档，非常全面，涵盖了从入门到精通。

JavaScript 参考文档
看完这些再看ES2018就会非常轻松了：

[ECMAScript® 2018 Language Specification](https://tc39.github.io/ecma262/)




# 优雅的理解ECMAScript中的对象

## 序


注意: 这不是一篇正儿八经的技术文章。
ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment. 
— 摘自《ECMAScript® 2018 Language Specification》.

最近在看 ES 规范，越看越觉得这是一门神奇的语言。如标准所言，ES 是一门面向对象的编程语言，但它基于 prototype 的 OO 又很非主流。更神奇的是很多 JSer 拿着这门 OOP 来搞 函数式和 过程式编程，并且还浪的飞起。本文会围绕 ES 中的对象来展开，一起探索技术，走近科学（瞎扯淡）。

## 创世篇

### null

null是万物之伊始，也是生命的尽头。null 是一种空灵的状态，似是非是，似空非空，正如 null == undefined 但是 null !== undefined，看起来什么都没有，其实是支潜力股。

在 JS 宇宙中，null 是站在原型链顶端的男人，是所有对象原型的尽头，拥有毁灭一切的能力，看谁不爽赋值为 null，这样黑白无常在垃圾回收的时候便可以一波带走。

后来 JS 的造物主 Brendan 觉得 null 的能力过于强大，于是便创造了超级英雄 undefined 与之抗衡。undefined 诞生的初衷，是为了维护 JS 宇宙秩序，解决错误处理和类型转换带来的问题。但是自 undefined 出现之后世界却变得更加混乱，人类不知道何时召唤 null 何时该召唤 undefined。

简单的说，undefined 表示此处应该有个值，但是这个值还没给出来，其实就是占了个坑，这个坑是语言内部实现帮你做的，程序员完全没有必要在代码中显示返回或者指定某个变量为 undefined，undefined 的处理完全交给程序实现就是了。所以这其实是个无需暴露给用户的能力，传说 Google 爸爸在创建 Dart 宇宙的时候就去掉了 undefined，只保留了 null。

### Object

古人信奉五行阴阳之说，认为世界由金木水火土五种基本元素构成，基本元素构成各种物质，物质构成世界。在 JS 宇宙中也一样，基本语言类型构成了各种对象，对象构成了整个 JS 世界，要理解这个世界，就得从找对象开始。

在 ES5 时代，对象分三种：

native object（原生对象），指语义完全由规范定义并且不掺杂任何宿主环境定义的的对象；

host object（宿主对象），由执行环境提供，比如浏览器的window对象和history对象。JS里的对象不是原生对象就是宿主对象。

build-in object（内置对象），由ECMA实现提供，程序执行时就存在的对象。所有内置对象都是原生对象。

这三类对象相辅相成，亦相克相生。所谓的道生一，一生二，二生三，三生万物，在 JS 的世界观中，大概就是指的 null 生 Object，Object 生 native & host，native 又分化出buid-in，是为三才，森罗万象。

然而编码不止，变化不息，在 ES6 时代，规范中有关对象的划分又变成了四种：

ordinary object：普通对象，需要具备了对象的所有基本内置方法。

exotic object：外来对象，如果不完全具备所有对象拥有的基本内置方法，就是外来对象。JS里的对象不是普通对象就是外来对象。

standard object：标准对象，语义由本规范定义的对象。

built-in object：内置对象，跟ES5中描述一样。

对比来看，ES5 中对象是以宿主环境为条件划分的，ES6 中则是根据对象的基本内置方法。这其实要归结于 ES6 跨越性的变化，必然要动摇到一些基本规范描述来拥抱变化。所谓的无极生太极，太极生两仪，两仪生四象，在 JS 宇宙中大概，也许，null 就是无极，Object 就是太极，一内一外是两仪，四象嘛，当然就是上面那四种对象了啦......

当然我是在扯淡。

### Class

在我开始用 JS 搬砖之前，是不那么认真的先用了 Java 和 C++。所以一般看来，在有对象之前必先有类，对象只是类的一个实例而已。就好比找女朋友之前先得构造一个理想女票该有的属性和行为的类，然后再从该类实例化一个对象：

public class GirlFriend {
  public static final Integer age = 18;
  public static final String sex = "女";
  public void eat() {}
  public void shop() {}
  public void sleep() {}

  public static void main(String[] args) {
    GirlFriend honey = new GirlFriend();
  }
}
这很符合人类的常识，人们喜欢分类，这样便于组织管理，可以将复杂的问题简单化，清晰化。但是，这并不是世界原本的样子，也不能表现出内心最真实的渴求，只是我们自己一厢情愿的束缚。或许只有当你放下类，放下包袱，放弃规则，放纵去爱，放肆自己，放空未来......才能享受这盛夏光年激荡地青春，才会发现，会发现自己喜欢的并不是萝莉，而是御姐......

这便是 JS 的无类哲学：世界本无类，对象亦无根，本是弱类型，何处惹尘埃？

然尘世熙攘，你我结庐于人境，谁能不闻车马喧？能够做到超脱的毕竟是少数，这不，ES6 中还是引入了类的概念。

不过在我看来，ES6 的 class 并未动摇 JS 无类对象的哲学根基，更像是普渡众生的炫迈语法糖。毕竟，typeof class GirlFriend {} 返回的并不是一个类，而是一个 function。这意味着JS虽然有 class，本质上依然是构造函数，并不能像 Java 那样表演多继承、嵌套类等“高难度”动作。

这样也好，让 JSer 们继续做一个不拘一格的自由主义者。

### 混沌篇

function VS object

有很长一段时间，我无法清晰的理解 function 和 object 之间的暧昧关系，就像这样：

Function instanceof Object // 返回 true
Object instanceof Function // 依然返回 true
那么问题来了，到底是先有 Object，还是先有 Function ？

按照创世篇的理念来讲，必然是先有 Object 的概念，然后才孕育出 Function，所以 Object 是蛋，Function 是鸡(有关先有蛋还是先有鸡的哲学问题，我是更倾向于先有蛋的。这个蛋是天地未开，阴阳一体，混沌之道。所谓道生蛋，蛋生鸡，鸡中有蛋，蛋中有鸡，鸡又生蛋，蛋又生鸡，蛋蛋鸡鸡，无穷尽也，说的就是这个道理)。

当然我是有理论依据的，按照 ES2018 中关于 Object 的描述：

In ECMAScript, an object is a collection of zero or more properties each with attributes that determine how each property can be used—for example, when the Writable attribute for a property is set to false, any attempt by executed ECMAScript code to assign a different value to the property fails. Properties are containers that hold other objects, primitive values, or functions. A primitive value is a member of one of the following built-in types: Undefined, Null, Boolean, Number, String, and Symbol; an object is a member of the built-in type Object; and a function is a callable object. A function that is associated with an object via a property is called a method.

这里明确指出了函数是可调用的对象。对象本身的定义就是属性的集合，函数就是拥有特定属性的集合。所以从表面上看，确实是先有对象的概念才衍生出函数的概念。然细思极恐，如果你仔细研读标准，就会发现在对象诞生之时，函数其实已经出现了！所以标准中才叫function object：

An ECMAScript function object is an ordinary object and has the same internal slots and the same internal methods as other ordinary objects.

这是一种既满足先有蛋后有鸡又满足同时有蛋和鸡的量子叠加态。所以这个时候讨论谁先谁后已经没有意义了，本自同根生，相煎何太急？

况且他们真的是同根生，这是有科学依据的：

Object.getPrototypeOf(Function) === Object.getPrototypeOf(Object)
规范中使用[[prototype]]表示原型，并提供了getPrototypeOf方法来获取它，浏览器有一个非标准的实现，可通过__proto__内部属性来访问，本文图方便就使用__proto__来访问。

回到最初的问题，正是因为 Object 和 Function 的[[prototype]]相同，所以 instanceof 才会返回 true。不过这里的 Object 并不是我们所说的 Object 数据类型，而是对象构造函数。

typeof Function // 返回 "function"
typeof Object   // 依然返回 "function"
构造函数都有一个prototype属性，所有通过构造函数实例化的对象的[[prototype]]都会指向该构造函数的 prototype 属性的引用,即：

实例对象.__proto__ === 构造函数.prototype // ①
所有函数都是基于 Function 构造出来的，由式①可知：

// Function 和 Object 作为构造函数，自然不例外
Function.__proto__ === Function.prototype           // ②      
Object.__proto__ === Function.prototype             // ③
在座的各位函数.__proto__ === Function.prototype    // ④
前面也有说到，所有对象的原型都会指向一个最基本的太极对象，太极原型终于无极。Function 构造函数作为一个特殊的对象，自然也有：

Object.prototype.__proto__ === null
Object.__proto__.__proto__ === Object.prototype
Function.__proto__.__proto__ === Object.prototype   // ⑤
Function.prototype.__proto__ === Object.prototype   // 可由②⑤推出
在座的各位函数.__proto__.__proto__ === Object.prototype // 可由④⑤推出
明白了上述道理，也就明白了 JS 原型的真谛，可谓玄之又玄，众妙之门。


### prototype chain

ES 原型链的设计，其实是非常符合自然法则的。

我们每个人看似独立的个体，其实都可以追溯到共同的祖先。就好比 JS 中的对象看似独立，其实都有着同一个原型。原型链就跟血液一样，可以遗传父辈属性实现继承，但是比起血缘关系，又更像是血继限界，除了遗传之外还能进化出新的能力。这一点，比起基于类的继承更加灵活，也更符合进化论的思想。

但是有一点，ES 是单原型单继承的，这不符合自然规律。现实中孩子一般继承了父母双方的基因。试想一下，如果对象的原型是一个数组，可继承每一个原型对象的属性，那么 JS 世界会发生哪些变化？

最直接的就是可以支持多继承了，但本质上不会有变化，最终都会上溯到 Object.prototype。不过查户口会变得异常困难。如果要判断一个对象是否具有某个属性，要遍历的就不是原型链了，而是原型网，这是一个十分耗时的操作，所以单继承虽然丧失了生物的多样性，却保持了血统的纯正性，让这门语言可以一直保持简单，优雅。

嗯，我成功的说服了自己，单原型单继承并不是 JS 的缺陷，而是体现 JS 简单耐用的神来之笔，在前端开发场景下，更能突显出它的优势。因为，老实说，前端的业务场景本就没有后端复杂，没必要引入一套复杂的体系。

然而原型链设计的最让我诧异的是，实例对象竟然可直接访问并修改原型，从而影响所有其他实例对象，不愧是一把原型链，连接彼此心，牵动你和我：

function GirlFriend() {} // 或者 class GirlFriend {}

// 假设张无忌同时谈了两个女朋友
let zhaoMin = new GirlFriend()
let zhouZhiRuo = new GirlFriend()

// 某天周芷若黑化跟张无忌分手了
zhouZhiRuo.breakUp = true

// 周芷若一气之下将其原型也修改了
zhouZhiRuo.__proto__.breakUp = true

// 然后赵敏也躺枪了，张无忌成单身狗了
console.log(zhaoMin.breakUp) // true
这是不是一件非常可怕的事情！这肯定是一件非常可怕的事情！赵敏是无辜的啊！韦小宝该怎么办？

后来，我在规范中看到这样一段描述：

Every ordinary object has a Boolean-valued [[Extensible]] internal slot that controls whether or not properties may be added to the object. If the value of the [[Extensible]] internal slot is false then additional properties may not be added to the object. In addition, if [[Extensible]] is false the value of the [[Prototype]] internal slot of the object may not be modified. Once the value of an object's [[Extensible]] internal slot has been set to false it may not be subsequently changed to true.

看样子，只要将原型对象的内部属性[[Extensible]]设置为 false 即可防止被子对象篡改。然而由于是内部属性，并不属于 ES 语言的一部分，浏览器也没有像暴露原型一样将其暴露出来，所以此路不通。另外，即使用 ES6 新增的 class，也无法避免被子对象修改的命运，估计在后面的 ES 版本中会加上 class 限定符吧。

难道就没有别的办法了吗？解铃还须系铃人，既然问题出在原型上，那么还是得从原型下手。赵敏心想，如果我也直接修改原型上breakUp属性为 false，那么周芷若也会回到无忌哥身边，干脆一不做二不休：

function Wife() {}
zhaoMin.__proto__ = Wife.prototype
从此，张无忌和赵敏过上了幸福快乐的生活。这个故事有些夸张，但你我身边，或许就有周芷若和赵敏这样的人才。

可以说，ES 的原型链设计的相当自由，它只是提供了一个 playground，至于怎么去写，怎么去玩，规则都可以由你自己定义。ES 设计之初的理念就是越简单越好，所谓大道至简，悟在天成，JS 的灵活，得益于它的简单，JS 的复杂，亦归咎于它的简单。

### 飞升篇

慢慢地，我开始觉着 ES 的设计理念由内到外散发着一股自由的气息，在 JS 的世界中，你可以很面向对象，也可以很面向过程，还可以很函数式；时而腾云驾雾游九州，时而不慎跌落终结谷；有精华亦有糟粕，正如有光明必有阴影。JS 开发路上，可能会经历人生的大彻大悟，大起大落，但这不正是我们生活的真实写照吗？我们要时刻保持一种包容和谦卑的态度，去书写更加优雅和睿智的人生，打造属于前端开发者的未来。
