var calUtil = {
  //当前日历显示的年份
  showYear:2016,
  //当前日历显示的月份
  showMonth:1,
  //当前日历显示的天数
  showDays:1,
  eventName:"load",
  //初始化日历
  init:function(signList){
    calUtil.setMonthAndDay();
    calUtil.draw(signList);
    calUtil.bindEnvent();
  },
  draw:function(signList){
    //绑定日历
    var str = calUtil.drawCal(calUtil.showYear,calUtil.showMonth,signList);
    $("#calendar").html(str);
    //绑定日历表头
    var calendarName=calUtil.showYear+"年"+calUtil.showMonth+"月";
    $(".calendar_month_span").html(calendarName);  
  },
  //绑定事件
  bindEnvent:function(){
    //绑定上个月事件
    $(".calendar_month_prev").click(function(){
      //ajax获取日历json数据
      // $(".yqd").show();
      // $(".today").css("color","#bebdbd");
      calUtil.eventName="prev";
      var signList=[];
      // calUtil.init(signList);
      var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
      var year=parseInt($(".calendar_month_span").html().split("年")[0]);
      console.log("year:"+year);
      var month=parseInt(nowMonth-1);
      console.log("month:"+month);
      if(month==0)
        {
            month=12;
            year-=1;
        }
        console.log("preyear:"+year);
        console.log("premonth:"+month);
       $.ajax({  
                type : "POST",  
                url : "/index.php/sign-getSignData.html",//{:U('sign/getSignData')}"
                data : {y:year,m:month},  
                // timeout : 60000,  
                success:function(data){ 
                    var now=new Date;
                    var year=now.getFullYear();
                    var month=now.getMonth()+1;
                    var day=now.getDate();
                    if(data) {
                      console.log(data); 
                      var signLists=eval(data);  
                      console.log(signLists[0]);
                      console.log(signLists[1]);
                      // console.log(signLists[1].length);
                      signL=signLists[1];
                      // console.log(signL);
                      calUtil.init(signL);
                      // if((signLists[1]!=null)&&(signLists[signLists.length-1].signDay==day)){
                      //       $(".yqd").show();
                      //       $(".today").css("color","#bebdbd");
                      // }else{
                      //         console.log("今日未签到！");
                      //         $(".yqd").hide();
                      //         $(".today").css("color","#04BE02");
                      //       }
                      if(signLists[0].status==1){
                          $(".yqd").show();
                          $(".today").css("color","#bebdbd");
                      }else{
                          console.log("今日未签到！");
                          $(".yqd").hide();
                          $(".today").css("color","#04BE02");
                      }
                    }else{
                      // calUtil.init(signList);
                      console.log("您本月没有签到");
                    }
                },
                error:function(){
                  console.log("ajax获取上月数据失败！");
                } 
              }); 
      
    });
    //绑定下个月事件
    $(".calendar_month_next").click(function(){
      //ajax获取日历json数据
      // $(".yqd").show();
      // $(".today").css("color","#bebdbd");
      var signList=[];
      calUtil.eventName="next";
      // calUtil.init(signList);
      var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
      var year=parseInt($(".calendar_month_span").html().split("年")[0]);
      console.log("year:"+year);
      var month=parseInt(nowMonth)+1;
      console.log("month:"+month);
      if(month==13)
        {
            month=1;
            year+=1;
        }
        console.log("nextyear:"+year);
        console.log("nextmonth:"+month);
       $.ajax({  
                type : "POST",  
                url : "/index.php/sign-getSignData.html",//{:U('sign/getSignData')}"
                data : {y:year,m:month},  
                // timeout : 60000,  
                success:function(data){ 
                    var now=new Date;
                    var year=now.getFullYear();
                    var month=now.getMonth()+1;
                    var day=now.getDate();
                    if(data) {
                      console.log(data); 
                      var signLists=eval(data);  
                      console.log(signLists[0]);
                      console.log(signLists[1]);
                      // console.log(signLists[1].length);
                      signL=signLists[1];
                      // console.log(signL);
                      calUtil.init(signL);
                      // if((signLists[1]!=null)&&(signLists[signLists.length-1].signDay==day)){
                      //       $(".yqd").show();
                      //       $(".today").css("color","#bebdbd");
                      // }else{
                      //         console.log("今日未签到！");
                      //         $(".yqd").hide();
                      //         $(".today").css("color","#04BE02");
                      //       }
                      if(signLists[0].status==1){
                          $(".yqd").show();
                          $(".today").css("color","#bebdbd");
                      }else{
                          console.log("今日未签到！");
                          $(".yqd").hide();
                          $(".today").css("color","#04BE02");
                      }
                    }else{
                      // calUtil.init(signList);
                      console.log("您本月没有签到");
                    }
                },
                error:function(){
                  console.log("ajax获取下月数据失败！");
                } 
              }); 
    });
  },
  //获取当前选择的年月
  setMonthAndDay:function(){
    switch(calUtil.eventName)
    {
      case "load":
        var current = new Date();
        calUtil.showYear=current.getFullYear();
        calUtil.showMonth=current.getMonth() + 1;
        break;
      case "prev":
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)-1;
        if(calUtil.showMonth==0)
        {
            calUtil.showMonth=12;
            calUtil.showYear-=1;
        }
        break;
      case "next":
        var nowMonth=$(".calendar_month_span").html().split("年")[1].split("月")[0];
        calUtil.showMonth=parseInt(nowMonth)+1;
        if(calUtil.showMonth==13)
        {
            calUtil.showMonth=1;
            calUtil.showYear+=1;
        }
        break;
    }
  },
  getDaysInmonth : function(iMonth, iYear){
   var dPrevDate = new Date(iYear, iMonth, 0);
   return dPrevDate.getDate();
  },
  bulidCal : function(iYear, iMonth) {
   var aMonth = new Array();
   aMonth[0] = new Array(7);
   aMonth[1] = new Array(7);
   aMonth[2] = new Array(7);
   aMonth[3] = new Array(7);
   aMonth[4] = new Array(7);
   aMonth[5] = new Array(7);
   aMonth[6] = new Array(7);
   var dCalDate = new Date(iYear, iMonth - 1, 1);
   var iDayOfFirst = dCalDate.getDay();
   var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
   var iVarDate = 1;
   var d, w;
   aMonth[0][0] = "日";
   aMonth[0][1] = "一";
   aMonth[0][2] = "二";
   aMonth[0][3] = "三";
   aMonth[0][4] = "四";
   aMonth[0][5] = "五";
   aMonth[0][6] = "六";
   for (d = iDayOfFirst; d < 7; d++) {
    aMonth[1][d] = iVarDate;
    iVarDate++;
   }
   for (w = 2; w < 7; w++) {
    for (d = 0; d < 7; d++) {
     if (iVarDate <= iDaysInMonth) {
      aMonth[w][d] = iVarDate;
      iVarDate++;
     }
    }
   }
   return aMonth;
  },
  ifHasSigned : function(signList,day){
   var signed = false;
   $.each(signList,function(index,item){
    if(item.signDay == day) {
     signed = true;
     return false;
    }
   });
   return signed ;
  },
  drawCal : function(iYear, iMonth ,signList) {
   var myMonth = calUtil.bulidCal(iYear, iMonth);
   var htmls = new Array();
   htmls.push("<div class='sign_main' id='sign_layer'>");
   htmls.push("<div class='sign_succ_calendar_title'>");
   htmls.push("<div class='calendar_month_next'>></div>");
   htmls.push("<div class='calendar_month_prev'><</div>");
   htmls.push("<div class='calendar_month_span'></div>");
   htmls.push("</div>");
   htmls.push("<div class='sign' id='sign_cal'>");
   htmls.push("<table>");
   htmls.push("<tr>");
   htmls.push("<th>" + myMonth[0][0] + "</th>");
   htmls.push("<th>" + myMonth[0][1] + "</th>");
   htmls.push("<th>" + myMonth[0][2] + "</th>");
   htmls.push("<th>" + myMonth[0][3] + "</th>");
   htmls.push("<th>" + myMonth[0][4] + "</th>");
   htmls.push("<th>" + myMonth[0][5] + "</th>");
   htmls.push("<th>" + myMonth[0][6] + "</th>");
   htmls.push("</tr>");
   var d, w;
   for (w = 1; w < 7; w++) {
    htmls.push("<tr>");
    for (d = 0; d < 7; d++) {
     var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
     console.log(ifHasSigned);
     if(ifHasSigned){
      htmls.push("<td class='on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
     } else {
      htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
     }
    }
    htmls.push("</tr>");
   }
   htmls.push("</table>");
   htmls.push("</div>");
   htmls.push("</div>");
   return htmls.join('');
  }
};