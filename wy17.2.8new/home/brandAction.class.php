<?php
/* 
*货源页面 @author Li Pangpang 2017/1/6 14:41
*/
class brandAction extends frontendAction
{
    public function _initialize() { 
        parent::_initialize();   
        $this->_init_users();
        $this->_mod = D('brand');
        $this->_mod_user = D('user');
        $this->uploadModel = D('upload');   
    }

    public function index(){
        $p = I('get.p');
        $page = isset($p)?$p:1;
        $count = $this->_mod->where('status = 2')->count();
        import('ORG.Util.Pagenew2');
        $Page = new Pagenew2($count, 10);
        ##分页
        $list = $this->_mod->limit(10)->where(array('status'=>2))->order('uptime desc')->page($page)->select();
        foreach ($list as $k => $v) {
            $list[$k]['thumb'] = $this->_mod_user->where(array('openid'=>$v['openid']))->getField('thumb');
            $pic = explode(',', $v['introimg']);
            $list[$k]['pic1'] = $this->getImgPathInfo($pic[0], $v['openid']);
            $list[$k]['mpic1'] = $this->getImgPathInfo($pic[0], $v['openid'], 'm_');
            $list[$k]['pic2'] = $this->getImgPathInfo($pic[1], $v['openid']);
            $list[$k]['mpic2'] = $this->getImgPathInfo($pic[1], $v['openid'], 'm_');
            $list[$k]['pic3'] = $this->getImgPathInfo($pic[2], $v['openid']);
            $list[$k]['mpic3'] = $this->getImgPathInfo($pic[2], $v['openid'], 'm_');
        }
        // echo '<pre>';var_dump($list);exit;
        // $list = $this->_mod->limit(($page*10).',10')->select();
        $Page->setConfig('theme', '%upPage% <p>第<span>%nowPage%</span>页</p> %downPage%');
        $show = $Page->show(); 
        // echo '<pre>';var_dump($show);exit;
        $this->assign('list', $list);
        $this->assign('page', $show);
        $this->display();
    }
    
    ##货源详细页面
    public function detail(){
        $id = I('get.id');
        if (!$id) {
            $this->error('参数错误');die();
        }
        $info = $this->_mod->where(array('id'=>$id))->find();
        $pic = explode(',', $info['introimg']);
        $info['pic1'] = $this->getImgPathInfo($pic[0], $info['openid']);
        $info['pic2'] = $this->getImgPathInfo($pic[1], $info['openid']);
        $info['pic3'] = $this->getImgPathInfo($pic[2], $info['openid']);
        $info['code'] = $this->getImgPathInfo($info['codeimg'], $info['openid']);
        
        $this->assign('info', $info);
        $this->display();
    }

    ##发布页面
    public function publish(){
        if($_SESSION['user']['openid']==''){
            $this->ajaxReturn(0,'非法请求');
        }
        $openid=$_SESSION['user']['openid'];
        // $this->check_insert($openid);
        // $user = $this->_mod_user->where(array('openid'=>$openid))->find();
        // $time = time();
        // // if ( ($user['role_id'] == 2) && ($user['brand_use_end_time'] > $time) ){
        // if (true) {
            $map = array();
            $map['openid'] = $openid;
            $map['status'] = array('neq', 3);
            $brand = $this->_mod->where($map)->find();
            if ($brand) {
                $brand['fname'] = $brand['name'];
                $brand['fdetail'] = $brand['content'];
                $pic = explode(',', $brand['introimg']);
                $brand['uppics1'] = $this->getImgPathInfo($pic[0], $openid);
                $brand['uppics2'] = $this->getImgPathInfo($pic[1], $openid);
                $brand['uppics3'] = $this->getImgPathInfo($pic[2], $openid);
                $brand['qcode'] = $this->getImgPathInfo($brand['codeimg'], $openid);
                $this->assign('info', $brand);
            }
            $this->assign('openid', $openid);
        // }else{
        //     // $this->error('您暂无权限发布货源信息');
        //     // $this->ajaxReturn(0, '您没有发布权限');
        //     $this->error('您没有发布权限');die();
        // }
        $this->display();
    }

    ##发布提交页面
    public function insert(){ 
        if($_SESSION['user']['openid']==''){
            $this->ajaxReturn(0,'非法请求');
        }
        $openid=$_SESSION['user']['openid'];
        //检测发布权限
        $this->check_insert();
        $introimg = array_filter(array(I('post.uppics1'), I('post.uppics2'), I('post.uppics3')));
        $data = array();
        $data['name']     = preg_replace( "@<script(.*?)</script>@is", "", I('post.fname') );
        $data['content']  = preg_replace( "@<script(.*?)</script>@is", "", I('post.fdetail') );
        $data['codeimg']  = array_pop( explode('/', I('post.qcode')) );
        $data['introimg'] = implode( ',' ,$introimg );
        $data['weixin']   = $this->_mod_user->where(array('openid'=>$openid))->getField('weixin');
        $data['openid']   = $openid;

        if($this->check_badword($data['name']) || $this->check_badword($data['name'])){
            $this->ajaxReturn(0, '标题或者内容中含有敏感内容');
        }
        //检测又无发布
        //有无发布：1有、2无，1有无更新，1-1有：重新提交审核，1-2无：刷新时间重新发布，2直接添加发布审核
        $publish = $this->_mod->where(array('openid'=>$openid))->find();
        if ($publish) {
            //判断发布时间间隔
            $time = time();
            if ( $time - $publish['uptime'] < 5*60) {
              $this->ajaxReturn(0, '您的发布太频繁了，每间隔5分钟刷新一次，请稍后再试！');
            }
            //检测发布内容是否更新
            $update = $this->_mod->where($data)->find();
            if ($update) {
                //无更新刷新时间
                $data1['uptime'] = time();
                $res = $this->_mod->where($data)->save($data1);
            }else{
                //有更新重新审核
                $data['uptime']  = time();
                $data['status']= 1;
                $res = $this->_mod->where(array('openid'=>$openid))->save($data);
            }
            $url = U('brand/index');
        }else{
            //无发布直接添加审核
            $data['time'] = time();
            $res = $this->_mod->add($data);            
            $url = U('brand/publish');
        }        
        if ($res) {
            $this->ajaxReturn(1, '发布成功', $url);
        } else {
            $this->ajaxReturn(0, '发布失败');
        }
    }

    ##图片上传
    public function upload(){
        if($_SESSION['user']['openid']==''){
            $this->ajaxReturn(0,'非法请求');
        }
        $openid=$_SESSION['user']['openid'];
        //检测发布权限
        $this->check_insert();
        //获取上传类别
        $status = I('get.status');
        //准备上传返回的结果
        $resinfo = array("err"=>"","msg"=>"");
        import('ORG.Net.UploadFile');
        $upload = new UploadFile();// 实例化上传类
        $allow_max = C('attr_allow_size'); //读取配置 设置附件上传大小
        $allow_exts = explode(',', C('attr_allow_exts')); //读取配置 设置附件上传类型
        $allow_max && $upload->maxSize = $allow_max * 1024;   //文件大小限制
        $allow_exts && $upload->allowExts = $allow_exts;  //文件类型限制
        $upload->savePath =  './data/upload/brand/'.$openid.'/';// 设置附件上传目录
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
        if ($status == 2) {
            $upload->thumbRemoveOrigin = true; 
        }else{
            $upload->thumbRemoveOrigin = false; 
        }
        // 上传错误提示错误信息
        if(!$upload->upload()) {
            $resinfo['err']=$upload->getErrorMsg();
            $this->ajaxReturn(0,$resinfo['err']);
        }else{
            // 上传成功 获取上传文件信息
            $info =  $upload->getUploadFileInfo();
            if ($status == 2)
                $image='m_'.$info[0]['savename'];
            else
                $image=$info[0]['savename'];
            $resinfo['thumb']='/data/upload/brand/'.$openid.'/'.$image;//获取上传的缩略图
            $resinfo['thumb1']='/data/upload/brand/'.$openid.'/'.'m_'.$image;//获取上传的原图
            if($info[0]['size']>1048576){
                unlink('.'.$resinfo['thumb']); //删除缩略图
                $this->ajaxReturn(0,'图片大小不能超过1M');
            }
            // 检测二维码
            $url="http://www.wechatw.com/rc.php?k="."http://".$_SERVER['HTTP_HOST'].$resinfo['thumb'];
            $res=file_get_contents($url);

            list($str, $end) = split('.com/',$res);
            $rs=substr($end,0,1);

            if ($status == 2) {
                //检测是否是个人二维码
                if ($rs != 'r') {
                    unlink('.' . $resinfo['thumb']); //删除缩略图
                    $this->ajaxReturn(0, '请上传个人二维码');
                }
            }else{
                //三张大图不能上传带二维码图片
                if ($rs == 'r' || $rs == 'g')  {
                    unlink('.' . $resinfo['thumb']); //删除缩略图
                    unlink('.' . $resinfo['thumb1']); //删除原图
                    $this->ajaxReturn(0, '此处不能上传二维码');
                }
            }
        $this->ajaxReturn(1, '上传成功', $resinfo['thumb']);
        }
        exit();
    }

    ##检查上传发布权限
    public function check_insert(){
        $openid=session('user.openid');
        $user = $this->_mod_user->where(array('openid'=>$openid))->find();
        $url = U('user/vip');
        // if ($user['role_id'] == 2) {
        //     $nowTime = time();
        //     $map = array();
        //     $map['openid'] = $openid;
        //     $map['cash_fee'] = array('gt', 9900);
        //     $yearVip = M('wxpay')->where($map)->order('add_time desc')->find();
        //     if ($yearVip) {
        //         $endTime = strtotime('+1 year', $yearVip['add_time']);
        //     }
        //     if ( !($user['brand_use_end_time'] > $nowTime) && !($endTime > $nowTime)){
        //         $this->ajaxReturn(0, '您不是付费“VIP年会员”，没有权限执行此操作；点击“确定”购买“VIP年会员”，发布“货源”招代理，百万微商首选你!', $url);
        //     }
        // }else{
        if ($user['role_id'] != 2) {
            $this->ajaxReturn(0, '您不是“VIP会员”，没有权限执行此操作；点击“确定”购买“VIP会员”，发布“货源”招代理，百万微商首选你!', $url);
        }
    }

    ##获取图片上传路径
    public function getImgPathInfo($pic, $openid, $m=''){
        if (!empty($pic)) {
            return '/data/upload/brand/'.$openid.'/'.$m.$pic;
        }
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
}