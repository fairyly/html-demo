/**
 * Created by Administrator on 2016/10/5.
 */
$(function(){
    function addBlogObj(title,href,content,month,day,read,comment){
        var obj={};
        obj.title=title;
        obj.href=href;
        obj.content=content;
        obj.month=fomatMonth(month);
        obj.day=day;
        obj.read=read;
        obj.comment=comment;
        return obj;
    }

    function fomatMonth(m){
        switch (m) {
            case '01':
                return "一月";
                break;
            case '02':
                return "二月";
                break;
            case '03':
                return "三月";
                break;
            case '04':
                return "四月";
                break;
            case '05':
                return "五月";
                break;
            case '06':
                return "六月";
                break;
            case '07':
                return "七月";
                break;
            case '08':
                return "八月";
                break;
            case '09':
                return "九月";
                break;
            case '10':
                return "十月";
                break;
            case '11':
                return "十一";
                break;
            case '12':
                return "十二";
                break;
        }
    }

    $.ajax
    ({
        type: "GET",
        dataType: "html",
        url: "proxy.php",
        success:function(data){
            var blog_array=[];
            var body=document.getElementById('body');
            var div=document.createElement("div");
            div.innerHTML=data;
            var title=div.querySelectorAll(".postTitle a"),
                content=div.querySelectorAll(".c_b_p_desc"),
                status=div.querySelectorAll(".postDesc");
            for(var i=0;i<6;i++){
                var title_arr=title[i].innerHTML,
                    href_arr=title[i].getAttribute('href'),
                    content_arr=content[i].innerText.substring(0,content[i].innerText.length-4),
                    month_arr=status[i].innerText.split(' ')[2].split('-')[1],
                    day_arr=status[i].innerText.split(' ')[2].split('-')[2],
                    read_arr=status[i].innerText.split(' ')[5].substring(3,status[i].innerText.split(' ')[5].length-1),
                    comment_arr=status[i].innerText.split(' ')[6].substring(3,status[i].innerText.split(' ')[6].length-1);

                blog_array.push(addBlogObj(title_arr,href_arr,content_arr,month_arr,day_arr,read_arr,comment_arr));
            }

            var pageTitle=document.querySelectorAll(".blog-text a"),
                pageContent=document.querySelectorAll(".blog-text p"),
                pageRead=document.querySelectorAll(".blog-para-read"),
                pageComent=document.querySelectorAll(".blog-para-comment"),
                pageMonth=document.querySelectorAll(".blog-pos-month"),
                pageDay=document.querySelectorAll(".blog-pos-day"),
                pageImg=document.querySelectorAll(".blog-img-link");


            for(var j=0;j<6;j++){
                pageTitle[j].innerText=blog_array[j].title;
                pageTitle[j].setAttribute("href",blog_array[j].href);
                pageMonth[j].innerText=blog_array[j].month;
                pageDay[j].innerText=blog_array[j].day;
                pageContent[j].innerText=blog_array[j].content;
                pageRead[j].innerText=blog_array[j].read+" 阅读";
                pageComent[j].innerText=blog_array[j].comment+" 评论";
                pageImg[j].setAttribute("href",blog_array[j].href);
            }


        },
        timeout:30000,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
});