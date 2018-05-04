# RESTful web API Documentation Generator

### INSTALL

```
  npm install apidoc -g
```

### RUN
ep: 项目目录结构
```
-apidocjs    
  -myapp  
    -doc.js  
  -apidoc.json    
```

#### doc.js:
```
/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
```
#### apidoc.json:

```
  {
    "name": "example",
    "version": "0.1.0",
    "description": "apiDoc basic example",
    "title": "Custom apiDoc browser title",
    "url" : "https://api.github.com/v1"
  }
```
### run generator:
从 myapp
```
  apidoc -i myapp/ -o apidoc/ 
```
### show html

生成文档后,直接进入 apidoc, 打开apidoc文件夹下的index.html即可看到效果

=============================================================================


#### apidoc 使用方式: 
- 在命令行中输入
```
apidoc -f ".*\\.js$" -f ".*\\.java$" -i myapp/ -o apidoc/ -t mytemplate/
```

- 参数说明： 
```
-f 文件过滤 
使用正则表达式，表示哪些文件需要本转换，不设置的情况下，默认为.cs .dart .erl .go .java .js .php .py .rb .ts 后缀的文件。

-i 代码文件夹

-o 输出Api文档的路径

-t 使用模板文件的路径，可以自定义输出的模板
```
- 常用的命令格式如下:
```
apidoc -i myapp/ -o apidoc/ 
```

- 配置 

无package.json文件时，需要在代码文件夹的根目录下，创建apidoc.json文件。
