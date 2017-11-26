# URL api

### 方法
createObjectURL(blob : Blob) : String

revokeObjectURL(url : String) : undefined

URL.createObjectURL():  
返回一个DOMString ，包含一个唯一的blob链接（该链接协议为以blob:，后跟唯一标识浏览器中的对象的掩码）。

URL.revokeObjectURL():  
销毁之前使用URL.createObjectURL()方法创建的URL实例。

```
<!-- Creates a Worker using a local script instead of a remote url -->
<script id='code' type='text/plain'>
  postMessage('foo');
</script>
<script>
  var code = document.getElementById('code').textContent;
  var blob = new Blob([code], { type: 'application/javascript' });
  var url = URL.createObjectURL(blob);
  var worker = new Worker(url);
  URL.revokeObjectURL(url);

  worker.onmessage = function(e) {
    console.log('worker returned: ', e.data);
  };
</script>

```
