<?php
/**
 * 前台控制器基类
 *
 * @author andery
 */
class frontendAction extends baseAction {

    protected $user = null;
    public function _initialize() {
        parent::_initialize();
        //网站状态
        if (!C('site_status')) {
            header('Content-Type:text/html; charset=utf-8');
            exit(C('closed_reason'));
        }
    }
	//初始化网站数据
    public function _init_users(){
	//如果存在重新获取以下基本信息--强制关注用此方法
		
		//session_destroy();
		//$_SESSION['user']['openid']='oRCB7johaZnlJIsMUf0maZmwkoCM';
		$openid=session('user.openid');
		//微信授权
		if(!isset($_SESSION['user'])||$_SESSION['user']['errcode']!=''||$openid==''){
			//暂时不用该功能
			//$this->get_access_token();
			$api=M('weixin')->find();
			$APPID=$api['appid'];
			$REDIRECT_URI='http://'.$_SERVER['HTTP_HOST'].'/index.php?m=oauth&a=index';
			//$scope='snsapi_base';
			$scope='snsapi_userinfo';//需要授权
			$url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='.$APPID.'&redirect_uri='.urlencode($REDIRECT_URI).'&response_type=code&scope='.$scope.'&state=123'.$state.'#wechat_redirect';
			$_SESSION['url']='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			header("Location:".$url);
		} 
	}
	/* public function post_data($url,$data){
		$ch = curl_init();
		$timeout = 30;
		curl_setopt ($ch, CURLOPT_URL, $url);
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		curl_setopt ($ch,CURLOPT_SSL_VERIFYHOST,1);
		curl_setopt ($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
		if (!empty($data)){
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
		curl_setopt ($ch,CURLOPT_SSLVERSION,CURLOPT_SSLVERSION_TLSVv1); 
		$file_contents = curl_exec($ch);
		curl_close($ch);
		return $file_contents;
	} */
	
	
	//公共验证码方法
	public function verify() {
        Image::buildImageVerifyCode(100,35,4,5,'png','verify');
    }
    //字符串处理
    protected function changeStr($str) {
    	$result = '';
    	if ($str) {
    		$len = strlen($str);
    		if ($len > 6) {
    			$mobst = substr($str, 0, 3);
    			$mobend = substr($str, -3);
    			$relen = $len - 6;
    		} else {
    			$mobst = substr($str, 0, 2);
    			$mobend = '';
    			$relen = $len - 2;
    		}
    		if ($relen > 0) {
    			for ($i = 0; $i < $relen; $i++) {
    				$restr .= '*';
    			}
    		} else {
    			$restr = '';
    		}
    		$result = $mobst . $restr . $mobend;
    	}
    	return $result;
    }
    
    /*
     * 生成随机码
     */
    protected function send_code($len=6,$type='num'){
    	$typelist = array(
    		'num' => '123456789',
    		'str' => 'abcdefghijklmnopqrstuvwxyz',
    		'both' => 'abcdefghijklmnopqrstuvwxyz123456789',
    	);
    	for($i=0;$i<$len;$i++){
    		$result .= substr($typelist[$type],mt_rand(0,strlen($typelist[$type])-1),1);
    	}
    	return $result;
    }
    /**
     * 前台分页统一
     */
    protected function _pager($count, $pagesize) {
        $pager = new Page($count, $pagesize);
        $pager->rollPage = 5;
        $pager->setConfig('prev', '<');
        $pager->setConfig('theme', '%upPage% %first% %linkPage% %end% %downPage%');
        return $pager;
    }
}
