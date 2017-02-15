define(['zepto', 'doT','dropload', 'text!tpl/searchList.tpl'], function($,doT,dropload,searchListTpl){
        var listTpl=doT.template(searchListTpl);

    $('#searchList').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            $.ajax({
                type: 'GET',
                url: './json/searchList.json',
                dataType: 'json',
                success: function(data){
                    // 代码执行后必须重置

                    setTimeout(function(){
                        $("#list").prepend(listTpl(data));
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    // salert('Ajax error!');
                    me.resetload();
                }
            });
        }
    })
    //切换列表
    $(".order-by-way").on("tap",function(){
        if($(this).hasClass("selected")){
        if($(this).hasClass("up")){
            $(this).removeClass("up");
        }else{
            $(this).addClass("up");
        }
        }else{
        $(".order-by-way").removeClass("selected");
        $(this).addClass("selected");
        }
    })

    });