		$(function(){
			
			$("body").bind("unload",function(e){
			websocket.close();
		})
		})
			var websocket = null;    
			function connect(){            
				try{                       
					var host = "ws:/120.26.75.96:8080";                 
					websocket = new WebSocket(host);   
					websocket.onopen = function(){                 
					var b='{"fromName":"www","toName":"111","from":"'+fromid+'","to":"1111","roomId":"-1","info":"test"}';
					websocket.send(b);  
					}             
					websocket.onmessage = function(event){ 
                      var json=JSON.parse(event.data);
					  var num=0;
					   json[0].listInfo.forEach(function(e){	
				if(json[0].count>0){
					num++;	
				}
                       }) 
               if(num>0){
					$("#tishi").html('<span>消息</span><p class="f_tishi"></p>');	
				}else{
					$("#tishi").html('<span>消息</span>');	
				}					   
							
					}             
						websocket.onclose　= function(){
						
						}                 
				}catch(exception){  
					connect(); 
				} 	 
			}
			function send(text){         	   
				try{    
					var b='{"fromName":"'+myname+'","toName":"111","from":"'+fromid+'","to":"1111","roomId":"-1","info":"test"}';
					websocket.send(b);             	     
				}catch(exception){              
				}        
			}       
			function disconnect(){         
				websocket.close();    
			} 
		
			connect();
			
			