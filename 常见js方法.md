# 常见js方法

```
// 时间戳转换
function timeStamp2String (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "年" + month + "月" + date +"日 "+ hour +":"+ minute +":"+ second;
};
function timeFormat (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "." + month + "." + date +" "+ hour +":"+ minute +":"+ second;
};
function timeFormattwo (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return month + "." + date +" "+ hour +":"+ minute +":"+ second;
};
function dateFormat (time){
    if (!time) {return;}
    var datetime = new Date();                  
    datetime.setTime(time*1000);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date +" "+ hour +":"+ minute +":"+ second;
};

function time2date(time){
    var unixTimestamp = new Date(time * 1000);
    var commonTime = unixTimestamp.toLocaleString();
    return commonTime;//返回 格式："2020-7-21 11:54:38"
}

//秒转时分秒
function formatSeconds(value){
    if (!value) {return;}
    var h = Math.floor(value/3600);
    if (h < 10) {
          h = '0' + h;
        }
    var m = Math.floor((value-h*3600)/60);
    if (m < 10) {
          m = '0' + m;
        }
    var s = Math.floor((value-h*3600)%60);
    if (s < 10) {
          s = '0' + s;
        }
    return h + ':' + m + ':' + s;
}

//日期时间格式转换
function toLocalDate(d){
    var datetime = d;
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    if (hour < 10) {
          hour = '0' + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
          minute = '0' + minute;
    }
    var second = datetime.getSeconds();
    if (second < 10) {
          second = '0' + second;
    }
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date +" "+ hour +":"+ minute +":"+ second;
}

//对象转换成json数组
function transform(obj){
    var arr = [];
    var label;
    var value;
    for(var item in obj){
        arr.push({label:obj[item],value:item});
    }
    return arr;
};

//对象键名转换成数组
function transformobj(obj){
    var arr = [];
    var label;
    var value;
    for(var item in obj){
        arr.push(item);
    }
    return arr;
};

function transformarr(arr){
    var obj = {};
    var label;
    var value;
    for(var i = 0; i < arr.length; i++){
        obj[i] = arr[i];
        arr.push({label:i,value:obj[i]});
    }
    return arr;
};

//数组中删除指定元素
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
    }
  }
}

//对象克隆
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

//新警报桌面通知提示
function desktip(){
    if(Notification && Notification.permission !== "granted"){
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                Notification.permission = status;
            }
        });
    }
    var t = new Date().toLocaleString();
    var options={
        dir: "ltr",
        lang: "utf-8",
        icon: "http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg",
        body: "新警报",
        title:"CMS管理系统",
        tag:"CMS管理系统",
        vibrate:100,//震动
        data:'http://10.10.10.229:9096/s4.17/home.html#/notice',
        renotify:true,//替换
        //silent:true//有声音
    };
    if(Notification && Notification.permission === "granted"){
        var n = new Notification("Hi: "+ t, options);    
        n.onshow = function(){
            console.log("You got me!");
        };
        n.onclick = function() {
            console.log("You clicked me!");
            alert("有新警报了");
            n.close();
        };
        n.onclose = function(){
            console.log("notification closed!");
            var a = window.location.href;
            console.log(a);
            window.location.replace(a);
        };        
        n.onerror = function() {
            console.log("An error accured");
        }            
    }else if(Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status){
            if(Notification.permission !== status){
                Notification.permission = status;
            }

            if(status === "granted"){
                for(var i = 0; i < 3; i++){
                    var n = new Notification("Hi! " + i, {
                        tag: "Beyoung",
                        icon: "http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg",
                        body: "你好呀，我是第" + i +"条消息啦！"
                    });
                }
            }
        });
    }else{
        console.log("Hi!");
    }
}


```
---

# 常见的算法问题：
```
1、判断一个单词是不是回文；

  var test="manam";
  test.split('');//字符串转成数组
  test.split('').reverse();//数组反序排列
  test.split('').reverse().join('');//数组转化字符串
  
2、去掉数组中重复的值；

  第一种方法：比较浪费资源和时间
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  for(var i=0;i<a.length;i++){
    if(arr.indexof(a[i])==-1){//判断arr中元素是否存在;
    //arr.indexof(a[i])就是返回a[i]对应元素第一次出现在arr中的位置
      arr.push(a[i]);
    }
  }
  
  第二种方法：
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  var hash={};
  for(var i=0;i<a.length;i++){
    if(!hash[a[i]]){//判断键值是不是存在
      hash[a[i]]=true;
      arr.push(a[i]);
    }
  }
  
  第三种很简单的方法（ES6中Set）
   var a=[1,55,66,1,22,66,55,88];
   var ar=[...new Set(a)];
   ar//就是去掉重复的值后的数组
3、一个字符串中出现最多的字母；
  学会向对象中加入键名和键值简称加入键值对；

  var str='asssaagggggggggddddddd';
  var obj={};
  for(var i=0,l=str.length,k;i<l;i++){//先统计各个字母出现的次数
    k=str.charAt(i);//返回字符串给定位置的字符
    if(obj[k]){
      obj[k]++;
    }else{
      obj[k]=1;
    }
  }
  //再比较obj中键值最大的
  var m=0;
  var i=null;
  for(var k in obj){
    if(obj[k]>m){
      m=obj[k];//键值
      i=k;//键名
    }
  }
  console.log(i+','+m)
  
4、冒泡排序

  var arr=[55,88,12,36,1];
  for(var i=0;i<arr.length-1;i++)
  {
    for(var j=i+1;j<arr.length;j++){
      if(arr[i]>arr[j]){//从arr[0]开始比较大小
        var tem=arr[i];
        arr[i]=arr[j];
        arr[j]=tem
      }
    }
  }

5、 不借助临时变量，进行两个整数的交换

  var a=6;var b=8;
  b=b-a;
  a=a+b;
  b=a-b;
  
6、生成斐波那契数组的方法(前面两个数的和等于第三个数如：1,2,3,5,8,13,21,34)

  var n=9;//数列长度
  var fibarr = [];//数列数组
  var i = 0;
  while(i<n) {
    if(i<=1) {
      fibarr.push(i);
    }else{
      fibarr.push(fibarr[i-1] + fibarr[i-2])
    }
    i++;
  }
```
 ---

# js 正则验证


```
//IP验证
function iptest(ip){
    var pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (pattern.test(ip) == false) {
        alert('请输入IP地址');
    }
    return false;
}
```
