# indexDB

```
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
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
