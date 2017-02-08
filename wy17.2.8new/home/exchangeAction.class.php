<?php
/* 
* @Li_php
* @兑换中心
* @date:2016.10.26
*/
class exchangeAction extends frontendAction
{
	public function _initialize(){ 
        parent::_initialize();
        $this->_mod=D('exchange');		
        $this->_user_mod=D('user');		
    }

	public function index(){
		// $openid=session('user.openid');
		// if(!$openid){
		// 	$this->_init_users();
		// 	echo '非法请求';die();
		// }else{
		// 	$where['openid']=$openid;
		// 	$user=D('user')->where($where)->find();
		// 	if(empty($user)){
		// 		 unset($_SESSION['user']);
		// 		 header('Location:http://'.$_SERVER['HTTP_HOST']);
		// 		 exit();
		// 	}
		// }
		$score = $this->_user_mod->where(array('openid'=>$openid))->getField('score');
		$lists = $this->_mod->where(array('is_show'=>1))->select();
		$this->assign('lists', $lists);
		$this->assign('score', $score);
		$this->display();
	}

	public function detail(){
		$id = I('get.id');//兑换物品ID
		if(!$id){
			echo '参数错误';die();
		}
		$goods = $this->_mod->where(array('is_show'=>1,'id'=>$id))->find();
		$this->assign('goods', $goods);
		$this->display();
	}

	public function exchange(){
		// $openid=session('user.openid');
		// if(!$openid){
		// 		$this->_init_users();
		// 		echo '非法请求';die();
		// }else{
		// 	$where['openid']=$openid;
		// 	$user=D('user')->where($where)->find();
		// 	if(empty($user)){
		// 		 unset($_SESSION['user']);
		// 		 header('Location:http://'.$_SERVER['HTTP_HOST']);
		// 		 exit();
		// 	}
		// }
		$id = I('get.id');
		if(!$id){
			echo '参数错误';die();
		}
		$is_virtual = I('get.is_virtual');
		$name = trim(I('post.name','','htmlspecialchars'));
		$address = trim(I('post.address','','htmlspecialchars'));
		$phone = trim(I('post.phone','','htmlspecialchars'));
		if(IS_POST){
			// var_dump($_POST);exit;
			if($_POST['name']==''){
				IS_AJAX&&$this->ajaxReturn(0, '收件人不能为空');
			}
			if($_POST['address']==''){
				IS_AJAX&&$this->ajaxReturn(0, '收件地址不能为空');
			}
			if($_POST['phone']==''){
				IS_AJAX&&$this->ajaxReturn(0, '联系方式不能为空');
			}
			if(!$this->is_phone($_POST['phone'])){
				IS_AJAX&&$this->ajaxReturn(0, '请输入正确的手机号');
			}
			echo 'OK';exit;
			$_POST['introduce']=str_replace(' ','',$_POST['introduce']);
			$this->_user_mod->where(array('openid'=>$openid))->save($_POST);
			IS_AJAX&&$this->ajaxReturn(1, '保存成功',$back_url);
			
			
		}


	}

    //积分兑换VIP
    public function scoreExchangeVIP(){
        $openid=session('user.openid');
        if ($openid) {
            $user = $this->_user_mod->where(array('openid'=>$openid))->find();
            if ($user['role_id'] == 2) {
                echo json_encode(array('status'=>0, 'msg'=>L('operation_failure'), 'data'=>0));//VIP用户
                exit;
            }
            if ($user['score']<600) {
                echo json_encode(array('status'=>0, 'msg'=>L('operation_failure'), 'data'=>2));//积分不够
                exit;
            }
            $data['role_id'] = 2;
            $data['start_time'] = time();
            $data['end_time'] = strtotime(date("Y-m-d H:i:s",strtotime("+1 month",time())));//1个月VIP
            $record['openid'] = $openid;
            $record['purpose'] = 'EXCHANGE VIP';
            $record['pre_score'] = $user['score'];
            $record['use_score'] = 600;
            $record['time'] = time();
            // $data['end_time'] = strtotime(date("Y-m-d H:i:s",strtotime("+1 day",time())));
            $this->_score_mod->add($record);
            $this->_user_mod->where(array('openid'=>$openid))->setDec('score', 600);
            $res = $this->_user_mod->where(array('openid'=>$openid))->save($data);
            if ($res) {  
                echo json_encode(array('status'=>1, 'msg'=>L('operation_success'), 'data'=>1));//成功兑换
            }
        }else{
            echo json_encode(array('status'=>1, '', 'data'=>3));//参数错误
        }

    }

	public function exception(){
		$this->display();
	}

	//最新手机号码验证规则
	public function is_phone($mobilePhone){
		if(preg_match("/^1((3(0|1|2|3|4|5|6|7|8|9))|(4(5|7))|(5(0|1|2|3|5|6|7|8|9))|(7(6|7|8))|(8(0|1|2|3|4|5|6|7|8|9)))\\d{8}|17(0|1|2|7|8))(0|5|9)\\d{7}$/", $mobilePhone)){
			return true;
		} else {
			return false;
		}
		
	}
}