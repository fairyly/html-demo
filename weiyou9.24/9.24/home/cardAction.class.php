<?php
/* 
*   名片管理
*	author:bill
*	date:20150922
*	author:bill
* 
*/
class cardAction extends frontendAction
{
	##初始化
	public function _initialize() { 
        parent::_initialize();	 
		$this->_init_users();
        $this->_user_mod=D('user');		
        $this->_card_mod=D('card');	
		$this->_card_group_mod = D('card_group');		
        $this->_vote_mod=D('vote');		
    }
	##默认首页
	public function index(){
		$this->display('lists');
	}
	##达人秀
	public function lists(){
        import('ORG.Util.Pagenew');
        $openid=session('user.openid');
        $role_id=M('user')->where(array('openid'=>$openid))->getField('role_id');
        
		$count=500;
        $Page = new Pagenew($count, 10);
		##利用视图
		$this->_card_mod_v=D('card_v');	
		$list=$this->_card_mod_v->limit($Page->firstRow . ',' . $Page->listRows)->select();
		##设置分页
        $Page->setConfig('theme', '%upPage% <p>第<span>%nowPage%</span>页</p> %downPage%'); //只显示上下页选项
        $show = $Page->show();
        ##处理ajax加载达人秀
		if(IS_AJAX){
            $data=array('list'=>'','pages'=>'','status'=>0,'count'=>0);
			$pages=$card_list=$list_str='';
            foreach ($list as $k => $v) {
				$location='未知地区';
				$province=$v['province'];
				$city=$v['city'];
				if($province!=''){
					if($city!=''){
						$location=$province.'-'.$city;
					}else{
						$location=$province;
					}
				}
				$thumb=$v['thumb'];
				if(!empty($thumb)){
					$thumb=substr($thumb,0,-1).'96';
				}
				$list[$k]['name']= preg_replace( "@<script(.*?)</script>@is", "", $v['name'] ); 
                $list[$k]['introduce']= preg_replace( "@<script(.*?)</script>@is", "", $v['introduce'] ); 
				$list[$k]['thumb']=$thumb;
				$list[$k]['location']=$location;
			}
            if($count>10){
                $pages=$show;
            }
            $data['list']=$list;
            $data['pages']=$pages;
            $data['status']=1;
            $data['count']=$count;
            $data['role_id']=$role_id;
            echo json_encode($data);
			exit();
        }
		foreach ($list as $k => $v) {
			$province=$v['province'];
			$city=$v['city'];
			if($province!=''){
				if($city!=''){
					$location=$province.'-'.$city;
				}else{
					$location=$province;
				}
			}
			$thumb=$v['thumb'];
			if(!empty($thumb)){
				$thumb=substr($thumb,0,-1).'96';
			}
			$list[$k]['name']= preg_replace( "@<script(.*?)</script>@is", "", $v['name'] ); 
            $list[$k]['introduce']= preg_replace( "@<script(.*?)</script>@is", "", $v['introduce'] ); 
			$list[$k]['location'] = $location;
			$list[$k]['pic'] = $thumb;
		}
		$this->assign('list', $list);
		$this->assign('page', $show);
		$provinces=M('area')->where(array('leveltype'=>1))->select(array('field'=>'shortname,id'));
		$this->assign('provinces',$provinces);
                $this->assign('role_id',$role_id);
		$this->display();
        
	}
	##达人秀检索
	public function searchCard(){
        if(IS_AJAX){
        $openid=session('user.openid');
        $role_id=M('user')->where(array('openid'=>$openid))->getField('role_id');
            usleep(500);
            $data=array('list'=>'','pages'=>'','status'=>0,'count'=>0);
            $prov=$_POST['prov']+0;
            $prov=(int)$prov;
            $citys=$_POST['city']+0;
            $citys=(int)$citys;
            $sex=empty($_POST['sex'])?'':$_POST['sex']+0;
            $area=M('area');
            $where="status=0";
            if($sex!=''){
                $sex=(int)$sex;
                if($sex<0 || $sex>2){
                    $data['message']='非法性别';
                    echo json_encode($data);
                    exit();
                }
                $where.=" and sex=".$sex;
            }
            if($prov!=0){
                $pro_info=$area->where(array('id'=>$prov,'leveltype'=>1))->find();
                if(empty($pro_info)){
                    $data['message']='省份非法';
                    echo json_encode($data);
                    exit();
                }
                $where.=" and (province ='".$pro_info['shortname']."' or province='".$pro_info['pinyin']."')";
                if($citys!=0){
                    $city_info=$area->where(array('id'=>$citys,'leveltype'=>2))->find();
                    if(empty($city_info) || $city_info['parentid']!=$pro_info['id']){
                        $data['message']='城市非法';
                        echo json_encode($data);
                        exit();
                    }
                    $where.=" and (city ='".$city_info['shortname']."' or city='".$city_info['pinyin']."' )";
                }
            }
            $count = M('card')->where($where)->count('distinct openid');
            $pages=$card_list=$list_str='';
            if($count>0){
                import('ORG.Util.Pagenew');
                $Page = new Pagenew($count, 10);
                $subquery=M('card')->where($where)->order('time desc')->select(false);
                $list=M('card')->table($subquery.' a')->group('openid')->order('time desc')->limit($Page->firstRow . ',' . $Page->listRows)->select();
                $Page->setConfig('theme', '%upPage% <p>第<span>%nowPage%</span>页</p> %downPage%');
                $Page->parameter='status=0';
                $show = $Page->show();
                foreach ($list as $k => $v) {
                    $user = $this->_user_mod->where(array('openid' => $v['openid']))->find();
                    $province=$city='';
                    $rule='/^[\x{4e00}-\x{9fa5}]+$/u';
                    if($v['province']!=''){
                        if(preg_match($rule,$v['province'])){
                            $province=$v['province'];
                        }else{
                            $prin_info=$area->where(array('pinyin'=>$v['province']))->find();
                            $province=isset($prin_info)?$prin_info['shortname']:'';
                        }
                    }
                    if($user['city']!=''){
                        if(preg_match($rule,$v['city'])){
                            $city=$v['city'];
                        }else{
                            $city_info=$area->where(array('pinyin'=>$v['city']))->find();
                            $city=isset($city_info)?$city_info['shortname']:'';
                        }
                    }
                    $location='未知地区';
					$list[$k]['role_id']=$user['role_id'];
                    if($province!=''){
                        if($city!=''){
                            $location=$province.'-'.$city;
                        }else{
                            $location=$province;
                        }
                    }
                    $thumb=$user['thumb'];
                    if(!empty($thumb)){
                        $thumb=substr($thumb,0,-1).'132';
                    }
					$list[$k]['name']= preg_replace( "@<script(.*?)</script>@is", "", $v['name'] ); 
                    $list[$k]['introduce']= preg_replace( "@<script(.*?)</script>@is", "", $v['introduce'] ); 
					$list[$k]['thumb']=$thumb;
					$list[$k]['location']=$location;
                }
                if($count>10){
$pages=$show;
                 //   $pages =  preg_replace("/href='(.*)'/Ui","href='javascript:void(0)' class='ui-link //page_buttons' _href='$1'", $show);
                }
$pages=$show;
            }
            $data['list']=$list;
            $data['pages']=$pages;
            $data['status']=1;
            $data['count']=$count;
            $data['role_id']=$role_id;
            echo json_encode($data);
            exit();
        }
    }
	##微商群
	public function group_lists(){
        $p = I('get.p');
        $page = isset($p)?$p:1;
        $count = 500;
        import('ORG.Util.Pagenew2');
        $Page = new Pagenew2(500, 10);
		##利用视图
		$this->_card_mod_group_v=D('card_group_v');
        $list = $this->_card_mod_group_v->limit(($page*10).',10')->select();
        $Page->setConfig('theme', '%upPage% <p>第<span>%nowPage%</span>页</p> %downPage%');
        $show = $Page->show(); 
  //       import('ORG.Util.Pagenew');
		// $count=500;
  //       $Page = new Pagenew(500, 10);
  //       if (!empty($page)) {
  //       	$Page->firstRow = $pagenum;
  //       }
		// ##利用视图
		// $this->_card_mod_group_v=D('card_group_v');	
		// $list=$this->_card_mod_group_v->limit($Page->firstRow . ',' . $Page->listRows)->select();
  //       ##设置分页
  //       $Page->setConfig('theme', '%upPage% <p>第<span>%nowPage%</span>页</p> %downPage%'); //只显示上下页选项
  //       $show = $Page->show();
		// if(IS_AJAX){
		// 	if($count>10){
  //               $pages=$show;
  //           }
		// 	$data['list']=$list;
  //           $data['pages']=$pages;
  //           $data['status']=1;
  //           $data['count']=$count;
  //           echo json_encode($data);
		// 	exit();
		// }
        $this->assign('list', $list);
        $this->assign('p',$p);
        $this->assign('page', $show);
        $this->display();
    }
	##微商群详细页
	public function detail(){
		$id=I('id');
		$res=$this->_card_group_mod->where(array('id'=>$id))->find();
		$this->assign('p',I('get.p'));
		$this->assign('res',$res);
		$this->display();
	}
	public function ajax_check_insert(){
		$status=I('status');
		$openid=session('user.openid');
		$res=$this->check_insert($status,$openid);
		if($res['num']==0){
			$this->ajaxReturn(0,$res['msg'],$res['flag']);
		}
		$this->ajaxReturn(1,$res['msg']);
	}
	##检测发布情况
	protected function check_insert($status,$openid,$string='',$title=''){
		$user=$this->_user_mod->where(array('openid'=>$openid))->find();
        $result=array('num'=>0,'flag'=>'');
		if(($user['phone']=='')||($user['weixin']=='') || ($user['introduce']=='')){
			$result['msg']='亲爱的（'.$user['username'].'）：首次发布 请先完善个人信息，再发布名片';
			$result['url']=U('user/index');
			$result['flag']='index';
			return $result;
		}
		if($status=='1'){
			$this->_mod=$this->_card_group_mod;
		}else{
			$this->_mod=$this->_card_mod;
		}
		//判断是否满足条件
		$res=$this->_mod->where(array('openid'=>$openid,'status'=>$status))->order('time desc')->find();//发布情况
		$role_id=M('user')->where(array('openid'=>$openid))->getField('role_id');
		$rate=M('user_role')->where(array('id'=>$role_id))->getField('rate');
		if(($res['time']+$rate*60*60)>time()){
			if($role_id=='1'){
				$result['flag']='user';
				$result['msg']="亲爱的（".$user['username']."）：普通用户24小时内只能发布一次哦；开通VIP24小时内可以发布99次哦（99倍细粉），还可以有VIP专属标识--彰显尊贵身份，昵称变身尊贵红名……";
				$result['url']=U('user/vip');
				return $result;
			}else{
				if($status==1){
					$result['url']=U('card/group_lists');
				}else{
					$result['url']=U('card/lists');
				}
				$result['flag']='vip';
				$result['msg']="尊贵的VIP会员（".$user['username']."）：普通会员24小时内发布一次名片，您只需要间隔15分钟发布一次名片，24小时内发布99次（99倍吸粉）；您的昵称也是尊贵红名、您还有VIP专属标识来彰显您尊贵的身份！";
				return $result;
			}
		}
		if($title){
			if($this->check_badword($title)){
				$result['msg']='昵称'.C('badword_say');
				$result['url']=U('card/insert');
				return $result;
			}
		}
		if($string){
			if($this->check_badword($string)){
				$result['msg']='简介'.C('badword_say');
				$result['url']=U('card/insert');
				return $result;
			}
		}
		$result['num']=1;
		$result['msg']="可以发布";
		return $result;
	}
	##检测关键字
	public function check_badword($string){
		$badkey = C('badword');
		if($badkey){
			$matched = preg_match('/'.$badkey.'/i', $string, $result);
			if($matched && isset($result[0]) && strlen($result[0]) > 0 )
			{
				if ( strlen($result[0]) == 2 ){
					$matched = preg_match('/'.$badkey.'/iu', $string, $result);
				} 
				if ( $matched && isset($result[0]) && strlen($result[0]) > 0 ) {
					return true;
				}else{
					return false;
				}  
			}else{
				return false;
			}	
		}else{
			return false;
		}
	}
	##名片发布（微商群，达人秀）
	public function insert(){
		if(IS_POST){
			$status=$_POST['status'];
			if($_POST['name']==''){
				IS_AJAX&&$this->ajaxReturn(0, '昵称不能为空'.$_POST['name'],2);
				$this->error('昵称不能为空');die();
			}
			if($_POST['weixin']==''){
				IS_AJAX&&$this->ajaxReturn(0, '微信号不能为空',2);
				$this->error('微信号不能为空');die();
			}
			if($_POST['img']==''){
				IS_AJAX&&$this->ajaxReturn(0, '二维码不能为空',2);
				$this->error('二维码不能为空');die();
			}
			if($_POST['introduce']==''){
				IS_AJAX&&$this->ajaxReturn(0, '简介不能为空',2);
				$this->error('简介不能为空');die();
			}
			$ext1 = substr($_POST['img'],strrpos($_POST['img'], '.'));		
			if(strlen($ext1) <6 && (strpos($ext1,'png')>0  || strpos($ext1,'jpg')>0 || strpos($ext1,'jpeg')>0)){				
			}else{
				// IS_AJAX&&$this->ajaxReturn(0, '二维码不能为空',2);
				// $this->error('二维码不能为空');die();
			}
			$openid=session('user.openid');
			$_POST['name']= preg_replace( "@<script(.*?)</script>@is", "", $_POST['name'] ); 
            $_POST['introduce']= preg_replace( "@<script(.*?)</script>@is", "", $_POST['introduce'] ); 
			$_POST['time']=time();
			$_POST['uptime']=time();
			$_POST['openid']=$openid;
			$_POST['province']=session('user.province');
			$_POST['city']=session('user.city');
			$_POST['sex']=session('user.sex');
			//$vote=$_POST['vote'];
			//判断是否满足条件
			$result=$this->check_insert($status,$openid,$_POST['introduce'],$_POST['name']);
			if($result['num']==0){
				if($result['flag']){
					$data=$status;
				}else{
					$data=2;
				}
				IS_AJAX&&$this->ajaxReturn(0,$result['msg'],$data);die();
			}
			##区分达人秀，微商群
			if($status=='1'){
				$id = $this->_card_group_mod->add($_POST);
			}else{
				$id = $this->_card_mod->add($_POST);
			}
			 if ($id) {
				IS_AJAX && $this->ajaxReturn(1, '发布成功', $status);
                if($status == '0') {
                    $this->success('发布成功', U('card/lists'));
                } else {
                    $this->success('发布成功', U('card/group_lists'));
                }
            } else {
                IS_AJAX && $this->ajaxReturn(0, '发布失败');
                $this->error('发布失败');
            }
		}else{
			$status=isset($_GET['status'])?$_GET['status']+0:0;		
			$status=(int)$status;
			if($status!=0 && $status!=1){
			   $status=0;
			}  
			$openid=session('user.openid');
			$user=D('user')->where(array('openid'=>$openid))->find();
			$this->assign('user',$user);
			$result=$this->check_insert($status,$openid);
	        $this->assign('result',$result);
			##如果不满足条件进行跳转
			if($result['num']==0){
				##临时注释
				//$this->display();
			} 
			$this->assign('status',$status);
			if($status==0){
				$code_image=$hide_image='';
				$last_card=M('card')->where(array('openid' => $openid, 'status' =>0))->order('time desc')->find();
				if(!empty($last_card)){
					$hide_image=$last_card['thumb'];
					Vendor('oss.alioss');
					$oss_sdk_service = new ALIOSS();
					$oss_sdk_service->set_debug_mode(FALSE);
					$buckets=$oss_sdk_service->list_bucket();
					if($buckets->body!=''){
						$s=$this->explain_xml($buckets->body);
						if($s){
							$bucket=$s->Buckets->Bucket[0]->Name;
							$thumb_path=$last_card['thumb'];//缩略图
							$object=substr($thumb_path,1);
							$res=$oss_sdk_service->is_object_exist($bucket,$object);
							$re = $res->header;
							if ($re['_info']['http_code'] == '200') {
								$code_image=$last_card['img'];
							}
						 }
					}
				}
				$this->assign('code_image',$code_image);
				$this->assign('hide_image',$hide_image);
				$this->display('one_insert');
			}else{
				$this->display('qun_insert');
			}	
		}
	}
    ##达人自动发布
    public function oneAutoInsert(){
        $data = $this->_user_mod->where('role_id = 3')->field('openid')->order('RAND()')->limit(2)->select();
        if ($data) {
            foreach ($data as $key => $val) {
                $res = M('card')->where(array('openid'=>$val['openid']))->order('uptime DESC')->find();
                $res['time'] = time();
                $res['uptime'] = time();
                unset($res['id']);
                ##发布
                $id = M('card')->add($res);
                // if ($id)
                //     continue;
                // else
                //     break;
            }
        }
    }
	##发布记录
	public function record(){
		$where['openid']=session('user.openid');
		$card = $this->_card_mod; 
		import('ORG.Util.Page');
		$count      = $card->where($where)->count();
		$Page       = new Page($count,10);
		$orderid=array('orderid'=>'desc','uptime'=>'desc','time'=>'desc');
		$list = $card->where($where)->order($orderid)->limit($Page->firstRow.','.$Page->listRows)->select();
		$Page->setConfig('prev', '<button data-theme="c" data-ajax="false">上一页</button>');//上一页
        $Page->setConfig('next', '<button data-theme="c" data-ajax="false">下一页</button>');//下一页
		$Page->setConfig('theme', '%upPage% %downPage%');//只显示上下页选项
		$show       = $Page->show();
		foreach($list as $k=>$v){
			if($v['status']==0){
				$user=$this->_user_mod->where(array('openid'=>$v['openid']))->find();
				$list[$k]['pic']=$this->init_header($user['thumb'],'132');//调取缩略图	
			}else{
				$list[$k]['img']='__STYLE__/images/m2.png';
			}
		}
		$this->assign('list',$list);
		$this->assign('page',$show);
		$this->display();
	}
	##图片上传
	public function upload(){
		if($_SESSION['user']['openid']==''){
			$this->ajaxReturn(0,'非法请求');
		}
		$openid=$_SESSION['user']['openid'];
		$types=$_POST['types'];
		//准备上传返回的结果
		$resinfo = array("err"=>"","msg"=>"");
		import('ORG.Net.UploadFile');
		$upload = new UploadFile();// 实例化上传类
		$allow_max = C('attr_allow_size'); //读取配置 设置附件上传大小
        $allow_exts = explode(',', C('attr_allow_exts')); //读取配置 设置附件上传类型
        $allow_max && $upload->maxSize = $allow_max * 1024;   //文件大小限制
        $allow_exts && $upload->allowExts = $allow_exts;  //文件类型限制
		$upload->savePath =  './data/upload/card/'.$openid.'/';// 设置附件上传目录
		//设置需要生成缩略图，仅对图像文件有效 
        $upload->thumb = true; 
        //设置需要生成缩略图的文件后缀 
        $upload->thumbPrefix = 'm_';  //生产2张缩略图 
		$upload->thumbFile = $upload->savename;
        //设置缩略图最大宽度 
        $upload->thumbMaxWidth = C('images_size.width'); 
        //设置缩略图最大高度 
        $upload->thumbMaxHeight = C('images_size.height'); 
        //设置上传文件规则 
        $upload->saveRule = 'uniqid';
		//存在相同的文件，进行覆盖
		$upload->uploadReplace = true;
        //删除原图 
        $upload->thumbRemoveOrigin = true; 
		if(!$upload->upload()) {// 上传错误提示错误信息
			$resinfo['err']=$upload->getErrorMsg();
			$this->ajaxReturn(0,$resinfo['err']);
		}else{
			// 上传成功 获取上传文件信息
			$info =  $upload->getUploadFileInfo();
			$image='m_'.$info[0]['savename'];
			$resinfo['thumb']='/data/upload/card/'.$openid.'/'.$image;//获取上传的缩略图
			if($info[0]['size']>1048576){
				unlink('.'.$resinfo['thumb']); //删除缩略图
				$this->ajaxReturn(0,'图片大小不能超过1M');
			}
			$url="http://www.wechatw.com/rc.php?k="."http://".$_SERVER['HTTP_HOST'].$resinfo['thumb'];
			$res=file_get_contents($url);
			
			list($str, $end) = split('.com/',$res);
			$rs=substr($end,0,1);
			if($types=='1'){
				$flag='g';
				$msg='请上传群二维码';
			}else{
				$flag='r';
				$msg='请上传个人二维码';
			}
			if ($rs == $flag) {
                $realpath=WEB_ROOT.$resinfo['thumb'];
                if(file_exists($realpath)){
                    Vendor('oss.alioss');
                    $oss_sdk_service = new ALIOSS();
                    $oss_sdk_service->set_debug_mode(FALSE);
                    $buckets=$oss_sdk_service->list_bucket();
                    if($buckets->body!=''){
                        $s=$this->explain_xml($buckets->body);
                        if($s){
                            $bucket=$s->Buckets->Bucket[0]->Name;
                            $location=$s->Buckets->Bucket[0]->Location;
                            $thumb_path='data/upload/card/'.$openid.'/'.$image;//缩略图
                            $header='http://'.$bucket.'.'.$location.'.aliyuncs.com';
                            $res=$oss_sdk_service->upload_file_by_file($bucket,$thumb_path,WEB_ROOT.$resinfo['thumb']);
                            $re = $res->header;
                            if ($re['_info']['http_code'] == '200') {
                                unlink(WEB_ROOT.$resinfo['thumb']);
                                rmdir(WEB_ROOT.'/data/upload/card/'.$openid);
                            }
                        }
                    }
                    $db = array(
                        'flag' => $rs . '_image',
                        'admin_id' => 0,
                        'username' => $_SESSION['user']['openid'],
                        'type' => $info[0]['extension'],
                        'size' => $info[0]['size'],
                        'file_name' => $image,
                        'module_name' => MODULE_NAME,
                    );
                    $this->_upload_field($db);
                    $resinfo['msg']=$header.$resinfo['thumb'];
                    $this->ajaxReturn(1, '上传成功', $resinfo);
                }else{
                    $this->ajaxReturn(0, '二维码缩略图发生错误了');
                }
            }else {
                unlink('.' . $resinfo['thumb']); //删除缩略图
                $this->ajaxReturn(0, $msg);
            }   
		}
		exit();
	}
	private function explain_xml($body){
        $dom = new DOMDocument;
        $dom->loadXML($body);
        if (!$dom) {
            return NULL;
        }
        $s = simplexml_import_dom($dom);
        return $s;
    }
	//通过路径上传文件
	public function upload_by_file($obj,$save,$pic,$resinfo){
		$bucket = 'weiyou';
		//缩略图
		$object = $save;	
		$file_path = "/data/www/html/www.wechatw.com/".$pic;
		$response = $obj->upload_file_by_file($bucket,$object,$file_path);
		
		//大图
		$object = str_replace('m_','',$save);	
		$file_path = "/data/www/html/www.wechatw.com/".str_replace('m_','',$pic);
		$response = $obj->upload_file_by_file($bucket,$object,$file_path);
		//$this->_format($response);
		$re = $response->header;
		if($re['_info']['http_code']=='200'){
			$resinfo['msg']=str_replace("http://oss.aliyuncs.com/weiyou/", "http://img.wechatw.com/", $resinfo['msg']);
			$this->ajaxReturn(1,'上传成功',$resinfo);
		}
	}
	##检索发布
	public function search(){
		$keyword=I('name');
		$where['name']=array("like","%".$keyword."%");
		$where['status']=1;
		$card = $this->_card_mod; 
		import('ORG.Util.Page');
		$count      = $card->where($where)->count();
		$Page       = new Page($count,10);
		$orderid=array('orderid'=>'desc','uptime'=>'desc','time'=>'desc');
		$list = $card->where($where)->order($orderid)->limit($Page->firstRow.','.$Page->listRows)->select();
		$Page->setConfig('prev', '<button data-theme="c" data-ajax="false">上一页</button>');//上一页
        $Page->setConfig('next', '<button data-theme="c" data-ajax="false">下一页</button>');//下一页
		$Page->setConfig('theme', '%upPage% %downPage%');//只显示上下页选项
		$show       = $Page->show();
		$this->assign('list',$list);
		$this->assign('page',$show);
		$this->display();
	}
	##删除
	public function delete(){
		$id=I('id');
		$card=M('card')->where(array('id'=>$id))->find();
		unlink($card['img']);
		unlink($card['thumb']);
		if(M('card')->where(array('id'=>$id))->delete()){
			IS_AJAX&&$this->ajaxReturn(1, '删除成功');die();
		}else{
			IS_AJAX&&$this->ajaxReturn(0, '删除失败');die();
		}
	
	}	
	##获取城市信息
	public function getcity(){
        if(IS_AJAX){
            usleep(1000);
            $data=array('data'=>'','message'=>'','status'=>0);
            $prov=$_POST['prov']+0;
            $area=M('area');
            $province=$area->where(array('id'=>$prov,'leveltype'=>1))->find();
            if(empty($province)){
                 $data['message']='省份不存在';
                 echo json_encode($data);
                 exit();
            }
            $citys=$area->where(array('parentid'=>$province['id']))->select(array('field'=>'id,shortname'));
            if(empty($citys)){
                 $data['message']='城市不存在';
                 echo json_encode($data);
                 exit();
            }
            $str='';
            foreach($citys as $v){
                 $str.='<option value="'.$v['id'].'">'.$v['shortname'].'</option>';
            }
            $data['data']=$str;
            $data['status']=1;
            echo json_encode($data);
            exit();
        }
	}
	
}
?>
