# indexDB

* https://www.cnblogs.com/sxz2008/p/6639030.html

```
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;//indexDB对象

var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // 事务对象

var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange; //key过滤对象

var IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;
var request,database;
request = indexedDB.open('test');
request.onerror = function(e){
    console.log(e.target.errorCode);
};
request.onsuccess = function(e){
    database = e.target.result;
    console.log('创建或打开数据库成功') ;
}
```
