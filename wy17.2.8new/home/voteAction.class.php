<?php
/* 
*投票管理
*/
class voteAction extends frontendAction
{
	public function _initialize() { 
        parent::_initialize();	 
        $this->_init_users();
        $this->_user_mod=D('user');		
        $this->_card_mod=D('card');		
        $this->_vote_mod=D('vote');		
        $this->vote_log_mod=D('vote_log');		
    }
	//投票列表
	public function index(){
		$orderid=array('nums'=>'desc','add_time'=>'desc','id'=>'desc','up_time'=>'desc');
		$list=$this->_vote_mod->order($orderid)->select();
		foreach($list as $k=>$v){
			$res=$this->check_card($v['user_id'],$v['card_id']);
			$list[$k]['img']=$res['img'];
			$list[$k]['name']=$res['name'];
			$list[$k]['weixin']=$res['weixin'];
			$list[$k]['introduce']=$res['introduce'];
		}
		$this->assign('list',$list);
		$this->display();
	
	}
	//明星详细信息
	public function detail(){
		$id=I('id');
		$info=$this->_vote_mod->where(array('id'=>$id))->find();
		$res=$this->check_card($info['user_id'],$info['card_id']);
		$res['nums']=$info['nums'];
		$res['id']=$id;
		$this->assign('res',$res);
		$this->display();
	}
	//执行投票操作
	public function invote(){
		$mac=$this->get_mac();
		$id=I('id');
		$user_id=$this->_vote_mod->where(array('id'=>$id))->getField('user_id');
		$res=$this->check_vote($user_id,$mac);
		if(!$res){
			$db['user_id']=$user_id;
			$db['mac']=$mac;
			$db['add_time']=time();
			if($this->vote_log_mod->add($db)){
				$this->_vote_mod->where(array('id'=>$id))->setInc('nums');
				$data['up_time']=time();
				$this->_vote_mod->where(array('id'=>$id))->save($data);
				IS_AJAX&&$this->ajaxReturn(1, '投票成功');
			}else{
				IS_AJAX&&$this->ajaxReturn(0, '投票失败，该服务器mac地址为空'.$mac);
			}
		}else{
			IS_AJAX&&$this->ajaxReturn(0, '您今天已经投过票了');
		}
	}
	//检查投资者投票情况
	public function check_vote($user_id,$mac){
		$where['user_id']=$user_id;
		$where['mac']=$mac;
		$res=$this->vote_log_mod->where($where)->find();
		if($res){
			if($res['add_time']<time()+24*3600){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	//查询明星个人信息
	public function check_card($user_id,$card_id){
		//获取用户头像
		$user=$this->_user_mod->where(array('id'=>$user_id))->find();
		if($user['thumb']){
			$res['img']=$user['thumb'];//调取缩略图
		}else{
			$res['img']=$user['img'];//调取原图
		}
		//获取名片简介
		$card=$this->_card_mod->where(array('id'=>$card_id))->find();
		$res['name']=$card['name'];
		$res['weixin']=$card['weixin'];
		$res['introduce']=$card['introduce'];
		return $res;
	}
	//获取用户手机mac地址
	public function get_mac(){
		@exec("arp -a",$array); //执行arp -a命令，结果放到数组$array中 
		foreach($array as $value){ 
			//匹配结果放到数组$mac_array 
			if(strpos($value,$_SERVER["REMOTE_ADDR"]) && preg_match("/(:?[0-9A-F]{2}[:-]){5}[0-9A-F]{2}/i",$value,$mac_array)){ 
				$mac = $mac_array[0]; 
				break; 
			} 
		} 
		return $mac;
	}
	
	
}
?>