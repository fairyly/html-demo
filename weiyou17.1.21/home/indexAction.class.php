<?php
/* 
*基本管理
*/
class indexAction extends frontendAction
{
	public function _initialize() { 
        parent::_initialize();	 
        $this->_init_users();		
    }
    public function index(){
		$openid=session('user.openid');
		$role_id=M('user')->where(array('openid'=>$openid))->getField('role_id');
		$this->assign('role_id',$role_id);
		$this->display();
    }
}