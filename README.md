# html-demo
html-demo


常见的算法问题：

1、判断一个单词是不是回文；

```
  var test="manam";
  test.split('');//字符串转成数组
  test.split('').reverse();//数组反序排列
  test.splite('').reverse().join('');//数组转化字符串
  
```
2、去掉数组中重复的值；

```
  第一种方法：比较浪费资源和时间
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  for(var i=0;i<test.length;i++){
    if(arr.indexof(a[i])==-1){//判断arr中元素是否存在;arr.indexof(a[i])就是返回a[i]对应元素第一次出现在arr中的位置
      arr.push(a[i]);
    }
  }
  
  第二种方法：
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  var hash={};
  for(var i=0;i<test.length;i++){
    if(!hash[a[i]]){//判断键值是不是存在
      hash[a[i]]=true;
      arr.push(a[i]);
    }
  }
  
```
3、一个字符串中出现最多的字母；  
   学会向对象中加入键名和键值简称加入键值对；
```
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
  
```
