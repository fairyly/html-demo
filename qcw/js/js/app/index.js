$(function(){
    var oli=$("#tabUl li");//ÇÐ»»
    $("#tabUl li").on("click",function(){
        var that=$(this);
        $("#tabUl li").removeClass("active");
        that.addClass("active");
        $(".contentTab").removeClass("active");
        $(".contentTab").eq(that.index()).addClass("active");
     })
 })
