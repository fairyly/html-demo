# 本地数据库 sqllite

```
var db = openDatabase('mydb','1.0','test db',2*1024);  // 相当于新建数据库
db.transaction(function(tx){
    // tx.executeSql('create table if not exists logs (id unique,log)',[]); // 新建表
    // tx.executeSql('create table if not exists mydata (name txt,msg text,time integer)',[]);
    // tx.executeSql('insert into mydata values (?,?,?)',['test','heheh',22222],dataHandle,errorHandle); // 插入数据
    // tx.executeSql('select * from mydata',[],dataHandle,errorHandle);  // 查询数据
    tx.executeSql('update mydata set msg=? where rowid=?',['wofdggge','1'],dataHandle,errorHandle);  // 更新数据
})

function dataHandle(transaction,results){
    // 执行sql语句成功时处理函数
    console.log("数据表已创建！！！",transaction,results)
    console.log("结果！！！",results.rows)
}

function errorHandle(transaction,errmsg){
    // 执行sql语句错误时处理函数
    console.log("errmsg:",errmsg)
}
```
