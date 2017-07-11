# 竖向swiper

```
<link rel="stylesheet" href="css/swiper-3.4.2.min.css">
.swiper-box {
    width: 85px;
    height:500px;
    overflow: hidden;
    padding: 30px 30px;
    margin-bottom: 19px;
    position: relative;
}
.swiper-container {
    position: static;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    z-index: 1;
}  
.swiper-slide {
    width: 85px;
    height: 85px;
    display: block;
}
.swiper-box .swiper-container .swiper-wrapper .swiper-slide .slide-img-box {
    width: 85px;
    height: 85px;
    background-color: #000;
}
.swiper-wrapper::-webkit-scrollbar{
    width: 0;
    height: 0;
}
.slide-img-box img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: .5;
}
.swiper-button-prev{
    left: 60px;
    top: -12px;
    cursor: pointer;
    display: block;
    color: #4c4c4c;
    height: 88px;
    width: 22px;
    line-height: 88px;
    text-align: center;
    position: absolute;
    background-size: 16px;
    transform: rotate(90deg);
}
.swiper-button-next{
    left: 60px;
    top: 524px;
    cursor: pointer;
    display: block;
    color: #4c4c4c;
    height: 88px;
    width: 22px;
    line-height: 88px;
    text-align: center;
    position: absolute;
    transform: rotate(90deg);
    background-size: 16px;
}

<div class="swiper-box">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic1.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic1.jpg" alt="demo"></div>
            </div>
             <div class="swiper-slide swiper-slide-next">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic2.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic2.jpg" alt="demo"></div>
            </div>
            <div class="swiper-slide">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic10.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic10.jpg" alt="demo"></div>
            </div>
            <div class="swiper-slide">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic12.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic12.jpg" alt="demo"></div>
            </div>
            <div class="swiper-slide">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic6.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic6.jpg" alt="demo"></div>
            </div>
            <div class="swiper-slide">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic10.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic10.jpg" alt="demo"></div>
            </div>
            <div class="swiper-slide">
                <div data-image="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic12.jpg" class="slide-img-box"><img src="https://bj-mc-prod-asset.oss-cn-beijing.aliyuncs.com/mc-official/images/demo/demo-pic12.jpg" alt="demo"></div>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        
        
        
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
<script src="js/swiper-3.4.2.min.js"></script>
<script>  
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            // loop: true,
            slidesPerView: 5,
            // 如果需要分页器
            // pagination: '.swiper-pagination',

            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        })         
</script>
```
