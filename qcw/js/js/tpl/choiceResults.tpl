<li class="hd">
        <span class="title">售价</span>
        <span class="pull-right price">
                            <img src="images/icon/discount.png" class="item discount-icon" alt="">
                            <span class="item ori-price">￥{{=it.price}}</span>
                            <span class="item discount-price">
                               <strong>￥{{=it.price*0.7}}</strong>
                               <strong id="completedMoney"></strong>
                            </span>
        </span>
</li>
<li>
         <span class="title">完成尺寸</span>
          <span class="pull-right size" id="completedSize">{{=it.size}}cm</span>
</li>
<li>
          <span class="title">我的产品</span>
          <a href="#" class="pull-right check-detail">材料明细</a>
</li>