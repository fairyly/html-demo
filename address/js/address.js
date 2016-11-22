$(function(){
    //点击关闭地址
    $("[data-role=return-choice]").on("click",function(){
       closeAddress();
    });
    //联动
    $("#city").citySelect({oInput:$("[data-role=choose-area]"),nodata:"none",required:false,url:"./js/city.min.js"});
    //返回市，或省
    $(".return_nex").on("click",function(){
        if($("[data-role=dist]").css("display")=="block"){
            $("[data-role=prov]").hide();
            $("[data-role=city]").show();
            $("[data-role=dist]").hide();
        }
        else if($("[data-role=city]").css("display")=="block"){
            $("[data-role=prov]").show();
            $("[data-role=city]").hide();
            $("[data-role=dist]").hide();
        }
       else if($("[data-role=prov]").css("display")=="block"){
           closeAddress();
        }
    });
    //显示地址
    $("[data-role=choose-area]").on("focus",function(){
        $("[data-role=prov]").show();
        $("[data-role=usercity]").addClass("animal");

    })
    //关闭地址
    function closeAddress(){
        $("[data-role=usercity]").removeClass("animal");
    }
})