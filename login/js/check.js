$(function() {
	var isLoginShow = true; //登陆表单是否显示
	var isRegisShow = false; //注册表单是否显示
	$("#login").click(function(){
		if(isRegisShow){
			$('.regis').hide();
			isRegisShow = false;
		}

		if(!isLoginShow){
			$(".login").fadeIn(500);
			isLoginShow = true;
			$(".regis-error-tips1,.regis-error-tips2").hide();
			$("header>h3").text("用户登陆");
			$("title").text("用户登录-Coding.net");
			$("#border-span-1").css("backgroundColor","#B1B0B0");
			$("#border-span-2").css("backgroundColor","#B1B0B0");
			$("#regis-yx").val("电子邮箱").css("color","#A9A9A9");
			$("#regis-gx").val("个性后缀(用户名)").css("color","#A9A9A9");
			$(".pre-text").css("color","#000");
		}
	});
	$("#regis").click(function(){
		if(isLoginShow){
			$(".login").hide();
			isLoginShow = false;
		}

		if(!isRegisShow){
			$(".regis").fadeIn(500);
			isRegisShow = true;
			setTimeout(hideTips,0);
			$("header>h3").text("用户注册");
			$("title").text("用户注册-Coding.net");
		}
	});

	// 隐藏提示
	function hideTips(){
		$(".login-error-tips").hide();
	}

	var checkEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	/*登陆表单检验*/
	$("#login-form").submit(function(){
		//alert(checkEmail.test($("#login-form input[type='text']").val()));
		if($("#login-form input[type='text']").val().length === 0){
			$(".login-error-tips").css({
				top:"90px",
				left:"240px"
			}).show().children('.error-text').text('请填写此字段');
			$("#login-form input[type='text']").focus();
			setTimeout(hideTips,2000);
			return false;
		}
		if(!checkEmail.test($("#login-form input[type='text']").val())){
			$(".login-error-tips").css({
				top:"90px",
				left:"240px"
			}).show().children('.error-text').text('邮件格式不正确');
			$("#login-form input[type='text']").focus();
			setTimeout(hideTips,2000);
			return false;
		}
		if($("#login-form input[type='password']").val().length === 0){
			$(".login-error-tips").css({
				top:"158px",
				left:"240px"
			}).show().children('.error-text').text('请填写此字段');
			$("#login-form input[type='password']").focus();
			setTimeout(hideTips,2000);
			return false;
		}
		alert("登陆成功");
	});

	/*注册表单检验*/
	var isOk = false;
	$("#regis-yx").blur(function(){
		if($(this).val().length === 0 || !checkEmail.test($(this).val())){
			$(this).css("color","#D95C5C");
			$("#border-span-1").css("backgroundColor","#D95C5C");
			$(".regis-error-tips1").show().children(".error-text1").text("邮件格式错误");
			isOk = false;
			//return false;
		}else{
			isOk = true;
		}
	});
	$("#regis-gx").blur(function(){
		//alert($(this).val().length);
		if($(this).val().length < 3){
			$(this).css("color","#D95C5C");
			$(".pre-text").css("color","#D95C5C");
			$("#border-span-2").css("backgroundColor","#D95C5C");
			$(".regis-error-tips2").show().children(".error-text2").text("个性域名至少为3位字符").show();
			isOk = false;
		}else{
			isOk = true;
		}
	});
	$("#regis-form").submit(function(){
		if(!isOk){
			return false;
		}
		alert("注册成功");
	});
})