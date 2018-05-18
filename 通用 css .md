# 通用 css

- 省略号 ...
  ```css
  .ellipsis {
      display: block;
      overfolw: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  ```

- 控制几行显示,超出显示省略号
  ```css
  .line-clam{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: pre-wrap;
    word-break: break-all;
    overflow: hidden;
  }
  ```

- 上边框(0.5px), 伪元素写法
  ```css
  .border-top {
    position: relative;
  }
  .border-top::before {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  ```
  
- 下边距(0.5px) ,伪元素
  ```css
  .border-bottom {
    position: relative;
  }
  .border-bottom:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }
  ```
- 左边距(0.5px) ,伪元素
  ```css
  .border-left::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 0px;
    border-left: 1px solid #e3e5e9;
    color: #e3e5e9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }
  ```
- 右边距(0.5px) ,伪元素
  ```
  :after {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }
  ```

- 边框 (0.5px)
  ```css
  .btn:after {
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
  }
  ```
- 右箭头 >
  ```
  :before {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    right: 15px;
    margin-top: -4px;
  }
  ```
