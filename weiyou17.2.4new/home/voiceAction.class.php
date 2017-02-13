<?php
/**
 * wx声音识别sdk
 *
 * @author LiQK
 */
class voiceAction extends frontendAction
{
	public function index() {
    	$this->display();
    }

    public function getVoice() {
    	import('ORG.Weixin.Voice');
    	$weixin = M('weixin')->find();
    	if ($weixin) {
	        $jssdk = new JSSDK( $weixin['appid'], $weixin['secret']);
	        $signPackage = $jssdk->GetSignPackage();
	        
    		$this->ajaxReturn(1, 'Sucdcess', $signPackage);
    	}
    	$this->ajaxReturn(0, 'Failure');
    }
}