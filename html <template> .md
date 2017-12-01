# template 

MDN: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template

属性  

此元素仅包含全局属性。

除此以外，还包含只读的 content 属性，通过它可以读取模板内容。一般来说，可以通过判断 content 属性是否存在来判断浏览器是否支持 <template> 元素。

Demo:
```
<table id="producttable">
  <thead>
    <tr>
      <td>UPC_Code</td>
      <td>Product_Name</td>
    </tr>
  </thead>
  <tbody>
    <!-- 现有数据可以可选地包括在这里 -->
  </tbody>
</table>

<template id="productrow">
  <tr>
    <td class="record"></td>
    <td></td>
  </tr>
</template>

// 通过检查来测试浏览器是否支持HTML模板元素 
// 用于保存模板元素的内容属性。
if ('content' in document.createElement('template')) {

  // 使用现有的HTML tbody实例化表和该行与模板
  let t = document.querySelector('#productrow'),
  td = t.content.querySelectorAll("td");
  td[0].textContent = "1235646565";
  td[1].textContent = "Stuff";

  // 克隆新行并将其插入表中
  let tb = document.getElementsByTagName("tbody");
  let clone = document.importNode(t.content, true);
  tb[0].appendChild(clone);
  
  // 创建一个新行
  td[0].textContent = "0384928528";
  td[1].textContent = "Acme Kidney Beans";

  // 克隆新行并将其插入表中
  let clone2 = document.importNode(t.content, true);
  tb[0].appendChild(clone2);

} else {
  // 找到另一种方法来添加行到表，因为不支持HTML模板元素。
}
```

# handlebars 模板使用

原理: 先获取对用模板 id html 内容,
      编译模板的 HTML 内容,
      向编译后的模板中添加数据,
      再把整个编译后带数据的内容加入某个容器中,渲染在页面
```
<script src="js/handlebars-v4.0.11.js"></script>
<script id="tpl" type="text/x-handlebars-template">  
      <div class="demo">  
          <h1>{{title}}</h1>
          <p>{{content}}</p>
      </div>
    </script>
    <script>
      //用jquery获取模板
      var tpl   =  $("#tpl").html();
      // //原生方法
      // var source = document.getElementById('#tpl').innerHTML;
      //预编译模板
      var template = Handlebars.compile(tpl);
      //模拟json数据
      var context = { title: "zhaoshuai", content: "learn Handlebars"};
      //匹配json内容
      var html = template(context);
      //输入模板
      $('.demos').html(html);
    </script>
```
