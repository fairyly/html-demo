# express 图片上传

* https://xianyulaodi.github.io/2017/08/12/express%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0/
  ```
  html部分
  <input type="file" name="file" id="file"/><br/>
  <button id="upload">Upload</button>
  js,ajax部分

  $('#upload').on('click', function(e) {
     var formData = new FormData();
     formData.append('file', $('#file').prop('files')[0]);
     $.ajax({
       url: "/loadPic",
       contentType: false, //(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型
       processData: false, //默认情况下，发送的数据将被转换为对象(技术上讲并非字符串) 以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
       data: formData,
       type: 'post',
       success: function(data) {
         console.log(data);
       },
       error: function(err) {
         console.log('error');
       }
     })
   });
  node 部分

  我们这里使用 formidable 来弄我们的图片上传
  
  const config = require('../config'); 
  const formidable = require('formidable');
  const fs  = require('fs');
  router.post('/loadPic',(req,res,next) => {
    let form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = config.upload.path;  // 这里配置我们上传后图片的存放地址
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; // 单位为byte
    form.type = true;
    form.on('error', function(err) {
      console.error('upload failed', err.message);
      next(err);
    });
    form.parse(req,(err, fields, files) => {
      if (err) {
        res.send(err);
        return;
      };
      console.log(files);
      let extName = ''; //后缀名
      switch (files.file.type) {
          case 'image/pjpeg':
              extName = 'jpg';
              break;
          case 'image/jpeg':
              extName = 'jpg';
              break;
          case 'image/png':
              extName = 'png';
              break;
          case 'image/x-png':
              extName = 'png';
              break;
     }
      if (extName.length === 0) {
          res.json({
              code: 202,
              msg: '只支持png和jpg格式图片'
          });
          return;
      } else {
          let avatarName = '/' + Date.now() + '.' + extName;  //将文件名变为时间戳的形式
          let newPath = form.uploadDir + avatarName;  
          fs.renameSync(files.file.path, newPath); //重命名
          res.json({
              success: 1,
              url: newPath
          });
      }
    });
  });
 

  formidable的其他用法可点击查看 https://github.com/felixge/node-formidable
  ```
