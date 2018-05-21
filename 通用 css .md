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
  
- 虚线,可控制间隔
```
width: 100%;
height: 1px;
background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
background-size: 8px 1px;
background-repeat: repeat-x;
```
## 基础样式

```
@charset "utf-8";
html {
  color: #000;
  background: #fff;
  overflow-y: scroll;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

html * {
  outline: none;
  -webkit-text-size-adjust: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html,
body {
  font-family: sans-serif;
}


/* 内外边距通常让各个浏览器样式的表现位置不同 */

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
hr,
button,
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  margin: 0;
  padding: 0;
}

input,
select,
textarea {
  font-size: 100%;
}


/* 去掉各 Table  cell 的边距并让其边重合 */

table {
  border-collapse: collapse;
  border-spacing: 0;
}


/* 去除默认边框 */

fieldset,
img {
  border: 0;
}


/* 去掉 firefox 下此元素的边框 */

abbr,
acronym {
  border: 0;
  font-variant: normal;
}


/* 一致的 del 样式 */

del {
  text-decoration: line-through;
}

address,
caption,
cite,
code,
dfn,
em,
th,
var {
  font-style: normal;
  font-weight: 500;
}


/* 去掉列表前的标识, li 会继承 */

ol,
ul {
  list-style: none;
}


/* 对齐是排版最重要的因素, 别让什么都居中 */

caption,
th {
  text-align: left;
}


/* 来自 yahoo, 让标题都自定义, 适应多个系统应用 */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: 500;
}

q:before,
q:after {
  content: '';
}


/* 统一上标和下标 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sup {
  top: -0.5em;
}

sub {
  bottom: -0.25em;
}


/* 正常链接 未访问 */


/* 鼠标悬停 */

a:hover {
  text-decoration: underline;
}


/* 默认不显示下划线，保持页面简洁 */

ins,
a {
  text-decoration: none;
}

[data-ctrl-name="loading"] {
  width: 100%;
  height: 100%;
  display: -ms-flexbox;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -moz-box;
  -moz-box-align: center;
  -moz-box-pack: center;
}

[data-ctrl-name="loading"] div {
  position: relative;
}

[data-ctrl-name="loading"] .arrow {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}

[data-ctrl-name="loading"] .arrow.down {
  display: block;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlxJREFUeNrsmrsvBFEUh3cWUSCsWCIKhUqiRQiCoKASDVrxT2klOtlEI0EUGqHzikJJ4hXWI55ZM37HHjGZ7GLuunfHzLnJl3nIzN7vnpl7z9llOY4Ti1KLxyLWRFiERViERViERViERVhXKy12B9LptMUDT9iJROIt1MLcykEdqMQApLE9h7it44OsIFVLcKUAVPEAXOiQtoJaHkI+/r+Fxy33RNlInw3OQOZX16f+pp/FmKUXwQk4BhtRWJbGXPtd/M6GWrjMc1wiiYcIi7AIh14YiUk55+GRiXATqImEMEe2HkxRpEMvjByb8sxDcA96KO/+b+WhivQtNvOQraWyEtxFYpaG+DVH2nCExy0a6VkexDlUN1cF3rECTNO3IGABPP3wiBt/pFOgj/dnMAD9kD5RvFc1WAEdfDwBRoO2Dne79lvAMqSTCveha1ZdstSGg5h4rHmO28C6T+nkxzWxWLvn/GYQhSfBdgHSn7JtnvP7/EgHTDjl0DIxklc6K6QiOwgug5lLf0nv+pCuMyWrZx3OSg9xh3NJe9uSKVl9iUfKueQO55L2rpmtpmT1Zlr5pb8r6bTK6k8t80sXRda3sErB/UtpI7IqEY4XKH2Q4697pmRVhCn3LlOSzgoNgEfXOZrRe03JqhQPGZ5Vj8CLojStxZ1cBW2BZ5PlpO8f0xDdBpbeATd+SrMgNKVfDyFNUWoG5+AU0pmwC9M7XMJFOvEKHnhrFxp1vr/Fxb1ddOE8nXNPgLY7o/puAHJMgJ/Hjo7XxZJ/EBdhERZhERZhERZhERbhv2nvAgwABwXVjqgbVTEAAAAASUVORK5CYII=);
}

[data-ctrl-name="loading"] .arrow.up {
  display: block;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz5JREFUeNrsmktrFEEQx2eG9REV4yYGoycv3nzgxeDRkBxy8QMIXhT8Kn4I0aN6kZy8+MhRMYIYiOQkIigSVncEicbHblsVa0Lb2z3T3VPTuyFd8GdnZmdm59dVXd1ds6kQItlNliW7zCJwBI7AETgCR+AIHIGDWYvjJnme/7ffbrfxWAqbKHXuur3fvjaR5He68nepsi07pE/XDsyF8feCAKugRdTQcUEPqTWE1ZhQtgVB7wUdpM8NUk8HX2Wp6+LBAGltOlDFy1UOOg46BnoP6rh62Bq4LmiJV12hMdSPgM6B1kDrLMAcgAbQ/aAZCtUXoO8e0Gj7QKcQGoB7tYC5YDUeHadQHKd9hD1ZhKYjOHp6D34C8E9v4AZhp0BPQWeU429Al1RoS/CtTF7LwzbAZX3RYAi7BDpt+H4VNOsLDcDCC3hIsJXQVeAuSSsrQDmTlAdsQucs0TUcDZ2UTRKGBStCQ2eBYdc0SWc1JHQWEBbBLmvOnzVAP5GGLzboLCAsgn3WXNMxQJ8FPeKGzgLCdkquNUFf4IZ2Bi4ZHh54wtpA3+caJr08bIC+qOy/dICtgp4bxYrHY2l7GTTvCCtDL4DeSseecT1k2u12vS9WwmkMdIUa8S4t0lXDZV2uGZp0Ngm6QUWEWyDzgy7ar+ltKx6pYaIg2w/QbcaI+QK6yT1muoT0YdCE56J9ZMwWGD37DXQedFUeJoYN7fr7rn0YqwzXQa+oWiEchweXPmwN2WTVEisL9/A3Eo+KYWhvcg1LX0Efm3iYpmF9gQV5ekd5Vg5pLG7/GsWMylXlUJMW1ndXuB/WkMSsk1YTsEVIH0j+VfJ3hNWBLYBfg47SkDMS/c50bV3YLWC4CU4J34FOcBcENA+u1o9/O+YbniwN0PgGYB007TMRcIDG2dpzaf+hw636LKslpS6N730O0cSddWIhJbEWNSze/5MORBfSHOE8MA7DTTcpi47V9HRWAvEH9IEmL/0ksGWaluxRiNdt1WmagrbqJjIu7w6EtLEf+hXrsTGnaOzdoG6yWXSVqnfFnJDOwDUbY/u/HvjSSz7fCL3Y3Lokjf+XjsAROAJH4AgcgSNwBI7AEdjL/gowAOETPRiXcrNPAAAAAElFTkSuQmCC);
}

[data-ctrl-name="loading"] .text {
  display: block;
  color: #999;
  margin-left: 0.3rem;
}

[data-dpr="1"] [data-ctrl-name="loading"] div,
[data-dpr="1"] [data-ctrl-name="loading"] canvas {
  width: 30px;
  height: 30px;
}

[data-dpr="2"] [data-ctrl-name="loading"] div,
[data-dpr="2"] [data-ctrl-name="loading"] canvas {
  width: 60px;
  height: 60px;
}

[data-dpr="3"] [data-ctrl-name="loading"] div,
[data-dpr="3"] [data-ctrl-name="loading"] canvas {
  width: 90px;
  height: 90px;
}

[data-dpr="1"] [data-ctrl-name="loading"] .text {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}

[data-dpr="2"] [data-ctrl-name="loading"] .text {
  height: 60px;
  line-height: 60px;
  font-size: 24px;
}

[data-dpr="3"] [data-ctrl-name="loading"] .text {
  height: 90px;
  line-height: 90px;
  font-size: 36px;
}

[data-ctrl-name="scrollview"] {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-box;
  display: -moz-box;
  display: -webkit-flexbox;
  display: -ms-flexbox;
  display: -moz-flexbox;
  display: flexbox;
}

[data-ctrl-name="scrollview"][data-direction="vertical"] {
  -webkit-box-orient: vertical;
  -ms-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  -moz-flex-direction: column;
  flex-direction: column;
}

[data-ctrl-name="scrollview"][data-direction="horizontal"] {
  -webkit-box-orient: horizontal;
  -ms-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  -moz-flex-direction: row;
  flex-direction: row;
}

[data-ctrl-name="scrollview"] .scroll-wrap {
  display: block;
  -webkit-box-flex: 1;
  -ms-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: hidden;
  position: relative;
}

[data-ctrl-name="scrollview"][data-direction="vertical"] .scroll-wrap,
[data-ctrl-name="scrollview"][data-direction="vertical"] .scroll-content {
  width: 100%;
}

[data-ctrl-name="scrollview"][data-direction="horizontal"] .scroll-wrap,
[data-ctrl-name="scrollview"][data-direction="horizontal"] .scroll-content {
  height: 100%;
}

[data-ctrl-name="scrollview"] .scroll-content {
  position: absolute;
}

[data-ctrl-name="pageview"] {
  position: relative;
}

[data-ctrl-name="pageview"].fullscreen {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

[data-ctrl-name="pageview"]>.view {
  position: absolute;
}

[data-ctrl-name="pageview"].fullscreen>.view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

```
