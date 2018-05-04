# RESTful web API Documentation Generator

### INSTALL

```
  npm install apidoc -g
```

### RUN
ep: 项目目录
/apidocjs  
  -myapp  
  -apidoc.json  
              
apidoc.json:

```
  {
    "name": "example",
    "version": "0.1.0",
    "description": "apiDoc basic example",
    "title": "Custom apiDoc browser title",
    "url" : "https://api.github.com/v1"
  }
```
run generator:

```
  apidoc -i myapp/ -o apidoc/
```

