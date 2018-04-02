### 大文件分片上传

demo: https://www.cnblogs.com/waited/p/5256477.html

http://www.k2zone.cn/?p=295

php:

```
借助js的Blob对象FormData对象可以实现大文件分片上传的功能，关于Blob和FormData的具体使用方法可以到如下地址去查看
FormData 对象的使用
Blob 对象的使用
以下是实现代码，本例中后端代码使用php来实现，只是演示基本功能，具体一些文件验证逻辑先忽略。
前段代码：

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>upload</title>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
    <input type="file" name="file" id="file">
    <button id="upload" onClick="upload()">upload</button>
    <script type="text/javascript">
        var bytesPerPiece = 1024 * 1024; // 每个文件切片大小定为1MB .
        var totalPieces;
        //发送请求
        function upload() {
            var blob = document.getElementById("file").files[0];
            var start = 0;
            var end;
            var index = 0;
            var filesize = blob.size;
            var filename = blob.name;

            //计算文件切片总数
            totalPieces = Math.ceil(filesize / bytesPerPiece);
            while(start < filesize) {
                end = start + bytesPerPiece;
                if(end > filesize) {
                    end = filesize;
                }

                var chunk = blob.slice(start,end);//切割文件    
                var sliceIndex= blob.name + index;
                var formData = new FormData();
                formData.append("file", chunk, filename);
                $.ajax({
                    url: 'http://localhost:9999/test.php',
                    type: 'POST',
                    cache: false,
                    data: formData,
                    processData: false,
                    contentType: false,
                }).done(function(res){ 

                }).fail(function(res) {

                });
                start = end;
                index++;
            }
        }
    </script>
</body>
</html>
后端php代码：

<?php

header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$file = $_FILES['file'];
$filename = $file['name'];
file_put_contents($filename, file_get_contents($file['tmp_name']), FILE_APPEND);
```
