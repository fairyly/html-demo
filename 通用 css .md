# 通用 css

- 省略号 ...
  ```
    ellipsis {
      display: block;
      overfolw: hidden;
      text-overflow: ellipsis;
      white-space: no-wrap;
    }
  ```

- 上边框(0.5px), 伪元素写法
  ```
  border-top {
    position: relative;
  }
  border-top::before {
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
  ```
  border-bottom {
    position: relative;
  }
  border-bottom:after {
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
