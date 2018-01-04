# 文件API

* 1.ArrayBuffer:
  - MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。  
ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，  
它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。  

```
  new ArrayBuffer(length);// 语法

  var buf = new ArrayBuffer(32);// 创建时候，需要使用一个无符号长整数类型的参数，用于指定缓存区的长度，单位为 byte,
```

* 2.ArrayBufferView: 根据同一个 ArrayBuffer 对象 创建各种数值类型的数组   
  - Int8Array,
  - Uint8Array,
  - Uint8ClampedArray,
  - Int16Array,
  - Uint16Array,
  - Int32Array,
  - Uint32Array,
  - Float32Array,
  - Float64Array or
  - DataView.
  
  ```
    var buffer = new ArrayBuffer(8);
    var view   = new Int32Array(buffer);
  ```
  
  - 创建 DataView: new DataView(buffer [, byteOffset [, byteLength]])
    1.得到指定位置处的一个 8 位整数，
    ```
      var int8value = dateview.getInt8(byteOffset);
    ```
    2.设置指定位置处的一个 8 位整数
    ```
       dateview.setInt8(byteOffset,value);
    ```
 
* 3.blob 对象
  - 创建 blob: 
  ```
    var debug = {hello: "world"};
    var blob = new Blob([JSON.stringify(debug, null, 2)],{type : 'application/json'});
    
    文件上传   blob对象：是一个可以存储二进制文件的容器；

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
    
    使用 Blob 创建一个指向类型数组的URL
    var typedArray = GetTheTypedArraySomehow();
    var blob = new Blob([typedArray], {type: "application/octet-binary"});// 传入一个合适的MIME类型
    var url = URL.createObjectURL(blob);
    // 会产生一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
    // 你可以像使用一个普通URL那样使用它，比如用在img.src上。
  ```



