## Create PDF documents

ReLaXed: Create PDF documents using web technologies

* how to use (windows)
```
  git clone https://github.com/RelaxedJS/ReLaXed.git .
  npm install
  npm link --unsafe-perm=true
  
  then: create a new, empty my_document.pug file,and start a ReLaXed process from a terminal:
  
  relaxed my_document.pug
  
  ReLaXed will watch my_document.pug and its directory. Every time a file changes,
  my_document.pug will be compiled as my_document.pdf
```
  Now write and save the following in my_document.pug:
  ```
    h1 My document's title
    p A paragraph in my document
  ```
  A new file, my_document.pdf, will be created.
  
