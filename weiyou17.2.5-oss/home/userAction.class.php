<?php
/* 
* @bill
* @用户管理
* @date:20150515
* @用户个人中心，VIP管理，带参数二维码
*/
class userAction extends frontendAction
{
	public function _initialize(){ 
        parent::_initialize();	 
        
        $this->_user_mod=D('user');		
        $this->_user_role_mod=D('user_role');				
    }
	//个人中心
	public function index(){
		$code=$_POST['code'];
		$openid=session('user.openid');
		if(!$openid){
				$this->_init_users();
				echo '非法请求';die();
		}else{
			$where['openid']=$openid;
			$user=D('user')->where($where)->find();
			if(empty($user)){
				 unset($_SESSION['user']);
				 header('Location:http://'.$_SERVER['HTTP_HOST']);
				 exit();
			}
		}
		if(IS_POST){
			if($code){
				if($_SESSION['find_phone_code']!=$this->password_encrypt($code,$_SESSION['find_phone_code'])&&$_POST['phone']==$_SESSION['find_phone']){
					IS_AJAX&&$this->ajaxReturn(0, '验证码不正确');
					$this->error('验证码不正确');
				}
			}
			$back_url=$_SESSION['back_url'];
			unset($_SESSION['back_url']);
			if($_POST['weixin']==''){
				IS_AJAX&&$this->ajaxReturn(0, '微信号不能为空');
			}
			if($_POST['introduce']==''){
				IS_AJAX&&$this->ajaxReturn(0, '个人简介不能为空');
			}
			if($_POST['phone']==''){
				IS_AJAX&&$this->ajaxReturn(0, '手机号不能为空');
			}
			if(!$this->is_phone($_POST['phone'])){
				IS_AJAX&&$this->ajaxReturn(0, '请输入正确的手机号');
			}
			$_POST['introduce']=str_replace(' ','',$_POST['introduce']);
			$this->_user_mod->where(array('openid'=>$openid))->save($_POST);
			IS_AJAX&&$this->ajaxReturn(1, '保存成功',$back_url);
			
			
		}
		$where['openid']=$openid;
		$user=D('user')->where($where)->find();
		$time=time();
        if($user['end_time']!=0){
			if($user['role_id']==1 || $user['end_time']<$time){
				$db['start_time']=$time;
				$db['end_time']=0;
				$db['role_id']=1;//2代表vip，1代表普通用户
				D('user')->where($where)->save($db);
			}		
		}
		$trade_user=D('user')->where("trade_openid='".$openid."' or trade_openid='".$user['id']."'")->count();
		if($trade_user>=18 && $user['free_vip']==0){
		    $start=$end=time();
            if($user['end_time']!=0){
				$end=$user['end_time'];
			}
			$dbs['free_vip']=1;
			if($user['role_id']==1){
			   $dbs['start_time']=$start;
            }
			$dbs['end_time']=strtotime(date("Y-m-d H:i:s",strtotime("+1 month",$end)));//VIP到期时间，一月后
			$dbs['role_id']=2;//2代表vip，1代表普通用户
			D('user')->where(array('openid'=>$openid))->save($dbs);
		}
		
		if($user['username']==''){
			$res_user_info=$this->get_user_info($openid);
			$data['username']=$res_user_info['nickname'];
			D('user')->where($where)->save($data);
		}
		$res=$this->_user_mod->where(array('openid'=>$openid))->find();
		$res['tuijian']=$this->_user_mod->where("trade_openid='".$res['openid']."' or trade_openid='".$res['id']."'")->count();
		$res['role_name']=$this->_user_role_mod->where(array('id'=>$res['role_id']))->getField('name');
		$_SESSION['back_url']='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$res['thumb']=$this->init_header($res['thumb'],'132');//调取缩略图
		$score = $this->_user_mod->where(array('openid'=>$openid))->getField('score');
		$res['score'] = empty($score)?0:$score;
		$this->assign('res',$res);
		$this->display();
	}
	//个人中心
	public function index1(){
		$code=$_POST['code'];
		$openid=session('user.openid');
		if(!$openid){
				$this->_init_users();
				echo '非法请求';die();
		}else{
			$where['openid']=$openid;
			$user=D('user')->where($where)->find();
			if(empty($user)){
				 unset($_SESSION['user']);
				 header('Location:http://'.$_SERVER['HTTP_HOST']);
				 exit();
			}
		}
		if(IS_POST){
			if($code){
				if($_SESSION['find_phone_code']!=$this->password_encrypt($code,$_SESSION['find_phone_code'])&&$_POST['phone']==$_SESSION['find_phone']){
					IS_AJAX&&$this->ajaxReturn(0, '验证码不正确');
					$this->error('验证码不正确');
				}
			}
			$back_url=$_SESSION['back_url'];
			unset($_SESSION['back_url']);
			if($_POST['weixin']==''){
				IS_AJAX&&$this->ajaxReturn(0, '微信号不能为空');
			}
			if($_POST['introduce']==''){
				IS_AJAX&&$this->ajaxReturn(0, '个人简介不能为空');
			}
			if($_POST['phone']==''){
				IS_AJAX&&$this->ajaxReturn(0, '手机号不能为空');
			}
			if(!$this->is_phone($_POST['phone'])){
				IS_AJAX&&$this->ajaxReturn(0, '请输入正确的手机号');
			}
			$_POST['introduce']=str_replace(' ','',$_POST['introduce']);
			$this->_user_mod->where(array('openid'=>$openid))->save($_POST);
			IS_AJAX&&$this->ajaxReturn(1, '保存成功',$back_url);
			
			
		}
		$where['openid']=$openid;
		$user=D('user')->where($where)->find();
		$time=time();
        if($user['end_time']!=0){
			if($user['role_id']==1 || $user['end_time']<$time){
				$db['start_time']=$time;
				$db['end_time']=0;
				$db['role_id']=1;//2代表vip，1代表普通用户
				D('user')->where($where)->save($db);
			}		
		}
		$trade_user=D('user')->where("trade_openid='".$openid."' or trade_openid='".$user['id']."'")->count();
		if($trade_user>=18 && $user['free_vip']==0){
		    $start=$end=time();
            if($user['end_time']!=0){
				$end=$user['end_time'];
			}
			$dbs['free_vip']=1;
			if($user['role_id']==1){
			   $dbs['start_time']=$start;
            }
			$dbs['end_time']=strtotime(date("Y-m-d H:i:s",strtotime("+1 month",$end)));//VIP到期时间，一月后
			$dbs['role_id']=2;//2代表vip，1代表普通用户
			D('user')->where(array('openid'=>$openid))->save($dbs);
		}
		
		if($user['username']==''){
			$res_user_info=$this->get_user_info($openid);
			$data['username']=$res_user_info['nickname'];
			D('user')->where($where)->save($data);
		}
		$res=$this->_user_mod->where(array('openid'=>$openid))->find();
		$res['tuijian']=$this->_user_mod->where("trade_openid='".$res['openid']."' or trade_openid='".$res['id']."'")->count();
		$res['role_name']=$this->_user_role_mod->where(array('id'=>$res['role_id']))->getField('name');
		$_SESSION['back_url']='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$res['thumb']=$this->init_header($res['thumb'],'132');//调取缩略图	
		$this->assign('res',$res);
		$this->display();
	}

	public function exchange(){	//积分页面
		$openid=session('user.openid');
		if(!$openid){
			$this->_init_users();
			echo '非法请求';die();
		}else{
			$where['openid']=$openid;
			$user=D('user')->where($where)->find();
			if(empty($user)){
				 unset($_SESSION['user']);
				 header('Location:http://'.$_SERVER['HTTP_HOST']);
				 exit();
			}
		}
		$score = $this->_user_mod->where(array('openid'=>$openid))->getField('score');
		$score = empty($score)?0:$score;
		$this->assign('score', $score);
		$this->display('exchange');
	}
	
	public function power(){
		$openid=session('user.openid');
		if(!$openid){
			$this->_init_users();
			echo '非法请求';die();
		}else{
			$where['openid']=$openid;
			$user=D('user')->where($where)->find();
			if(empty($user)){
				unset($_SESSION['user']);
				header('Location:http://'.$_SERVER['HTTP_HOST']);
				exit();
			}elseif($user['role_id']!=2){
				$url = U('user/vip');
				$this->assign('user',$user);
				$this->assign('url',$url);
				$this->display('vip');
			}else{
				if($user['thumb']!=''){
					$user['thumb']=$this->init_header($user['thumb'],'132');
				}
				$this->assign('userinfo',$user);
				$this->display();
			}
		}
	}

	public function changecenter(){
		$this->display();
	}

	public function goodsdetail(){
		$this->display();
	}

	public function address(){
		$this->display();
	}

	public function exception(){
		$this->display();
	}
	//申请个人中心
	public function vip(){
		$openid=session('user.openid');
		if(!$openid){
			$this->_init_users();
			echo '非法请求';die();
		}else{
			$where['openid']=$openid;
			$user=D('user')->where($where)->find();
			if(empty($user)){
				 unset($_SESSION['user']);
				 header('Location:http://'.$_SERVER['HTTP_HOST']);
				 exit();
			}
		}
		if(IS_POST){
			$type=I('type','0','trim');
			//月会员
			if($type==1){
				$jsApiParameters=$this->get_jsApiParameters($openid,'一月VIP费用','9900');
			}
			//年费会员
			if($type==2){
				$jsApiParameters=$this->get_jsApiParameters($openid,'一年VIP费用','69900');
			}
			//超级会员
			if($type==0){
				$jsApiParameters=$this->get_jsApiParameters($openid,'超级vip费用','99900');
			}
			$jsApiParameters=json_decode($jsApiParameters,true);
			IS_AJAX&&$this->ajaxReturn(1, '查询成功',$jsApiParameters);
		}
		$free_vip=D('user')->where(array('openid'=>$openid))->getField('free_vip');
		$code_img='/data/code/'.$openid.'.jpg';
		$this->assign('code_img',$code_img);
		$this->assign('free_vip',$free_vip);
		$this->display();
	
	}
	public function get_jsApiParameters($openid,$body,$money){
		Vendor('payment.WxPayPubHelper.WxPayPubHelper');
		$jsApi = new JsApi_pub();
		if(!$openid){
			//=========步骤1：网页授权获取用户openid============
			//通过code获得openid
			if (!isset($_GET['code']))
			{
				//触发微信返回code码
				$url = $jsApi->createOauthUrlForCode(WxPayConf_pub::JS_API_CALL_URL);
				Header("Location: $url"); 
			}else
			{
				//获取code码，以获取openid
				$code = $_GET['code'];
				$jsApi->setCode($code);
				$openid = $jsApi->getOpenId();
			}
		} 
		/**
		 * JS_API支付demo
		 * ====================================================
		 * 在微信浏览器里面打开H5网页中执行JS调起支付。接口输入输出数据格式为JSON。
		 * 成功调起支付需要三个步骤：
		 * 步骤1：网页授权获取用户openid
		 * 步骤2：使用统一支付接口，获取prepay_id
		 * 步骤3：使用jsapi调起支付
		*/
		
		//=========步骤2：使用统一支付接口，获取prepay_id============
		//使用统一支付接口
		$unifiedOrder = new UnifiedOrder_pub();
		
		//设置统一支付接口参数
		//设置必填参数
		//appid已填,商户无需重复填写
		//mch_id已填,商户无需重复填写
		//noncestr已填,商户无需重复填写
		//spbill_create_ip已填,商户无需重复填写
		//sign已填,商户无需重复填写
		$unifiedOrder->setParameter("openid","$openid");
		$unifiedOrder->setParameter("body","$body");//商品描述
		//自定义订单号，此处仅作举例
		$timeStamp = time();
		$out_trade_no = WxPayConf_pub::APPID."$timeStamp";
		$unifiedOrder->setParameter("out_trade_no","$out_trade_no");//商户订单号 
		$unifiedOrder->setParameter("total_fee","$money");//总金额
		$unifiedOrder->setParameter("notify_url",WxPayConf_pub::NOTIFY_URL);//通知地址 
		$unifiedOrder->setParameter("trade_type","JSAPI");//交易类型
		//非必填参数，商户可根据实际情况选填
		//$unifiedOrder->setParameter("sub_mch_id","XXXX");//子商户号  
		//$unifiedOrder->setParameter("device_info","XXXX");//设备号 
		//$unifiedOrder->setParameter("attach","XXXX");//附加数据 
		//$unifiedOrder->setParameter("time_start","XXXX");//交易起始时间
		//$unifiedOrder->setParameter("time_expire","XXXX");//交易结束时间 
		//$unifiedOrder->setParameter("goods_tag","XXXX");//商品标记 
		//$unifiedOrder->setParameter("openid","XXXX");//用户标识
		//$unifiedOrder->setParameter("product_id","XXXX");//商品ID

		$prepay_id = $unifiedOrder->getPrepayId();
		//=========步骤3：使用jsapi调起支付============
		$jsApi->setPrepayId($prepay_id);

		$jsApiParameters = $jsApi->getParameters();	
		return $jsApiParameters;
	}
	public function result(){
		/**
		 * 通用通知接口demo
		 * ====================================================
		 * 支付完成后，微信会把相关支付和用户信息发送到商户设定的通知URL，
		 * 商户接收回调信息后，根据需要设定相应的处理流程。
		 * 
		 * 这里举例使用log文件形式记录回调信息。
		*/
			Vendor('payment.WxPayPubHelper.WxPayPubHelper');
			Vendor('payment.log_');
			
			//使用通用通知接口
			$notify = new Notify_pub();

			//存储微信的回调
			$xml = $GLOBALS['HTTP_RAW_POST_DATA'];	
			$notify->saveData($xml);
			
			//验证签名，并回应微信。
			//对后台通知交互时，如果微信收到商户的应答不是成功或超时，微信认为通知失败，
			//微信会通过一定的策略（如30分钟共8次）定期重新发起通知，
			//尽可能提高通知的成功率，但微信不保证通知最终能成功。
			if($notify->checkSign() == FALSE){
				$notify->setReturnParameter("return_code","FAIL");//返回状态码
				$notify->setReturnParameter("return_msg","签名失败");//返回信息
			}else{
				$notify->setReturnParameter("return_code","SUCCESS");//设置返回码
			}
			$returnXml = $notify->returnXml();
			echo $returnXml;
			
			//==商户根据实际情况设置相应的处理流程，此处仅作举例=======
			
			//以log文件形式记录回调信息
			$log_ = new Log_();
			$log_name="./data/payment/pay.log";//log文件路径
			$log_->log_result($log_name,"【接收到的notify反馈通知】:\n".$xml."\n");

			if($notify->checkSign() == TRUE)
			{
				if ($notify->data["return_code"] == "FAIL") {
					//此处应该更新一下订单状态，商户自行增删操作
					$log_->log_result($log_name,"【通信出错】:\n".$xml."\n");
				}
				elseif($notify->data["result_code"] == "FAIL"){
					//此处应该更新一下订单状态，商户自行增删操作
					$log_->log_result($log_name,"【业务出错】:\n".$xml."\n");
				}
				else{
					//此处应该更新一下订单状态，商户自行增删操作
					//$log_->log_result($log_name,"【支付成功】:\n".$xml."\n");
				
					//商户自行增加处理流程,
					$data['appid']=$notify->data["appid"];//微信分配的公众账号ID 
					$data['bank_type']=$notify->data["bank_type"];//银行类型，采用字符串类型的银行标识，银行类型见附表  
					$data['cash_fee']=$notify->data["cash_fee"];//现金支付金额订单现金支付金额 
					$data['fee_type']=$notify->data["fee_type"];//货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见  
					$data['is_subscribe']=$notify->data["is_subscribe"];//用户是否关注公众账号，Y-关注，N-未关注，仅在公众账号类型支付有效 
					$data['mch_id']=$notify->data["mch_id"];//微信支付分配的商户号
					$data['nonce_str']=$notify->data["nonce_str"];//随机字符串，不长于32位
					$data['out_trade_no']=$notify->data["out_trade_no"];//商户系统的订单号，与请求一致。
					$data['result_code']=$notify->data["result_code"];//SUCCESS/FAIL 
					$data['return_code']=$notify->data["return_code"];//SUCCESS/FAIL
					$data['openid']=$notify->data["openid"];//用户在商户appid下的唯一标识
					$data['sign']=$notify->data["sign"];//签名
					$data['time_end']=$notify->data["time_end"];//支付完成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
					$data['total_fee']=$notify->data["total_fee"];//订单总金额，单位为分 
					$data['trade_type']=$notify->data["trade_type"];//JSAPI、NATIVE、APP
					$data['transaction_id']=$notify->data["transaction_id"];//微信支付订单号 
					$data['add_time']=time();//成功处理时间
					if($data['cash_fee']=='69900'){
						$data['remark']='用户开通一年vip';//备注 
					}
					else if($data['cash_fee']=='99900'){
						$data['remark']='用户超级vip';//备注 
					}else{
						$data['remark']='用户开通一月vip';//备注，
					}
					
					//判断订单是否已经存在
					$where['transaction_id']=$data['transaction_id'];
					$where['openid']=$data['openid'];
					$where['appid']=$data['appid'];
					$result='<xml>
							   <return_code><![CDATA[SUCCESS]]></return_code>
							   <return_msg><![CDATA[OK]]></return_msg>
							</xml>';
					$wx_res=M('wxpay')->where($where)->find();
					if($wx_res){
						echo $result;
						echo 'SUCCESS';
						return $result;
					}
					//获取用户信息
					$access_token=$this->get_access_token();
					$openid=$data['openid'];
					$get_user_info_urls='https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
					$res_s=$this->post_data($get_user_info_urls);
					$res_s = json_decode($res_s,true);
                                        $user=M('user')->where(array('openid'=>$data['openid']))->find();
                                        $nicename='';
                                        if($res_s['subscribe']==0){
                                            $nicename=$user['username'];
                                        }else{
                                            $nicename=$res_s['nickname'];
                                        }
                                        $data['nickname']=$nicename;
					//$data['nickname']=$res_s['nickname'];
					if(M('wxpay')->add($data)){
						//$user=M('user')->where(array('openid'=>$data['openid']))->find();
						/*if($user['end_time']==0){
							$time=$data['add_time'];
						}else{
							$time=$user['end_time'];
						}*/
						//如果支付成功更新会员到期时间
						//$db['start_time']=$data['add_time'];//开通时间
                                                if($user['role_id']==1){  
						   $db['start_time']=$data['add_time'];//开通时间
                                                   $time=$data['add_time'];
                                                }else{
                                                   $time=$user['end_time'];
                                                }
						if($data['cash_fee']=='99900'||$data['cash_fee']=='69900'){
							$db['end_time']=strtotime(date("Y-m-d H:i:s",strtotime("+1 year",$time)));//VIP到期时间，一年后 
						}else{
							$db['end_time']=strtotime(date("Y-m-d H:i:s",strtotime("+1 month",$time)));//VIP到期时间，一月后
						}
						$db['role_id']=2;//2代表vip，1代表普通用户
						if(M('user')->where(array('openid'=>$data['openid']))->save($db)){
							
							//消息模版-支付成功后向用户推送消息
							$url='https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='.$access_token;
							$msg_db='
								 {
								   "touser":"'.$openid.'",
								   "template_id":"ze_D7BDqjbrfNxBBlPmHG-_b_1Ym1BKa2qiotrOFUEI",
								   "url":"http://'.$_SERVER['HTTP_HOST'].'/index.php/user-index.html",
								   "topcolor":"#FF0000",
								   "data":{
										   "first": {
											   "value":"亲爱的'.$nicename.',恭喜你荣升VIP会员",
											   "color":"#173177"
										   },
										   "grade1":{
											   "value":"普通会员",
											   "color":"#173177"
										   },
										   "grade2": {
											   "value":"VIP会员",
											   "color":"#173177"
										   },
										   "time": {
											   "value":"'.date('Y-m-d H:i',$data['add_time']).'",
											   "color":"#173177"
										   },
										   "remark":{
											   "value":"VIP会员可享受更多优惠及服务",
											   "color":"#173177"
										   }
								   }
							   }
							';
							$this->post_data($url,$msg_db);
							echo $result;
							echo 'SUCCESS';
							return $result;
						}else{
                                            $log_->log_result($log_name,$data['transaction_id'].":".$data['nickname'].'-'.$data['openid']."没能修改数据库pin_user:".M('user')->getLastSql()."\n");
                                                }
					}else{
                                            $log_->log_result($log_name,$data['transaction_id'].":".$data['nickname'].'-'.$data['openid']."没能加入数据库pin_wxpay:".M('wxpay')->getLastSql()."\n"); 
                                        }
				}
			}
	
	}
	//注册验证码
	public function reg_code(){
		$this->_init_users();
		$phone=I('phone');
		$msg='您正在绑定手机号码，验证码:';
		$check_res=$this->ajax_check_phone_s($phone);
		if($check_res['num']==0){
			IS_AJAX&&$this->ajaxReturn(0, $check_res['msg']);die();
		}
		$this->send_message($phone,$msg);
	}
	//发送短信
	protected function send_message($phone,$msg){
		$this->_init_users();
		$openid=session('user.openid');
		$code=$this->send_code();
		$res=$this->_sms_queue($phone,$msg.$code,$openid,$code);
		if($res['status']==1){
			$_SESSION['find_phone']=$phone;
			$_SESSION['find_phone_code']=$this->password_encrypt($code);
			$this->userlog($openid,0,L('send_success'));
			$this->ajaxReturn(1, L('send_success'));
		}else{
			$this->userlog($openid,1,$res['msg']);
			$this->ajaxReturn(0, $res['msg']);
		}
		die();
	}
	//注册-检测手机是否存在
	public function ajax_check_phone_s($phone=''){
		$this->_init_users();
		if(!$phone){
			$phone=I('phone');
		}
		if($phone==''||$phone=='0'){
			$res['num']=0;
			$res['msg']='请输入正确的手机号';
			return $res;
		}
		$phone_res=$this->ajax_check_nums($phone);
		if($phone_res['num']==0){
			$res['num']=0;
			$res['msg']=$phone_res['msg'];
			return $res;
		}
		$user=M('user')->where(array('phone'=>$phone))->find();
		if($user){
			$res['num']=0;
			$res['msg']='该手机号已绑定';
			return $res;
		}
		$res['num']=1;
		return $res;
	}
	//检查验证码发送次数
	protected function ajax_check_nums($phone){
		if($this->is_phone($phone)){
			$ip=get_client_ip();
			$times=strtotime(date("Y-m-d 00:00:00"));
			$where['openid']=session('user.openid');
			$where['phone']=$phone;
			$where['add_time']=array(array('gt',$times),array('elt',time()));
			$phone_res=M('sms_log')->where($where)->count();
			if($ip_res>=6||$phone_res>=6){
				$res['num']=0;
				$res['msg']='您今天获取手机验证码已经超限！';
				return $res;
				//IS_AJAX&&$this->ajaxReturn(0, '您今天获取手机验证码已经超限！');die();
			}
		}else{
			$res['num']=0;
			$res['msg']='请输入正确的手机号';
			return $res;
			//IS_AJAX&&$this->ajaxReturn(0, '请输入正确的手机号');die();
		}
		$res['num']=1;
		return $res;
	
	}
	//验证手机号码
	protected function is_mobile($mobilePhone) {
		if(preg_match("/^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{9}$/", $mobilePhone)){
			return true;
		} else {
			return false;
		} 
	}
	//最新手机号码验证规则
	public function is_phone($mobilePhone){
		if(preg_match("/^1((3(0|1|2|3|4|5|6|7|8|9))|(4(5|7))|(5(0|1|2|3|5|6|7|8|9))|(7(6|7|8))|(8(0|1|2|3|4|5|6|7|8|9)))\\d{8}|170(0|5|9)\\d{7}$/", $mobilePhone)){
			return true;
		} else {
			return false;
		}
		
	}
}
?>
