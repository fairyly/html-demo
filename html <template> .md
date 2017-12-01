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
