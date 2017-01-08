# html-demo
html-demo


常见的算法问题：

1、判断一个单词是不是回文；

```
  var test="manam";
  test.split('');//字符串转成数组
  test.split('').reverse();//数组反序排列
  test.split('').reverse().join('');//数组转化字符串
  
```
2、去掉数组中重复的值；

```
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
4、冒泡排序
```
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

```
5、 不借助临时变量，进行两个整数的交换
```
  var a=6;var b=8;
  b=b-a;
  a=a+b;
  b=a-b;
  
```
6、生成斐波那契数组的方法(前面两个数的和等于第三个数如：1,2,3,5,8,13,21,34)
```
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
7、overflow:scroll 在 iOS上滑动不流畅问题解决办法
在模拟聊天对话页面时候，遇到问题，多余聊天对话滑动不流畅。话不多说，解决方法如下：

在  overflow:scroll部分，也就是需要滑动的层处，加css

-webkit-overflow-scrolling: touch;

8、Document 对象属性和方法

```
-document.activeElement:返回当前获取焦点元素; 
    var x = document.activeElement.tagName;
    document.getElementById("demo").innerHTML = x;
```
