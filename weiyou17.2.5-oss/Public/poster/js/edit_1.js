$(function(){

 // //canvas结束
 //      // $("#upfile").change(function(){
 //      //         var objUrl = getObjectURL(this.files[0]) ;
 //      //                  var file = document.getElementById("upfile").files;
 //      //             console.log(file);
 //      //             console.log(file[0].size);
 //      //             console.log(file[0].type);
 //      //             console.log(file[0].name);
 //      //           console.log("objUrl = "+objUrl) ;
 //      //         if (objUrl) {
 //      //           $(".m1 img").attr("src", objUrl) ;
 //      //         }
 //      // });
 //      // $("#upfile2").change(function(){
 //      //   var objUrl = getObjectURL(this.files[0]) ;
 //      //            var file = document.getElementById("upfile2").files;
 //      //       console.log(file);
 //      //       console.log(file[0].size);
 //      //       console.log(file[0].type);
 //      //       console.log(file[0].name);
 //      //     console.log("objUrl = "+objUrl) ;
 //      //   if (objUrl) {
 //      //     $(".m2 img").attr("src", objUrl) ;
 //      //   }
 //      // });   
 //      //    //建立一个可存取到该file的url
 //      // function getObjectURL(file) {
 //      //     var url = null ; 

 //      //     if (window.createObjectURL!=undefined) { // basic
 //      //       url = window.createObjectURL(file) ;
 //      //     } else if (window.URL!=undefined) { // mozilla(firefox)
 //      //       url = window.URL.createObjectURL(file) ;
 //      //     } else if (window.webkitURL!=undefined) { // webkit or chrome
 //      //       url = window.webkitURL.createObjectURL(file) ;
 //      //     }
 //      //     return url ;
 //      //   }
 //      // $(".shengcheng").click(function(){
                
 //      //           $(".shengcheng").hide();
 //      //           // $(".edit1").show();
 //      //           $(".up1").hide();
 //      //           $(".up2").hide();
 //      //           $(".header").hide();
 //      //           $("body").css("background","none");
 //      //           html2canvas($(".edit1"), {
 //      //                   allowTaint: true,
 //      //                   taintTest: false,
 //      //                   onrendered: function(canvas) {
 //      //                       //生成base64图片数据
 //      //                       $(".header").show();
 //      //                       $(".baocun").show();
 //      //                       var dataUrl = canvas.toDataURL("image/jpeg");
 //      //                       // console.log(dataUrl);
 //      //                       $.ajax({  
 //      //                         type : "POST",  
 //      //                         url : 'poster-create.html',  
 //      //                         data : {data:dataUrl},  
 //      //                         timeout : 60000,  
 //      //                         success : function(data){  
 //      //                             console.log(data);
 //      //                             var src=data;
 //      //                             // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //      //                               $(".baocunimg img").attr("src",src) ;
 //      //                           },
 //      //                           error:function(){
 //      //                             console.log(error);
 //      //                           } 
 //      //                       });  
 //      //                       // $(".baocunimg img").attr("src",dataUrl) ;
 //      //                       $(".edit1").hide();
 //      //                   }
 //      //           });
 //      //   });
 //    		//生成第一个页面结束
 //   // });
 //    //第一页结束
 //     		$("#upfile3").change(function(){
 //  				var objUrl = getObjectURL(this.files[0]) ;
 //  	      var file = document.getElementById("upfile3").files;
 //  				    // console.log(file);
 //  				    // console.log(file[0].size);
 //  				    // console.log(file[0].type);
 //  				    // console.log(file[0].name);
 //  					// console.log("objUrl = "+objUrl) ;
 //  				if (objUrl) {
 //  					$(".mm2 img").attr("src", objUrl) ;
 //  				}
 //  			});
 //     		$("#upfile4").change(function(){
 //  				var objUrl = getObjectURL(this.files[0]) ;
 //       //        var file = document.getElementById("upfile4").files;
 //  				 //    console.log(file);
 //  				 //    console.log(file[0].size);
 //  				 //    console.log(file[0].type);
 //  				 //    console.log(file[0].name);
 //  					// console.log("objUrl = "+objUrl) ;
 //  				if (objUrl) {
 //  					$(".mm22 img").attr("src", objUrl) ;
 //  				}
 //  			});
 //     		 //建立一个可存取到该file的url
	// 		function getObjectURL(file) {
	// 			var url = null ; 

	// 			if (window.createObjectURL!=undefined) { // basic
	// 				url = window.createObjectURL(file) ;
	// 			} else if (window.URL!=undefined) { // mozilla(firefox)
	// 				url = window.URL.createObjectURL(file) ;
	// 			} else if (window.webkitURL!=undefined) { // webkit or chrome
	// 				url = window.webkitURL.createObjectURL(file) ;
	// 			}
	// 			return url ;
	// 		}
	// 		$(".shengcheng2").click(function(){    
 //                $(".shengcheng2").hide();
 //                // $(".edit2").show();
 //                $(".up3").hide();
 //                $(".up4").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                html2canvas($(".edit2"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                            $.ajax({  
 //  	                            type : "POST",  
 //  	                            url : "{:U('poster/create')}",  
 //  	                            data : {data:dataUrl},  
 //  	                            // timeout : 60000,  
 //  	                            success : function(data){  
 //  	                                // console.log(data);
 //  	                                // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //  	                                $(".baocunimg img").attr("src",data) ;

 //  	                            }  
 //  	                        });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit2").hide();
 //                        }
 //                });

 //    		});
 //    		//生成第二个页面结束
 //    // });
 //    //第二页结束
    
 //     		 $("#upfile5").change(function(){
	// 			var objUrl = getObjectURL(this.files[0]) ;
	//                var file = document.getElementById("upfile5").files;
	// 			    console.log(file);
	// 			    console.log(file[0].size);
	// 			    console.log(file[0].type);
	// 			    console.log(file[0].name);
	// 				console.log("objUrl = "+objUrl) ;
	// 			if (objUrl) {
	// 				$(".m3 img").attr("src", objUrl) ;
	// 				// $(".indexone").hide();
	// 				// $(".xianshi").show();
	// 				// $(".up5").hide();
	// 			}
	// 		});
 //     		 $("#upfile6").change(function(){
	// 			var objUrl = getObjectURL(this.files[0]) ;
	//                var file = document.getElementById("upfile6").files;
	// 			    console.log(file);
	// 			    console.log(file[0].size);
	// 			    console.log(file[0].type);
	// 			    console.log(file[0].name);
	// 				console.log("objUrl = "+objUrl) ;
	// 			if (objUrl) {
	// 				$(".con33 img").attr("src", objUrl) ;
	// 				// $(".indexone").hide();
	// 				// $(".xianshi").show();
	// 				// $(".up6").hide();
	// 			}
	// 		});
 //     		 //建立一个可存取到该file的url
	// 		function getObjectURL(file) {
	// 			var url = null ; 

	// 			if (window.createObjectURL!=undefined) { // basic
	// 				url = window.createObjectURL(file) ;
	// 			} else if (window.URL!=undefined) { // mozilla(firefox)
	// 				url = window.URL.createObjectURL(file) ;
	// 			} else if (window.webkitURL!=undefined) { // webkit or chrome
	// 				url = window.webkitURL.createObjectURL(file) ;
	// 			}
	// 			return url ;
	// 		}
	// 		$(".shengcheng3").click(function(){
                
 //                $(".shengcheng3").hide();
 //                // $(".edit3").show();
 //                $(".up5").hide();
 //                $(".up6").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                html2canvas($(".edit3"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
	//                             type : "POST",  
	//                             url : "{:U('poster/create')}",  
	//                             data : {data:dataUrl},  
	//                             // timeout : 60000,  
	//                             success : function(data){  
	//                                 // console.log(data);
	//                                 // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
	//                                 $(".baocunimg img").attr("src",data) ;
	//                             }  
	//                         });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit3").hide();
 //                        }
 //                });
 //    		});
 //    		//生成第三个页面结束
 //    // });
 //    //第三页结束
 //    $("#edit4_upfile7").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit4_upfile7").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit4_m3 img").attr("src", objUrl) ;
           
 //          }
 //        });
        
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng4").click(function(){
                
 //                $(".shengcheng4").hide();
 //                // $(".edit3").show();
 //                $(".edit4_up7").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit4_con").css("background","url(../images/dwbg.jpg)");
 //                $(".edit4_con").css("background-size","100%");
 //                html2canvas($(".edit4_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            // canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");

 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit4").hide();
 //                        }
 //                });
 //        });
 //    // 第四个页面结束
 //    $("#edit5_upfile8").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit5_upfile8").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit5_m3 img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
        
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng5").click(function(){
                
 //                $(".shengcheng5").hide();
 //                // $(".edit3").show();
 //                $(".edit5_up8").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit5_con").css("background","url(../images/dwbg2.jpg)");
 //                $(".edit5_con").css("background-size","100% 100%");
 //                html2canvas($(".edit5_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit5").hide();
 //                        }
 //                });
 //        });
 //    //第五个页面结束
 //    $("#edit6_upfile9").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit6_upfile9").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit6_m3 img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
        
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng6").click(function(){
                
 //                $(".shengcheng6").hide();
 //                // $(".edit3").show();
 //                $(".edit6_up9").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit6_con").css("background","url(../images/dwbg3.jpg)");
 //                $(".edit6_con").css("background-size","100% 100%");
 //                html2canvas($(".edit6_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit6").hide();
 //                        }
 //                });
 //        });
 //    //第六个页面结束
 //     $("#edit7_upfile10").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //                 var file = document.getElementById("edit7_upfile10").files;
 //            console.log(file);
 //            console.log(file[0].size);
 //            console.log(file[0].type);
 //            console.log(file[0].name);
 //          console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit7_m3 img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
        
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng7").click(function(){
                
 //                $(".shengcheng7").hide();
 //                // $(".edit3").show();
 //                $(".edit7_up10").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit7_con").css("background","url(../images/dwbg4.jpg)");
 //                $(".edit7_con").css("background-size","100% 100%");
 //                html2canvas($(".edit7_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit7").hide();
 //                        }
 //                });
 //        });
 //    //第七个页面结束
 //    $("#edit8_upfile8").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit8_upfile8").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit8_m3 img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
        
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng8").click(function(){
                
 //                $(".shengcheng8").hide();
 //                // $(".edit3").show();
 //                $(".edit8_up8").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit8_con4").css("background","url(../images/cxdiv.jpg)");
 //                $(".edit8_con4").css("background-size","100%");
 //                html2canvas($(".edit8_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit8").hide();
 //                        }
 //                });
 //        });
 //    // 第八个页面结束
 //     $("#edit9_upfile").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit9_upfile").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit9_con1pic img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
        
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng9").click(function(){
                
 //                $(".shengcheng10").hide();
 //                // $(".edit3").show();
 //                $(".edit9_up1").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit9_con").css("background","url(../images/cxbg1.jpg)");
 //                $(".edit9_con").css("background-size","100% 100%");
 //                $(".edit9_con1bg").css("background","url(../images/cxupbg.png)");
 //                $(".edit9_con1bg").css("background-size","100%");
 //                html2canvas($(".edit9_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit9").hide();
 //                        }
 //                });
 //        });
 //    //第九个页面结束
 //    $("#edit10_upfile").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit10_upfile").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit10_con5pic img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
 //        $("#edit10_upfile2").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit10_upfile2").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit10_con2pic img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng10").click(function(){
                
 //                $(".shengcheng10").hide();
 //                // $(".edit3").show();
 //                $(".edit10_up1").hide();
 //                $(".edit10_up2").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit10_con1").css("background","url(../images/mpbg1.png)");
 //                $(".edit10_con1").css("background-size","100% 100%");
 //                html2canvas($(".edit10_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        width: $("body").outerHeight() + 500,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit10").hide();
 //                        }
 //                });
 //        });
 //    // 第十个页面结束
 //    $("#edit11_upfile").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit11_upfile").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit11_con1pic img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
 //        $("#edit11_upfile2").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit11_upfile2").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit11_con21pic img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
 //         $("#edit11_upfile3").change(function(){
 //        var objUrl = getObjectURL(this.files[0]) ;
 //            // var file = document.getElementById("edit11_upfile3").files;
 //            // console.log(file);
 //            // console.log(file[0].size);
 //            // console.log(file[0].type);
 //            // console.log(file[0].name);
 //            // console.log("objUrl = "+objUrl) ;
 //        if (objUrl) {
 //          $(".edit11_con22pic img").attr("src", objUrl) ;
 //          // $(".indexone").hide();
 //          // $(".xianshi").show();
 //          // $(".up5").hide();
 //        }
 //      });
 //         //建立一个可存取到该file的url
 //      function getObjectURL(file) {
 //        var url = null ; 

 //        if (window.createObjectURL!=undefined) { // basic
 //          url = window.createObjectURL(file) ;
 //        } else if (window.URL!=undefined) { // mozilla(firefox)
 //          url = window.URL.createObjectURL(file) ;
 //        } else if (window.webkitURL!=undefined) { // webkit or chrome
 //          url = window.webkitURL.createObjectURL(file) ;
 //        }
 //        return url ;
 //      }
 //      $(".shengcheng11").click(function(){
                
 //                $(".shengcheng11").hide();
 //                // $(".edit3").show();
 //                $(".edit11_up1").hide();
 //                $(".edit11_up2").hide();
 //                $(".edit11_up3").hide();
 //                $(".header").hide();
 //                $("body").css("background","none");
 //                $(".edit11_con2").css("background","url(../images/mpbg12.png)");
 //                $(".edit11_con2").css("background-size","100%");
 //                html2canvas($(".edit11_con"), {
 //                        allowTaint: true,
 //                        taintTest: false,
 //                        width: $("body").outerHeight() + 500,
 //                        onrendered: function(canvas) {
 //                            canvas.id = "mycanvas";
 //                            //document.body.appendChild(canvas);
 //                            //生成base64图片数据
 //                            $(".header").show();
 //                            $(".baocun").show();
 //                            var dataUrl = canvas.toDataURL("image/png");
 //                             $.ajax({  
 //                              type : "POST",  
 //                              url : "{:U('poster/create')}",  
 //                              data : {data:dataUrl},  
 //                              // timeout : 60000,  
 //                              success : function(data){  
 //                                  // console.log(data);
 //                                  // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
 //                                  $(".baocunimg img").attr("src",data) ;
 //                              }  
 //                          });  
 //                            // $(".baocunimg img").attr("src",dataUrl) ;
 //                            $(".edit11").hide();
 //                        }
 //                });
 //        });
 //    //第十一个页面结束
    // $("#edit12_upfile").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit12_con1pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //     $("#edit12_upfile2").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile2").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit12_con2pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //      //建立一个可存取到该file的url
    //   function getObjectURL(file) {
    //     var url = null ; 

    //     if (window.createObjectURL!=undefined) { // basic
    //       url = window.createObjectURL(file) ;
    //     } else if (window.URL!=undefined) { // mozilla(firefox)
    //       url = window.URL.createObjectURL(file) ;
    //     } else if (window.webkitURL!=undefined) { // webkit or chrome
    //       url = window.webkitURL.createObjectURL(file) ;
    //     }
    //     return url ;
    //   }
    //   $(".shengcheng12").click(function(){
                
    //             $(".shengcheng12").hide();
    //             // $(".edit3").show();
    //             $(".edit12_up1").hide();
    //             $(".edit12_up2").hide();
    //             $(".header").hide();
    //             $("body").css("background","none");
                
    //             html2canvas($(".edit12_con"), {
    //                     allowTaint: true,
    //                     taintTest: false,
    //                     // width: 720,
    //                     // height:1280,
    //                     // canvas: canvas,
    //                     onrendered: function(canvas) {
    //                         canvas.id = "mycanvas";
    //                         //document.body.appendChild(canvas);
    //                         //生成base64图片数据
    //                         $(".header").show();
    //                         $(".baocun").show();
    //                         var dataUrl = canvas.toDataURL("image/png");
    //                          $.ajax({  
    //                           type : "POST",  
    //                           url : "{:U('poster/create')}",  
    //                           data : {data:dataUrl},  
    //                           // timeout : 60000,  
    //                           success : function(data){  
    //                               // console.log(data);
    //                               // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
    //                               $(".baocunimg img").attr("src",data) ;
    //                           }  
    //                         });  
    //                         // $(".baocunimg img").attr("src",dataUrl) ;
    //                         $(".edit12").hide();
    //                     }
    //             });
    //     });
    // //第十二个页面结束
    //  $(".edit13_con1").css("background","url(../images/m6up1.jpg)");
    //   $(".edit13_con1").css("background-size","100% 100%");
    //   $(".edit13_con1").css("background","url(../images/m6up1.jpg)");
    //   $(".edit13_con1").css("background-size","100% 100%");
    //  $("#edit13_upfile").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit13_con1").css("background-image", "url("+objUrl+")") ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //     $("#edit13_upfile2").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile2").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit13_con21pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //      //建立一个可存取到该file的url
    //   function getObjectURL(file) {
    //     var url = null ; 

    //     if (window.createObjectURL!=undefined) { // basic
    //       url = window.createObjectURL(file) ;
    //     } else if (window.URL!=undefined) { // mozilla(firefox)
    //       url = window.URL.createObjectURL(file) ;
    //     } else if (window.webkitURL!=undefined) { // webkit or chrome
    //       url = window.webkitURL.createObjectURL(file) ;
    //     }
    //     return url ;
    //   }
      
    //   $(".shengcheng13").click(function(){
                
    //             $(".shengcheng13").hide();
    //             // $(".edit3").show();
    //             $(".edit13_up1").hide();
    //             $(".edit13_up2").hide();
    //             $(".header").hide();
    //             $("body").css("background","none");
    //             $(".edit13_con").css("background","url(../images/m6bg.jpg)");
    //             $(".edit13_con").css("background-size","100% 100%");
    //             html2canvas($(".edit13_con"), {
    //                     allowTaint: true,
    //                     taintTest: false,
    //                     // width: 720,
    //                     // height:1280,
    //                     // canvas: canvas,
    //                     onrendered: function(canvas) {
    //                         canvas.id = "mycanvas";
    //                         //document.body.appendChild(canvas);
    //                         //生成base64图片数据
    //                         $(".header").show();
    //                         $(".baocun").show();
    //                         var dataUrl = canvas.toDataURL("image/png");
    //                          $.ajax({  
    //                           type : "POST",  
    //                           url : "{:U('poster/create')}",  
    //                           data : {data:dataUrl},  
    //                           // timeout : 60000,  
    //                           success : function(data){  
    //                               // console.log(data);
    //                               // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
    //                               $(".baocunimg img").attr("src",data) ;
    //                           }  
    //                         });  
    //                         // $(".baocunimg img").attr("src",dataUrl) ;
    //                         $(".edit13").hide();
    //                     }
    //             });
    //     });
    // //第十三个页面结束
    //  $("#edit14_upfile").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit14_con1pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //     $("#edit14_upfile2").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile2").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit14_con22pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //      //建立一个可存取到该file的url
    //   function getObjectURL(file) {
    //     var url = null ; 

    //     if (window.createObjectURL!=undefined) { // basic
    //       url = window.createObjectURL(file) ;
    //     } else if (window.URL!=undefined) { // mozilla(firefox)
    //       url = window.URL.createObjectURL(file) ;
    //     } else if (window.webkitURL!=undefined) { // webkit or chrome
    //       url = window.webkitURL.createObjectURL(file) ;
    //     }
    //     return url ;
    //   }
    //   $(".shengcheng14").click(function(){
                
    //             $(".shengcheng14").hide();
    //             // $(".edit3").show();
    //             $(".edit14_up1").hide();
    //             $(".edit14_up2").hide();
    //             $(".header").hide();
    //             $("body").css("background","none");
                
    //             html2canvas($(".edit14_con"), {
    //                     allowTaint: true,
    //                     taintTest: false,
    //                     // width: 720,
    //                     // height:1280,
    //                     // canvas: canvas,
    //                     onrendered: function(canvas) {
    //                         canvas.id = "mycanvas";
    //                         //document.body.appendChild(canvas);
    //                         //生成base64图片数据
    //                         $(".header").show();
    //                         $(".baocun").show();
    //                         var dataUrl = canvas.toDataURL("image/png");
    //                          $.ajax({  
    //                           type : "POST",  
    //                           url : "{:U('poster/create')}",  
    //                           data : {data:dataUrl},  
    //                           // timeout : 60000,  
    //                           success : function(data){  
    //                               // console.log(data);
    //                               // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
    //                               $(".baocunimg img").attr("src",data) ;
    //                           }  
    //                         });  
    //                         // $(".baocunimg img").attr("src",dataUrl) ;
    //                         $(".edit14").hide();
    //                     }
    //             });
    //     });
    // //第十四个页面结束
    // $("#edit15_upfile").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit15_con21pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //     $("#edit15_upfile2").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile2").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit15_con33pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //      //建立一个可存取到该file的url
    //   function getObjectURL(file) {
    //     var url = null ; 

    //     if (window.createObjectURL!=undefined) { // basic
    //       url = window.createObjectURL(file) ;
    //     } else if (window.URL!=undefined) { // mozilla(firefox)
    //       url = window.URL.createObjectURL(file) ;
    //     } else if (window.webkitURL!=undefined) { // webkit or chrome
    //       url = window.webkitURL.createObjectURL(file) ;
    //     }
    //     return url ;
    //   }
    //   $(".shengcheng15").click(function(){
                
    //             $(".shengcheng15").hide();
    //             // $(".edit3").show();
    //             $(".edit15_up1").hide();
    //             $(".edit15_up2").hide();
    //             $(".header").hide();
    //             $("body").css("background","none");
    //             $(".edit15_con1").css("background","url(../images/m8bg1.png)");
    //             $(".edit15_con1").css("background-size","100% 100%");
    //             $(".edit15_con3").css("background","url(../images/m8bg2.png)");
    //             $(".edit15_con3").css("background-size","100% 100%");
    //             html2canvas($(".edit15_con"), {
    //                     allowTaint: true,
    //                     taintTest: false,
    //                     // width: 720,
    //                     // height:1280,
    //                     // canvas: canvas,
    //                     onrendered: function(canvas) {
    //                         canvas.id = "mycanvas";
    //                         //document.body.appendChild(canvas);
    //                         //生成base64图片数据
    //                         $(".header").show();
    //                         $(".baocun").show();
    //                         var dataUrl = canvas.toDataURL("image/png");
    //                          $.ajax({  
    //                           type : "POST",  
    //                           url : "{:U('poster/create')}",  
    //                           data : {data:dataUrl},  
    //                           // timeout : 60000,  
    //                           success : function(data){  
    //                               // console.log(data);
    //                               // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
    //                               $(".baocunimg img").attr("src",data) ;
    //                           }  
    //                         });  
    //                         // $(".baocunimg img").attr("src",dataUrl) ;
    //                         $(".edit15").hide();
    //                     }
    //             });
    //     });
    // //第十五个页面结束
    // $("#edit16_upfile").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit16_con21pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //     $("#edit16_upfile12").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile2").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit16_con22pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //     $("#edit16_upfile2").change(function(){
    //     var objUrl = getObjectURL(this.files[0]) ;
    //         // var file = document.getElementById("edit12_upfile2").files;
    //         // console.log(file);
    //         // console.log(file[0].size);
    //         // console.log(file[0].type);
    //         // console.log(file[0].name);
    //         // console.log("objUrl = "+objUrl) ;
    //     if (objUrl) {
    //       $(".edit16_con44pic img").attr("src", objUrl) ;
    //       // $(".indexone").hide();
    //       // $(".xianshi").show();
    //       // $(".up5").hide();
    //     }
    //   });
    //      //建立一个可存取到该file的url
    //   function getObjectURL(file) {
    //     var url = null ; 

    //     if (window.createObjectURL!=undefined) { // basic
    //       url = window.createObjectURL(file) ;
    //     } else if (window.URL!=undefined) { // mozilla(firefox)
    //       url = window.URL.createObjectURL(file) ;
    //     } else if (window.webkitURL!=undefined) { // webkit or chrome
    //       url = window.webkitURL.createObjectURL(file) ;
    //     }
    //     return url ;
    //   }
    //   $(".shengcheng16").click(function(){
                
    //             $(".shengcheng16").hide();
    //             // $(".edit3").show();
    //             $(".edit16_up1").hide();
    //             $(".edit16_up12").hide();
    //             $(".edit16_up2").hide();
    //             $(".header").hide();
    //             $("body").css("background","none");
    //             $(".edit16_con").css("background","url(../images/m9bg.jpg)");
    //             $(".edit16_con").css("background-size","100% 100%");
    //             html2canvas($(".edit16_con"), {
    //                     allowTaint: true,
    //                     taintTest: false,
    //                     // width: 720,
    //                     // height:1280,
    //                     // canvas: canvas,
    //                     onrendered: function(canvas) {
    //                         canvas.id = "mycanvas";
    //                         //document.body.appendChild(canvas);
    //                         //生成base64图片数据
    //                         $(".header").show();
    //                         $(".baocun").show();
    //                         var dataUrl = canvas.toDataURL("image/png");
    //                          $.ajax({  
    //                           type : "POST",  
    //                           url : "{:U('poster/create')}",  
    //                           data : {data:dataUrl},  
    //                           // timeout : 60000,  
    //                           success : function(data){  
    //                               // console.log(data);
    //                               // $('#myShowImage').attr('src', '${ctxStatic}/images/'+data+'.jpg'); //服务器上保存图片路径，data是返回的文件名。  
    //                               $(".baocunimg img").attr("src",data) ;
    //                           }  
    //                         });  
    //                         // $(".baocunimg img").attr("src",dataUrl) ;
    //                         $(".edit16").hide();
    //                     }
    //             });
    //     });
    // //第十六个页面结束
    $(".bottomnav li:eq(0)").click(function(){
      $(".bottomnav li:eq(0) a").css("color","#04be02");
      $(this).siblings().children().css("color","black");
    });
    $(".bottomnav li:eq(1)").click(function(){
      $(".bottomnav li:eq(1) a").css("color","#04be02");
      $(this).siblings().children().css("color","black");
      $(".muban1").show();
      $(".muban1 .dropload-down").show();
      $(".muban2").hide();
      $(".muban2 .dropload-down").hide();
      $(".muban3").hide();
      $(".muban3 .dropload-down").hide();
      $(".muban4").hide();
      $(".muban4 .dropload-down").hide();  
    });
    $(".bottomnav li:eq(2)").click(function(){
      $(".bottomnav li:eq(2) a").css("color","#04be02");
      $(this).siblings().children().css("color","black");
      $(".muban1").hide();
      $(".muban1 .dropload-down").hide();
      $(".muban2").show();
       $(".muban2 .dropload-down").show();
      $(".muban3").hide();
       $(".muban3 .dropload-down").hide();
      $(".muban4").hide();
      $(".muban4 .dropload-down").hide();  
        // var counter = 0;
        // // 每页展示4个
        // var num = 4;
        // var pageStart = 0,pageEnd = 0;

        // // dropload
        // $('.muban2').dropload({
        //     scrollArea : window,
        //     loadDownFn : function(me){
        //         console.log("ajax开始");
        //         $.ajax({
        //             type: 'GET',
        //             url: 'json/more2.json',
        //             dataType: 'json',
        //             success: function(data){
        //                 var result = '';
        //                 counter++;
        //                 pageEnd = num * counter;
        //                 pageStart = pageEnd - num;
        //                 console.log("ajax请求成功");
        //                 for(var i = pageStart; i < pageEnd; i++){
        //                     result +=   '<a href="'+data.lists[i].link+'">'
        //                                     +'<img src="'+data.lists[i].pic+'" alt="">'
        //                                 +'</a>';
        //                     if((i + 1) >= data.lists.length){
        //                         // 锁定
        //                         me.lock();
        //                         // 无数据
        //                         me.noData();
        //                         break;
        //                     }
        //                 }
        //                 // 为了测试，延迟1秒加载
        //                 setTimeout(function(){
        //                     $('.list2').append(result);
        //                     // 每次数据加载完，必须重置
        //                     me.resetload();
        //                 },1000);
        //             },
        //             error: function(xhr, type){
        //                 alert('Ajax error!');
        //                 console.log("请求失败");
        //                 // 即使加载出错，也得重置
        //                 me.resetload();
        //             }
        //         });
        //     }
        // });
    });
    $(".bottomnav li:eq(3)").click(function(){
      $(".bottomnav li:eq(3) a").css("color","#04be02");
      $(this).siblings().children().css("color","black");
      // $(".muban1").hide();
      // $(".muban2").hide();
      // $(".muban3").show();
      // $(".muban4").hide();
      $(".muban1").hide();
      $(".muban1 .dropload-down").hide();
      $(".muban2").hide();
      $(".muban2 .dropload-down").hide();
      $(".muban3").show();
      $(".muban3 .dropload-down").show();
      $(".muban4").hide();
      $(".muban4 .dropload-down").hide();  
        // var counter = 0;
        // // 每页展示4个
        // var num = 4;
        // var pageStart = 0,pageEnd = 0;

        // // dropload
        // $('.muban3').dropload({
        //     scrollArea : window,
        //     loadDownFn : function(me){
        //         console.log("ajax开始");
        //         $.ajax({
        //             type: 'GET',
        //             url: 'json/more3.json',
        //             dataType: 'json',
        //             success: function(data){
        //                 var result = '';
        //                 counter++;
        //                 pageEnd = num * counter;
        //                 pageStart = pageEnd - num;
        //                 console.log("ajax请求成功");
        //                 for(var i = pageStart; i < pageEnd; i++){
        //                     result +=   '<a href="'+data.lists[i].link+'">'
        //                                     +'<img src="'+data.lists[i].pic+'" alt="">'
        //                                 +'</a>';
        //                     if((i + 1) >= data.lists.length){
        //                         // 锁定
        //                         me.lock();
        //                         // 无数据
        //                         me.noData();
        //                         break;
        //                     }
        //                 }
        //                 // 为了测试，延迟1秒加载
        //                 setTimeout(function(){
        //                     $('.list3').append(result);
        //                     // 每次数据加载完，必须重置
        //                     me.resetload();
        //                 },1000);
        //             },
        //             error: function(xhr, type){
        //                 alert('Ajax error!');
        //                 console.log("请求失败");
        //                 // 即使加载出错，也得重置
        //                 me.resetload();
        //             }
        //         });
        //     }
        // });
    });
     $(".bottomnav li:eq(4)").click(function(){
      $(".bottomnav li:eq(4) a").css("color","#04be02");
      $(this).siblings().children().css("color","black");
      // $(".muban1").hide();
      // $(".muban2").hide();
      // $(".muban3").hide();
      // $(".muban4").show();
      $(".muban1").hide();
      $(".muban1 .dropload-down").hide();
      $(".muban2").hide();
      $(".muban2 .dropload-down").hide();
      $(".muban3").hide();
      $(".muban3 .dropload-down").hide();
      $(".muban4").show();
      $(".muban4 .dropload-down").show();  
        // var counter = 0;
        // // 每页展示4个
        // var num = 4;
        // var pageStart = 0,pageEnd = 0;

        // // dropload
        // $('.muban4').dropload({
        //     scrollArea : window,
        //     loadDownFn : function(me){
        //         console.log("ajax开始");
        //         $.ajax({
        //             type: 'GET',
        //             url: 'json/more4.json',
        //             dataType: 'json',
        //             success: function(data){
        //                 var result = '';
        //                 counter++;
        //                 pageEnd = num * counter;
        //                 pageStart = pageEnd - num;
        //                 console.log("ajax请求成功");
        //                 for(var i = pageStart; i < pageEnd; i++){
        //                     result +=   '<a href="'+data.lists[i].link+'">'
        //                                     +'<img src="'+data.lists[i].pic+'" alt="">'
        //                                 +'</a>';
        //                     if((i + 1) >= data.lists.length){
        //                         // 锁定
        //                         me.lock();
        //                         // 无数据
        //                         me.noData();
        //                         break;
        //                     }
        //                 }
        //                 // 为了测试，延迟1秒加载
        //                 setTimeout(function(){
        //                     $('.list4').append(result);
        //                     // 每次数据加载完，必须重置
        //                     me.resetload();
        //                 },1000);
        //             },
        //             error: function(xhr, type){
        //                 alert('Ajax error!');
        //                 console.log("请求失败");
        //                 // 即使加载出错，也得重置
        //                 me.resetload();
        //             }
        //         });
        //     }
        // });
    });
    //更多模板页结束
   
    
});