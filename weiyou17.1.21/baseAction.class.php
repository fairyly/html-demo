<?php
/**
 * 控制器基类
 *
 * @author andery
 */
class baseAction extends Action
{
    protected function _initialize() {    	
        if (false === $setting = F('setting')) {
           $setting = D('setting')->setting_cache();
        }
        C($setting);   
    }
    public function _empty() {
        $this->_404();
    }
    protected function _404($url = '') {
        if($url){
            redirect($url);
        } else {
            send_http_status(404);
            $this->display(TMPL_PATH . '404.html');
            exit;
        }
    }
    public function init_header($url_pic,$spec=0){
		$start=substr($url_pic,0,-1);
		$result=$start.$spec;
		return $result;
	}
    /**
     * 添加短信到队列
     */
    protected function _sms_queue($to,$subject,$openid=0,$code=0){
    	$smsway = D('api_sms')->getway();
    	$data['api_key'] = $smsway['api_key'];
    	$data['api_user'] = $smsway['api_user'];
    	$data['api_pwd'] = $smsway['api_pwd'];
    	$data['message_end'] = $smsway['message_end'];
    	$data['to'] = $to;
    	$data['subject'] = $subject;
    	Vendor('api.Sms');
    	$Sms = new Sms();
    	$result = $Sms->sendSms($data,$smsway['flag']);
    	$model = 'sms_log';
    	if($result){
    		$logdata['status'] = $result['status'];
    	}else{
    		$logdata['status'] = 1;
    	}
    	$logdata['contents'] = $subject;
    	$logdata['phone'] = $to;
    	$logdata['action_name'] = ACTION_NAME;
    	$logdata['module_name'] = MODULE_NAME;
    	$logdata['openid'] = $openid;
    	$logdata['add_time'] = time();
    	$logdata['code'] = $code;
		$logdata['add_ip']=get_client_ip();
    	$this->_write_log($model,$logdata);
    	//return $result['status'] == '0' ? true : false;
		return $result ? $result : false;
    }
    /**
     * 上传文件默认规则定义
     */
    protected function _upload_init($upload) {
    	
        $allow_max = C('attr_allow_size'); //读取配置
        $allow_exts = explode(',', C('attr_allow_exts')); //读取配置
        $allow_max && $upload->maxSize = $allow_max * 1024;   //文件大小限制
        $allow_exts && $upload->allowExts = $allow_exts;  //文件类型限制
        $upload->saveRule = 'uniqid';
        return $upload;
       
    }

    /**
     * 上传文件
     */
    protected function _upload($file, $dir = '', $thumb = array(), $save_rule='uniqid'){
    	import('ORG.Net.UploadFile');
        $upload = new UploadFile();
        if ($dir) {
            $upload_path = C('attach_path') . $dir . '/';
            $upload->savePath = $upload_path;
        }
        if ($thumb) {
            $upload->thumb = true;
            $upload->thumbMaxWidth = $thumb['width'];
            $upload->thumbMaxHeight = $thumb['height'];
            $upload->thumbPrefix = '';
            $upload->thumbSuffix = isset($thumb['suffix']) ? $thumb['suffix'] : '_thumb';
            $upload->thumbExt = isset($thumb['ext']) ? $thumb['ext'] : '';
            $upload->thumbRemoveOrigin = isset($thumb['remove_origin']) ? true : false;
        }
        //自定义上传规则
        $upload = $this->_upload_init($upload);
        if( $save_rule!='uniqid' ){
            $upload->saveRule = $save_rule;
        }

        if ($result = $upload->uploadOne($file)){
			if($_SESSION['admin_user']=='1'){
				$username=$_SESSION['admin']['username'];
			}else{
				$username=$_SESSION['user']['username'];
			}
			$db=array(
				'flag'=>'image',
				'admin_id'=>$_SESSION['admin_user'],
				'username'=>$username,
				'type'=>$result[0]['extension'],
				'size'=>$result[0]['size'],
				'file_name'=>$result[0]['savename'],
				'module_name'=>$dir,
			);
			$this->_upload_field($db);
            return array('error'=>0, 'info'=>$result);
        } else {
            return array('error'=>1, 'info'=>$upload->getErrorMsg());
        }
       
    }
    
    /*
     * 上传文件记录
     * add by li 2014-12-18
     * 
     */
    protected function _upload_field($data){
    	$Model = D('upload');
    	$data['admin_id'] = $data['admin_id'] ? $data['admin_id'] : 0;
    	$data['add_time'] = $data['add_time'] ? $data['add_time'] : time();
    	$data['add_ip'] = $data['add_ip'] ? $data['add_ip'] : get_client_ip();
    	$result = $Model->add($data);
    	if($result){
    		$this->writelog();
    		return $result;
    	}else{
    		$this->writelog(1);
    		return false;
    	}
    }
    
    /*
     * admin_log
    * @param int $result  操作结果
    * @param string/array $remark  备注
    * @param string/array $data  操作数据
    * @param int $uid 被操作用户
    *add by li 2014-12-17
    */
    protected function writelog($result=0,$remark='',$data='',$uid=''){
    	$logdata['admin_id'] = $_SESSION['admin']['id'];
    	$logdata['action_name'] = ACTION_NAME;
    	$logdata['module_name'] = MODULE_NAME;
    	$logdata['remark'] = is_array($remark) ? serialize($remark) : $remark;
    	$logdata['data'] = is_array($data) ? serialize($data) : $data;
    	$logdata['add_time'] = time();
    	$logdata['executed_user'] = $uid ? $uid : '';
    	$logdata['result'] = $result ? $result : 0;
    	$logdata['add_ip'] = get_client_ip();
    	$result = $this->_write_log('admin_log',$logdata);
    	return $result ? true : false;
    }
    
    /*
     * user_log
    *add by li 2014-12-30
    */
    protected function userlog($openid,$result=0,$remark=''){
    	$logdata['openid'] = $openid;
		$logdata['module_name'] = MODULE_NAME;
		$logdata['action_name'] = ACTION_NAME;
		$logdata['add_time'] = time();
		$logdata['add_ip'] = get_client_ip();
		$logdata['status'] = $result;
		$logdata['remark'] = $remark;
    	$result = $this->_write_log('user_log',$logdata);
    	return $result ? true : false;
    }
    /*
     * log
    * @param string $mod  model名
    * @param array $data  操作数据
    *add by li 2014-12-20
    */
    protected function _write_log($mod,$data=array()){
    	if(!$mod || !$data){
    		return false;
    	}else{
    		
    		$LogModel = D($mod);
    		$result = $LogModel->add($data);
    		return $result ? $result : false;
    	}
    }
    /**
     * AJAX返回数据标准
     *
     * @param int $status
     * @param string $msg
     * @param mixed $data
     * @param string $dialog
     */
    protected function ajaxReturn($status=1, $msg='', $data='', $dialog='') {
        parent::ajaxReturn(array(
            'status' => $status,
            'msg' => $msg,
            'data' => $data,
            'dialog' => $dialog,
        ));
    }
	
	
	/**
     * 生成用户密码密文
     */
	protected function password_encrypt($password,$cryptograph=null) {
		$str="";
		if($cryptograph==null){

			for($i=1;$i<=5;$i++){
				$str.=substr("abcdefghijklmnopqrstuvwxyz1234567890",rand(0,35),1);
			}
		}
		else{
			$str=substr($cryptograph,0,5);
		}		
		$str.= md5($str.$password."YIOISDIFLLSLJIOU987998902-LLK>JJKLKLJSDF=LK23LKKL2349@&KJLJKSLKLKLJSFDKLJSKLJF<DKLJSFDKJKJLSD|FKJ.LJ");
		$str = substr($str,0,32);
		return $str;
	}
	//获取用户详细信息
	public function get_user_info($openid){
		$access_token=$this->get_access_token();
		//第二步 判断用户是否关注该公众帐号
		//$get_user_info_urls='https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$access_token.'&openid='.$openid;
		$get_user_info_urls='https://api.weixin.qq.com/cgi-bin/user/info?access_token='.$access_token.'&openid='.$openid.'&lang=zh_CN';
		$res_s=$this->post_data($get_user_info_urls);
		$res_s = json_decode($res_s,true);
		return $res_s;
	
	}
	//获取最新的access_token
	protected function get_access_token(){
		$api=M('weixin')->find();
		$appid = $api['appid'];  
		$secret = $api['secret'];
		//第一步 获取基础access_token
		$weixin=M('weixin')->where(array('appid'=>$appid,'secret'=>$secret))->find();
		if($weixin['time']+1800<time()||!$weixin['access_token']){
			$get_access_token_url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appid.'&secret='.$secret;
			$json_objs=$this->post_data($get_access_token_url);
			$json_objs = json_decode($json_objs,true);
			$access_token = $json_objs['access_token'];
			$data['time']=time();
			$data['access_token']=$access_token;
			M('weixin')->where(array('appid'=>$appid,'secret'=>$secret))->save($data);
		}else{
			$access_token = $weixin['access_token'];
		}
		return $access_token;
	}
	
	public function post_data($url, $data)
	{
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		if (!empty($data)){
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($curl);
		curl_close($curl);
		return $output;
	}
	
}