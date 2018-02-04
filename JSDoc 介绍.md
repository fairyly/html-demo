

# JSDoc 介绍

* http://www.css88.com/doc/jsdoc/index.html

```
JSDoc注释
JSDoc注释一般应该放置在方法或函数声明之前，它必须以/ **开始，以便由JSDoc解析器识别。其他任何以/*，/***或者超过3个星号的注释，都将被JSDoc解析器忽略。
例如一下代码：

/**
 * Book类，代表一个书本.
 * @constructor
 * @param {string} title - 书本的标题.
 * @param {string} author - 书本的作者.
 */
function Book(title, author) {
    this.title=title;
    this.author=author;
}
Book.prototype={
    /**
     * 获取书本的标题
     * @returns {string|*}
     */
    getTitle:function(){
        return this.title;
    },
    /**
     * 设置书本的页数
     * @param pageNum {number} 页数
     */
    setPageNum:function(pageNum){
        this.pageNum=pageNum;
    }
};
```
