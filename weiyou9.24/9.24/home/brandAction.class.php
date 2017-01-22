<?php
/* 
*经销商
*/
class brandAction extends frontendAction
{
	public function _initialize() { 
        parent::_initialize();	 
        $this->_init_users();
        $this->_mod = D('brand');
        $this->uploadModel = D('upload');	
    }

    public function index(){
    	$p = I('get.p');
        $page = isset($p)?$p:1;
        $count = $this->_mod->where('status = 1')->count();
        import('ORG.Util.Pagenew2');
        $Page = new Pagenew2($count, 10);
		##分页
        $list = $this->_mod->limit(10)->where('`status` = 1')->order('RAND()')->select();
        // $list = $this->_mod->limit(($page*10).',10')->select();
        $Page->setConfig('theme', '%upPage% <p>第<span>%nowPage%</span>页</p> %downPage%');
        $show = $Page->show(); 

        $this->assign('list', $list);
        $this->assign('page', $show);
		$this->display();
    }
	
    public function detail(){
        $id = I('get.id');
        if (!$id) {
            $this->error('参数错误');die();
        }
        $info = $this->_mod->where('id = '.$id)->find();
        // echo '<pre>';var_dump($info);exit;
        $this->assign('info', $info);
        $this->display();
    }
}