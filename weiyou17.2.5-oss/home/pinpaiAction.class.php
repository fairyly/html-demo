<?php
/* 
*经销商
*/
class pinpaiAction extends frontendAction
{
	public function _initialize() { 
        parent::_initialize();	 
        $this->_init_users();	
    }
    public function index(){
		$this->display();
    }
	
}