# Parcel

文档: https://parceljs.org/getting_started.html

github: https://github.com/parcel-bundler/parcel

官网: https://parceljs.org/

Install with yarn:
```
yarn global add parcel-bundler
```
or with npm:
```
npm install -g parcel-bundler
```
```
parcel index.html
```
Now open http://localhost:1234/ in your browser. 

你也可以使用 -p <port number> 选项覆盖默认的端口。 如果没有自己的服务器可使用开发服务器，或者你的应用程序完全由客户端呈现。如果有自己的服务器，你可以在watch 模式下运行 Parcel 。当文件改变它仍然会自动重建并支持热替换，但是不会启动 web 服务。
  
```
parcel watch index.html
```



## 参考
- [零配置打包工具 Parcel 实践](https://blog.csdn.net/qq_27626333/article/details/79452746)
