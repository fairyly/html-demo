

# 旷视API接口调用demo

```
<!DOCTYPE HTML>
<html lang="en">
<head>
	<title> New Document </title>
	<meta charset="utf-8">
	<script src="http://xuan.news.cn/cloudnews/xhcms_2014/js/jquery.min.js"></script>
</head>
<body>
	<form enctype="multipart/form-data" class="upload-form">
			<div class="trgger-upload">choose a image file:</div>
			<input type = "file" id = "file" name = "fileImg" class="upload-btn" />
			<span class="submit-btn">submit</span>
	</form>
</body>
	<script type="text/javascript">
		var postData = function( form , callback){
			var formData = new FormData( form );
			formData.append('api_key','9umCYpVA66zSsdktimDeWQt55NNuFdVl'); // entry your api_key
			formData.append('api_secret','xdLDu2HP6UUyPBeyW__4xCe0ef4uqY0k'); // entry your api_secret
			formData.append('image_file', $('#file')[0].files[0]);
			$.ajax({
				url: "https://api-cn.faceplusplus.com/facepp/v3/detect",
				type: "POST",
				data: formData,    //处理表单数据
				dataType: 'json',
				processData: false,
				contentType: false,

				success: function(data){
					console.log(data);
				},

				error: function(data){
					console.log(data);
				}
			})
		}
		$(".submit-btn").on("click",function(){
			postData($(this).parents("form")[0]);
		})
	</script>
</html>
```


## PHP示例代码

```
<?php 

  
    $image="images/r1.jpg";
    $fp = fopen($image, 'rb');
    $content = fread($fp, filesize($image)); //二进制数据
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
                                   CURLOPT_URL => "https://api-cn.faceplusplus.com/facepp/v3/detect",
                                   CURLOPT_RETURNTRANSFER => true,
                                   CURLOPT_ENCODING => "",
                                   CURLOPT_MAXREDIRS => 10,
                                   CURLOPT_TIMEOUT => 30,
                                   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                                   CURLOPT_CUSTOMREQUEST => "POST",
                                   CURLOPT_POSTFIELDS => array('image";filename="image'=>"$content", 'api_key'=>"9umCYpVA66zSsdktimDeWQt55NNuFdVl",'api_secret'=>"xdLDu2HP6UUyPBeyW__4xCe0ef4uqY0k"),
                                   CURLOPT_HTTPHEADER => array(
                                                               "cache-control: no-cache",
                                                               ),
                                   ));
    
    $response = curl_exec($curl);
    $err = curl_error($curl);
    
    curl_close($curl);
    
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }

 ?>
```


