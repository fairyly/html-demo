<?php
/* 
*海报
*/
class posterAction extends frontendAction
{
	public function _initialize() { 
        parent::_initialize();	 
        $this->_init_users();
        $this->_mod = D('poster');
    }

    public function index(){
		$this->display();
    }

    ##页面模板通用方法
    public function poster(){
        $templete = I('get.templete');
        
        $this->display($templete);
    }

    ##生成图片
    public function create(){

        $base64 = $_POST['data'];
        $filename = time().rand(0,10000).'.jpg';
        $data = explode(',', $base64);
        $type = $data[1];
        //生成文件保存到本地
        if (file_put_contents( WEB_ROOT.'/Public/poster/'.$filename, base64_decode($type))) {

            echo $filename;
        }
    } 

}