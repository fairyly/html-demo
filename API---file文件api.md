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
  
  - blob 对象的 slice 方法  
    Blob.slice(start,end,contenttype)

* 4.FileReader对象
  - fileReader提供了四种不同的读取文件的方式，如：
  - readAsArrayBuffer会将文件内容读取为ArrayBuffer对象，
  - readAsBinaryString则将文件读取为二进制串;
  - readAsDataURL会将文件内容进行base64编码后输出；
  - readAsText读取文件的单位是字符，故对于文本文件，只要按规定的编码方式读取即可；
  
  - onabort
    当读取操作被中止时调用.
  - onerror
    当读取操作发生错误时调用.
  - bonload
    当读取操作成功完成时调用.
  - onloadend
    当读取操作完成时调用,不管是成功还是失败.该处理程序在onload或者onerror之后调用.
  - onloadstart
    当读取操作将要开始之前调用.
  - onprogress
    在读取数据过程中周期性调用.
  ```
     $('input').change(function(){
         var reader = new FileReader();
         reader.onload = function(e){
            var dataURL=this.result;
            $(".qrcode-pic img").attr("src", dataURL);
         }
         reader.readAsDataURL(this.files[0]);
     });
  ```


###  File System API

* 文件系统：https://developer.mozilla.org/zh-CN/docs/WebGuide/API/File_System/Introduction#quota
* https://www.html5rocks.com/zh/tutorials/file/filesystem/

### 创建文件之前，需要访问文件系统，申请配额

```
  1. 请求访问本地文件系统
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(type,size,successCallback,errCallback)
    type: window.TEMPORARY 这个是临时的存储空间 或者 window.PERSISTENT 这个是永久的存储空间;
    size: 使用文件存储空间的大小,(byte);
    successCallback: 请求成功时执行的回调函数;
    errCallback: 请求失败时的回调函数
    
  2. 申请配额 `window.webkitStorageInfo' is deprecated.`
    navigator.webkitPersistentStorage.requestQuota (type,size, successCallback,errCallback)
    type: TEMPORARY 这个是临时的配额 或者 window.PERSISTENT 这个是永久的配额;
    size: 配额的空间大小,(byte);
    successCallback: 申请配额成功时执行的回调函数;
    errCallback: 申请配额失败时的回调函数
    
  3. 创建文件
    操作思路： 当调用 requestFileSystem() 方法请求本地文件系统时，如果请求成功，则执行一个回调，
    回调函数中包含一个参数，它指向可以回去的文件系统对象，该对象包含一个 root 属性，属性值为一个 DirectoryEntry 对象，
    通过文件系统的根目录对象的 getFile() 方法在根目录中创建文件;
    请求
    文件系统成功回调方法如下：
    function initFs(fs) {
      console.log(fs);
      // 创建文件
      fs.root.getFile(
          'test.txt',
          {create:true},
          function(fileEntry){
            console.log(fileEntry);
          },
          errCallback
      }
    }
    
```

1.请求访问文件系统
```
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
window.webkitRequestFileSystem(window.PERSISTENT, 2*1024, initFs, errorHandler);
function initFs(fs) {
    console.log(fs);
    // 创建文件
    fs.root.getFile(
        'test.txt',
        {create:true},
        function(fileEntry){
            console.log(fileEntry);
            // 写入文件
            fileEntry.createWriter(
                    function (fileWriter){
                        console.log(fileWriter);
                        fileWriter.seek(fileWriter.length);
                        var blob = new Blob(['test'])
                        fileWriter.write(blob);
                    },errorHandler
                );
                // 读取文件
                fileEntry.file(
                    function(file) {
                        var reader = new FileReader();

                        reader.onloadend = function(e) {
                        var txtArea = document.createElement('textarea');
                        txtArea.value = this.result;
                        document.body.appendChild(txtArea);
                        console.log(this.result)
                    };

                   reader.readAsText(file);
                }, errorHandler);
                
                // 删除文件
                fileEntry.remove(function (callback) {
                    //log.debug(fileName + '文件删除成功.');
                     // if (callback) callback(fileName);
                     console.log(fileEntry.name,callback)
                 }, errorHandler);
        },
        errorHandler
    );
    // 创建目录
    fs.root.getDirectory('Documents', {create: true}, function(dirEntry) {
      alert('You have just created the ' + dirEntry.name + ' directory.');
    }, errorHandler);
}
function errorHandler(err) {
    console.log(err)
    switch (err.code) {
    case FileError.NOT_FOUND_ERR:
      msg += 'File or directory not found';
      break;

    case FileError.NOT_READABLE_ERR:
      msg += 'File or directory not readable';
      break;

    case FileError.PATH_EXISTS_ERR:
      msg += 'File or directory already exists';
      break;

    case FileError.TYPE_MISMATCH_ERR:
      msg += 'Invalid filetype';
      break;

    default:
      msg += 'Unknown Error';
      break;
  };

 console.log(msg);
}
```

2. 申请磁盘配额

```
'window.webkitStorageInfo' is deprecated. Please use 'navigator.webkitTemporaryStorage' or 'navigator.webkitPersistentStorage' instead.
window.webkitStorageInfo 已经被弃用，使用 navigator.webkitTemporaryStorage 和 navigator.webkitPersistentStorage替代

// 申请磁盘配额
var requestedBytes = 1024*1024*10; // 10MB
navigator.webkitPersistentStorage.requestQuota (
   PERSISTENT,// 指定为永久数据申请磁盘配额
    requestedBytes, function(grantedBytes) {  、
        window.requestFileSystem(window.PERSISTENT, grantedBytes, initFs, errorHandler);

    }, function(e) { console.log('Error', e); }
);

// 查看请求存储使用情况和容量
navigator.webkitTemporaryStorage.queryUsageAndQuota (
    TEMPORARY,// 指定为临时数据申请磁盘配额
    function(usedBytes, grantedBytes) {  
        console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
    }, 
    function(e) { console.log('Error', e);  }
);



</script>
```

* blog:http://blog.csdn.net/salonzhou/article/details/28275713

```
创建一个方法用来自动创建目录：

function createDir(rootDir, folders) {
  rootDir.getDirectory(folders[0], {create: true}, function(dirEntry) {
    if (folders.length) {
      createDir(dirEntry, folders.slice(1));
    }
  }, errorHandler);
};
createDir(fs.root, 'Documents/Images/Nature/Sky/'.split('/'));
使用这个小技巧，我们只需要提供完整的路径就能自动为我们创建文件夹。
```


## base64 编码

* atob(): 将一串经过 base64 编码后的的 base64 格式的字符串进行解码处理
* btoa(): 将一串字符串进行 base64 编码处理
