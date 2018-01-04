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



