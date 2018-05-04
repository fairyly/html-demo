# RESTful web API Documentation Generator

### INSTALL

```
  npm install apidoc -g
```

### RUN
ep: 项目目录
-apidocjs  
  -myapp
    - doc.js
  - apidoc.json  

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

```
  apidoc -i myapp/ -o apidoc/
```

