# 通用 css

- 省略号 ...
  ```css
  .ellipsis {
      display: block;
      overfolw: hidden;
      text-overflow: ellipsis;
      white-space: no-wrap;
  }
  ```

- 控制几行显示,超出显示省略号
  ```css
  .line-clam{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
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
