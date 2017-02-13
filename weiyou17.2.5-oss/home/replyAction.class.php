<?php
/* 
*回复管理
*/
class replyAction extends frontendAction
{
	public function _initialize() { 
        parent::_initialize();	 		
        $this->reply_mod=D('reply');		
		$this->_init_users();
    }
	//图文列表
	public function index(){
		$id=I('id');
		$reply_image=D('reply_image')->where(array('id'=>$id))->find();
		$this->assign('info',$reply_image);
		$this->display();
	}	
	
	
}
?>