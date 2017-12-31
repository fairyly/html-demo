# indexDB

* IndexedDB Polyfill:https://github.com/axemclion/IndexedDBShim  为仅支持WebSQL 的浏览器(例如移动版的 WebKit)
* JQuery IndexedDB 插件:http://nparashuram.com/IndexedDBShim/

* https://www.cnblogs.com/sxz2008/p/6639030.html

* 1.打开数据库：indexedDB.open('数据库名','数据库版本号')
* 2.数据库版本更新：indexedDB.open('数据库名','数据库版本号').onupgradeneeded = function(e){db = e.target.result;}
* 3.创建对象仓库：var store = db.createObjectStore("对象仓库名",{keyPath:'id',autoIncreement: false});// 相当于指定主键
* 4.创建索引：var dbindex = store.createIndex("索引名","对象的属性如username",{unique:false,multiEntry:false})

**所有针对数据的操作只能在一个事务中被执行**

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

* 测试 demo：
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
* 使用 get() 要求你知道你想要检索哪一个键。如果你想要遍历对象存储空间中的所有值，那么你可以使用游标

```
var objectStore = db.transaction("customers").objectStore("customers");
var customers = [];

objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    customers.push(cursor.value);
    cursor.continue();
  }
  else {
    alert("Got all customers: " + customers);
  }
};
```

* 使用索引：如通过姓名来查找一个客户
```
  var index = objectStore.index("name");
  index.get("Donna").onsuccess = function(event) {
    alert("Donna's SSN is " + event.target.result.ssn);
  };
  
  如果你需要访问带有给定 name 的所有的记录你可以使用一个游标
  可以在索引上打开两个不同类型的游标。一个常规游标映射索引属性到对象存储空间中的对象。一个键索引映射索引属性到用来存储对象存储空间中的对象的键。
  
  index.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是整个对象。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};

index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是那个 SSN。
    // 没有办法可以得到存储对象的其余部分。
    alert("Name: " + cursor.key + ", SSN: " + cursor.value);
    cursor.continue();
  }
};
```
* 指定游标的范围和方向
```
如果你想要限定你在游标中看到的值的范围，你可以使用一个 key range 对象然后把它作为第一个参数传给 openCursor() 或是 openKeyCursor()。你可以构造一个只允许一个单一 key 的 key range，或者一个具有下限或上限，或者一个既有上限也有下限。边界可以是闭合的（也就是说 key range 包含给定的值）或者是“开放的”（也就是说 key range 不包括给定的值）

// 只匹配 "Donna"
var singleKeyRange = IDBKeyRange.only("Donna");

// 匹配所有在 "Bill" 前面的, 包括 "Bill"
var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

// 匹配所有在 “Bill” 前面的, 但是不需要包括 "Bill"
var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

// Match anything up to, but not including, "Donna"
var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

//Match anything between "Bill" and "Donna", but not including "Donna"
var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

index.openCursor(boundKeyRange).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};

你可能想要以倒序而不是正序（所有游标的默认顺序）来遍历。切换方向是通过传递 prev 到 openCursor() 方法来实现的

objectStore.openCursor(null, IDBCursor.prev).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};
```
