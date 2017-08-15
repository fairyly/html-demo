# html-demo
html-demo


身份证号查询：[开始查询](https://fairyly.github.io/html-demo/id.html)

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

据说这样开启了硬件加速，比较耗内存；

8、Document 对象属性和方法

```
document.activeElement:返回当前获取焦点元素; 
var x = document.activeElement.tagName;
document.getElementById("demo").innerHTML = x;


document.baseURI:返回文档的绝对基础 URI;

document.cookie：设置或返回与当前文档有关的所有 cookie;

document.createAttribute:创建一个属性节点;
var h1=document.getElementsByTagName("H1")[0];
var att=document.createAttribute("class");
att.value="democlass";
h1.setAttributeNode(att);

document.domain:返回当前文档的域名;

document.referrer:返回载入当前文档的文档的 URL;

document.readyState:返回文档状态 (载入中……);
```
-------------------------------------------------
9、ie8中不支持rgba();可以使用filter：opacity();

ie8中placeholder不显示，可以使用jquery.placeholder插件；


10、文件上传
   blob对象：是一个可以存储二进制文件的容器；
   
```
   $("input").change(function(){
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
           $('.upfile1').css("background-image", "url("+objUrl+")");
        }    
    });
     //建立一个可存取到该file的url
    function getObjectURL(file){
        var url = null; 
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
    } 
   
   FileReader对象：FileReader通过异步的方式读取文件内容，结果均是通过事件回调获取;
   ileReader提供了四种不同的读取文件的方式，如：
   readAsArrayBuffer会将文件内容读取为ArrayBuffer对象，
   readAsBinaryString则将文件读取为二进制串;
   readAsDataURL会将文件内容进行base64编码后输出；
   readAsText读取文件的单位是字符，故对于文本文件，只要按规定的编码方式读取即可；
   而对于媒体文件（图片、音频、视频），其内部组成并不是按字符排列，
   故采用readAsText读取，会产生乱码，同时也不是最理想的读取文件的方式
  
   $('input').change(function(){
      var reader = new FileReader();
        reader.onload = function(e){
            var dataURL=this.result;
            $(".qrcode-pic img").attr("src", dataURL);
        }
        reader.readAsDataURL(this.files[0]);
   });
  
```

11、let 

for循环的计数器，就很合适使用let命令。

for (let i = 0; i < 10; i++) {}

console.log(i);

//ReferenceError: i is not defined

上面代码中，计数器i只在for循环体内有效，在循环体外引用就会报错。

下面的代码如果使用var，最后输出的是10。

```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中，变量i是var声明的，在全局范围内都有效。
所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。

```

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量i是let声明的，当前的i只在本轮循环有效，
所以每一次循环的i其实都是一个新的变量，所以最后输出的是6
