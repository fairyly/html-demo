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
    if(arr.indexof(a[i])==-1){
      arr.push(a[i]);
    }
  }
  
  第二种方法：
  var a=[1,55,66,1,22,66,55,88];
  var arr=[];
  var hash={};
  for(var i=0;i<test.length;i++){
    if(!hash[a[i]]){
      hash[a[i]]=true;
      arr.push(a[i]);
    }
  }
```
