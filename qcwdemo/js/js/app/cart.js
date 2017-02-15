define(['zepto'],function($){
    //选中或取消选中店铺
   $("[data-role=shop-check]").on("tap",function(){
       var that=$(this);
       var thatPar= $(this).parents("[data-role=cart-shop]");
       if(!that.hasClass("checked"))
       {   that.addClass("checked");
           thatPar.find("[data-role=goods-name]").attr("checked","true");
           thatPar.find(".cart-shop-goods").addClass("checked")
       }else{
           that.removeClass("checked");
           thatPar.find("[data-role=goods-name]").removeAttr("checked");
           thatPar.find(".cart-shop-goods").removeClass("checked")
       };
       isAllCheck();
       allPrice();
   })
    //选中或取消单个商品
    $("[data-role=goods-check]").on("tap",function(){
        var cartShop=$(this).parents(".cart-shop-goods");
        var that=$(this);
        var thatPar= $(this).parents("[data-role=cart-shop]");
        if(!cartShop.hasClass("checked"))
        {
            cartShop.addClass("checked")
        }else{
            cartShop.removeClass("checked")
        };
        if(thatPar.find("[data-role=goods-check]").length==thatPar.find(".cart-shop-goods.checked").length){
            thatPar.find("[data-role=shop-check]").addClass("checked");
            thatPar.find("[name=shop_name]").attr("checked","true");
        }else{
            thatPar.find("[data-role=shop-check]").removeClass("checked");
            thatPar.find("[name=shop_name]").removeAttr("checked");
        }
        isAllCheck();
        allPrice();
    })
    //全选
    $("[data-role=checkAll]").on("tap",function(){
        if(!$(this).hasClass("checked")){
            $(this).addClass("checked");
            $(".cart-shop-goods").addClass("checked");
            $("[data-role=shop-check]").addClass("checked");
            $("[data-role=goods-name]").attr("checked","true");
            $("[name=shop_name]").attr("checked","true");
        }else{
            $(this).removeClass("checked");
            $(".cart-shop-goods").removeClass("checked");
            $("[data-role=shop-check]").removeClass("checked");
            $("[data-role=goods-name]").removeAttr("checked");
            $("[name=shop_name]").removeAttr("checked");
        }
        allPrice();
    })
    //是否选中全部
    function isAllCheck(){
        if($(".cart-shop-goods.checked").length==$(".cart-shop-goods").length){
            $("[data-role=checkAll]").addClass("checked");
            $("[data-role=checkAll] input").attr("checked","true");
        }else{
            $("[data-role=checkAll]").removeClass("checked");
            $("[data-role=checkAll] input").removeAttr("checked");
        }
    }
    //计算价格
    function allPrice(){
        var allPrice=0;
        $(".cart-shop-goods.checked").each(function(){
            allPrice=allPrice+parseInt($(this).find(".num").html())*parseFloat($(this).find(".price").html())
        })
        $("#finaPrice").html(allPrice.toFixed(2));
    }
});