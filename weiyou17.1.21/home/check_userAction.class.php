<?php
class check_userAction extends Action{
	$res_user_info=$this->get_user_info($openid);
	$data['username']=$res_user_info['nickname'];
	$data['sex']=$res_user_info['sex'];
	$data['province']=$res_user_info['province'];
	$data['city']=$res_user_info['city'];
	$data['thumb']=$res_user_info['headimgurl'];
	$data['img']=$res_user_info['headimgurl'];
	$data['language']=$res_user_info['language'];
	$data['country']=$res_user_info['country'];		
	$ip=get_client_ip();
	$time=time();
	$data['up_time']=$time;
	$data['up_ip']=$ip;
	$data['last_time']=$time;
	$data['last_ip']=$ip;
	$data['openid']=$openid;
	$data['reg_time']=$time;
	$data['reg_ip']=$ip;
	$data['role_id']=1;
	$data['start_time']=$time;
	$data['end_time']=0;
	$data['trade_openid']=$uopenid;
	file_put_contents('./data/user/'.$openid.'.txt',json_encode($data));





	//�����û�
	public function check_user(){
		$path="./data/user/";
		##��ȡ�ļ��б�
		$file=$this->check_file($path);
		foreach($file as $k){
			$filepath=$path.$k;
			$result=$this->read_file($filepath);
			$result=iconv('GB2312','UTF-8',$result);
			##ת������
			$result=json_decode($result,true);
			$User = M('User'); 
			$user=$User->where(array('openid'=>$result['openid']))->find();
			if(!$user){
				$res=$User->add($result);
			}
			else if($user && $user['trade_openid']==0 && $result['uopenid']!=0){
				$db['trade_openid']=$result['uopenid'];
				$res=$User->where(array('openid'=>$result['openid']))->save($db);
			}else{
				$res=true;
			}
			if($res){
				@unlink($filepath);
			}
			
		}
	}
	//��ȡ�ļ�����
	protected function read_file($filepath){
		if(is_file($filepath)){
			$contents = file_get_contents($filepath);
		}
		return $contents;
	}
	//��ȡ�ļ���
	protected function check_file($dir){
		$filename =array();
		// ��ȡ�ļ���
		if(is_dir($dir)) {
			if($dh = opendir ( $dir )) {
				
				while (($file = readdir ( $dh )) !==  false ) {
					$file = iconv('GB2312','UTF-8',$file);
					if(!file_exists($file)){
						$filename[] = $file;
					}
					
				}
				closedir ( $dh );
			}
		}else{
			return false;
		}
		return $filename;
	}


}

?>