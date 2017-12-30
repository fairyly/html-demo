# indexDB

* IndexedDB Polyfill:https://github.com/axemclion/IndexedDBShim  为仅支持WebSQL 的浏览器(例如移动版的 WebKit)
* JQuery IndexedDB 插件:http://nparashuram.com/IndexedDBShim/

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

测试 demo：
```
var myDB={
            name:'test',
            version:5,
            db:null
        };


var students=[{ 
            id:1001, 
            name:"Byron", 
            age:24 
        },{ 
            id:1002, 
            name:"Frank", 
            age:30 
        },{ 
            id:1003, 
            name:"Aaron", 
            age:20 
        }];

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;//indexDB对象

var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // 事务对象

var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange; //key过滤对象

var IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;
var request,database;
var version = 1;

// 打开连接
request = indexedDB.open(myDB.name,myDB.version);
// 连接失败回调
request.onerror = function(e){
    console.log(e.target.errorCode);
};
// 连接成功回调
request.onsuccess = function(e){
    database = e.target.result;
    myDB.db=e.target.result;
    console.log('创建或打开数据库成功',database);

}
// 创建和更新数据库版本号
request.onupgradeneeded = function(e){
    console.log(e);
    
    var db=e.target.result;
    
    //创建一个对象存储空间
    if(!db.objectStoreNames.contains('students')){
        db.createObjectStore('students',{keyPath:"id"});
    }
    console.log('DB version changed to '+version);
};



// 添加数据
function addData(db,storeName){
    console.log("添加数据",storeName)
    var trans = db.transaction(storeName,'readwrite'); 
    var store = trans.objectStore(storeName); 

    for(var i=0;i<students.length;i++){
        store.add(students[i]);
    }

    trans.oncomplete = function(event) {
      alert("All done!");
    };

    trans.onerror = function(event) {
      // 不要忘记进行错误处理！
      console.log(event)
    };
}

setTimeout(function(){
    console.log(myDB.db)
    // addData(myDB.db,'students');
    // getDataByKey(myDB.db,'students',1001)
    // deleteDataByKey(myDB.db,'students',1001)
    updateDataByKey(myDB.db,'students',1002)
},2000);

// 查找数据 value 是以 keyPath 对应的值
function getDataByKey(db,storeName,value){
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName); 
    var request=store.get(value); 
    request.onsuccess=function(e){ 
        var student=e.target.result; 
        console.log(student)
        console.log(student.name); 
    };
}

// 删除数据
function deleteDataByKey(db,storeName,value){
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName); 
    store.delete(value).onsuccess = function(event) {
      // 删除数据成功！
      console.log("删除数据成功！")
    }; 
}

// 更新数据
function updateDataByKey(db,storeName,value){
    var transaction=db.transaction(storeName,'readwrite'); 
    var store=transaction.objectStore(storeName); 
    var request=store.get(value); 
    request.onsuccess=function(e){ 
        var student=e.target.result; 
        student.age=35;
        store.put(student).onsuccess=function(e){ 
            console.log("更新成功！！")
        }
    };
}
```
