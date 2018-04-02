### 大文件分片上传

demo: https://www.cnblogs.com/waited/p/5256477.html

http://www.k2zone.cn/?p=295


http://fex.baidu.com/webuploader/

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


next:

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>HTML5大文件分片上传</title>
        <script src="js/spark-md5.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
        <script>
            var page = {
                init: function() {
                    $("#upload").click($.proxy(this.upload, this));
                    $("#download").click($.proxy(this.download, this));
                },
                upload: function() {
                    var file = $("#file")[0].files[0], //文件对象
                        name = file.name, //文件名
                        size = file.size, //总大小
                        succeed = 0,//上传片的index
                        spark = new SparkMD5();
                    var shardSize = 2 * 1024 * 1024, //以2MB为一个分片
                        shardCount = Math.ceil(size / shardSize); //总片数
                    //声明必要的变量
                    var fileReader = new FileReader(),
                        //文件分割方法
                        blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
                        currentChunk = 0,//计算MD5的index
                        //创建md5对象
                        spark = new SparkMD5();
 
                    //每块文件读取完毕之后的处理
                    fileReader.onload = function(e) {
                        //每块交由sparkMD5进行计算
                        spark.appendBinary(e.target.result);
                        currentChunk++;
 
                        //如果文件处理完成计算MD5，如果还有分片继续处理
                        if(currentChunk < shardCount) {
                            loadNext();
                        } else {
                            var md5 = spark.end();
                            console.log(md5);
                            var checkJson = {}; //接口需要
                            checkJson.plat = {};
                            checkJson.data = {};
                            checkJson.data.filename = name;
                            checkJson.data.filesize = size;
                            checkJson.data.filechunksize = shardSize;
                            checkJson.data.filemd5 = md5;
                            checkJson.data.creator = 'zhanshancheng';
                            var checkJsonStr = JSON.stringify(checkJson);
                            console.log(shardCount);
                            var i = 0;
                            function shardCountIndex() {
                                //构造一个表单，FormData是HTML5新增的
                                var fileForm = new FormData();
 
                                //计算每一片的起始与结束位置
                                var start = i * shardSize,
                                    end = Math.min(size, start + shardSize);
                                //Ajax提交
                                $.ajax({
                                    url: "http://10.35.1.95:18000/check_upload",
                                    type: "POST",
                                    cache: false,
                                    data: checkJsonStr,
                                    async: true, //异步
                                    processData: false, //很重要，告诉jquery不要对form进行处理
                                    contentType: false, //很重要，指定为false才能形成正确的Content-Type
                                    success: function(date1) {
                                        console.log(date1);
                                        /*{
                                            success: true,
                                            plat: {}
                                            data: {
                                                _id:String,//上传文件在MongoDB唯一编码
                                                status:Number,//状态0未上传,1已传完,2未传完待续传  
                                                curpos:Number,//已传位置             
                                            },
                                            error:{//success=false才返回，错误信息及错误码
                                                msg:"",
                                                code:""
                                            }
                                        }*/
 
                                        fileForm.append("jsonData", '{"plat":"{}","data":{"_id":"' + date1.data._id + '","curpos":"' + end + '"}}')
                                        fileForm.append("data", file.slice(date1.data.curpos, end)); //slice方法用于切出文件的一部分
                                        if(date1.success) {
                                            $.ajax({
                                                url: "http://10.35.1.95:18000/upload",
                                                type: "POST",
                                                cache: false,
                                                data: fileForm,
                                                async: true, //异步
                                                processData: false, //很重要，告诉jquery不要对form进行处理
                                                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                                                success: function(date2) {
                                                    $("#output").text(succeed + " / " + shardCount);
                                                    succeed++;
                                                    console.log(date2);
                                                    /*
                                                    {
                                                        success:true,
                                                        plat:{},
                                                        data:{
                                                            _id:String,//上传文件在MongoDB唯一编码
                                                            status:Number,//状态0未上传,1已传完,2未传完待续传  
                                                            curpos:Number,//已传位置             
                                                        },
                                                        error:{//success=false才返回，错误信息及错误码
                                                            msg:"",
                                                            code:""
                                                        } 
                                                    }
                                                     */
                                                    if(i < shardCount) { //i小于总片数就继续
                                                        shardCountIndex();
                                                        i++;
                                                    } else {
                                                        return;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            shardCountIndex();
                        }
                    };
 
                    //处理单片文件的MD5计算
                    function loadNext() {
                        var start = currentChunk * shardSize,
                            end = start + shardSize >= file.size ? file.size : start + shardSize;
                        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
                    }
 
                    loadNext();
                }
            };
            $(function() {
                page.init();
            });
        </script>
    </head>
    <body>
        <form id="uploadForm" enctype="multipart/form-data">
            <input id="file" type="file" name="file" />
            <button id="upload" type="button">upload</button>
            <span id="output" style="font-size:12px">等待</span>
        </form>
        <button id="download" type="button">download</button>
    </body>
</html>
```
