define(['jquery',
    'swiper'],
    function($, swiper){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            observer: true,
            observeParents: true
        });
       var wh=$(".container").css("height");

        var startX,//����ʱ������
            startY,
            x, //�����ľ���
            y,
            aboveY=0; //��һ��ȫ�ֱ�����¼��һ���ڲ��黬����λ��

        var inner=document.getElementById("inner");
        function touchSatrt(e){//����
            //e.preventDefault();
            var touch=e.touches[0];
            startY = touch.pageY; //�մ���ʱ������
        }

        function touchMove(e){//����
            //e.preventDefault();
            var touch = e.touches[0];
            y = touch.pageY - startY;//�����ľ���


        }

        function touchEnd(e){//��ָ�뿪��Ļ
            //e.preventDefault();
            //console.log(parseFloat(y)<-30)
            if(parseFloat(y)<-30&&$(".imgDetails").css("display")=="none") {
                if ($(document).scrollTop() >= parseFloat($(document).height()) - parseFloat($(window).height())) {
                    $('#main').delay(200).animate({top: "-" + wh}, {duration: 500, easing: "linear"});
                    setTimeout(function () {
                        $(".imgDetails").show();
                        console.log($(".container").css("height"))
                        $("#main").css("height", $(".imgDetails").css("height"));
                        window.scrollTo(0, 0);
                    }, 700)
                }
            }
            if(parseFloat(y)>30&&$(".imgDetails").css("display")=="block") {
                if ($(document).scrollTop() == 0) {
                    $('#main').delay(200).animate({top: 0}, {duration: 500, easing: "linear"});
                    setTimeout(function () {
                        $(".imgDetails").hide();
                        $("#main").css("height", $(".container").css("height"));
                        window.scrollTo(0, 0);
                    }, 700)

                }
            }

        }//
        document.getElementById("main").addEventListener('touchstart', touchSatrt,false);
        document.getElementById("main").addEventListener('touchmove', touchMove,false);
        document.getElementById("main").addEventListener('touchend', touchEnd,false);


    })