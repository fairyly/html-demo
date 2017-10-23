

```
  var checkchildren: function() {
    var that = this
    var t = 0
    if (that.data.babyInfo2 == undefined) {
       // 提示信息
      t = 0
      return 0
    }else{
      
      var body2 = babyInfo2
      
      body2.forEach(function(el,key){
        console.log(el)
        if( el.childrenGender == '' ){
          t = 0
          return 0
        } else {
          t = 1
        }
        if (!patbirth.test(el.childrenBirthday) ) {
        // 提示信息
          t = 0
          return 0
        } else {
          t = 1
        }
        if(el.childrenBirthday < 20000101 ) {
        // 提示信息
          t = 0
          return 0
        }else {
          t = 1
        }
        console.log(t)
      })
      return t
    }
    //调用函数，判断返回值
    if (that.data.iskids == true) {
      console.log(that.checkchildren())
      if(that.checkchildren() == 0) {//使用返回值判断，当条件不满足时候 return 可以中断 send() 方法执行
        console.log('宝宝验证不通过')
        return
      }
    }
    
    function send(){
    //
    }
    send()
```
