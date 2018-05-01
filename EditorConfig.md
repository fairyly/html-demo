### EditorConfig

```
EditorConfig 是一个保持缩进风格的一致的工具，当多人共同开发一个项目的时候，
往往会出现每个人用不同编辑器的情况，而且有的人用 tab 缩进，
有的人用 2 个空格缩进，有的人用 4 个空格缩进，
EditorConfig 就是为了解决这个问题而诞生。

EditorConfig 需要结合编辑器或 IDE 使用，如：

Sublime Text 需要装一个插件：EditorConfig
VS Code 需要装一个插件：EditorConfig for VS Code
在 myblog 目录下新建 .editorconfig 的文件，添加如下内容：

# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
tab_width = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
这里我们使用 2 个空格缩进，tab 长度也是 2 个空格。trim_trailing_whitespace 用来删除每一行最后多余的空格，
insert_final_newline 用来在代码最后插入一个空的换行。
```
