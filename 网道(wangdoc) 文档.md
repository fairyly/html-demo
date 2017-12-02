# 网道(wangdoc) 技术文档

阮一峰 制作

* 阮一峰 github 技术文档源码地址: https://github.com/wangdoc
 - Web API 教程: https://github.com/wangdoc/webapi-tutorial
 - CSS 教程: https://github.com/wangdoc/css-tutorial
 - Node.js 教程: https://github.com/wangdoc/node-tutorial
 - Git 教程: https://github.com/wangdoc/git-tutorial
 - Bash 教程: https://github.com/wangdoc/bash-tutorial
 - HTML 语言教程: https://github.com/wangdoc/html-tutorial
 - react 教程: https://github.com/wangdoc/react-tutorial

* loppo (一个非常简单的 markdown 文件生成静态网站) 地址: https://github.com/ruanyf/loppo
  - 使用说明: 
  - npm install loppo -g
  - git clone https://github.com/ruanyf/loppo.git
  - cd loppo
  - loppo  // 生成目录,带 HTML 文件
  - 如果添加新文档需要配置 chapters.yml 中的 markdown 文件名,新加自己添加的 markdown 文件名
    需要在 docs 中新建 markdown 文件
  - 新建后运行 loppo 命令,重新生成 HTML 文件即可;
  - 配置 loppo.yml ,可参考阮一峰原有文档配置,如
  
    ```
      dir: docs
      output: dist
      site: Web API 教程
      theme: wangdoc
      customization: false
      themeDir: loppo-theme
      direction: ltr
    ```

  
