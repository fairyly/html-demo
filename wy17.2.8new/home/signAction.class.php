<?php
/* 
*ǩ��
*/
class signAction extends frontendAction
{
    public function _initialize() { 
        parent::_initialize();   
        $this->_init_users();
        $this->_mod = D('sign');
        $this->_add_mod = D('add_times');
        $this->_user_mod = D('user');
        $this->_card_mod = D('card');
        $this->_score_mod = D('score_record');
        $this->display('404');exit;
    }

    public function index(){
        $openid=session('user.openid');
        if(!$openid){
                $this->_init_users();
                echo '�Ƿ�����';die();
        }else{
            $where['openid']=$openid;
            $user=D('user')->where($where)->find();
            if(empty($user)){
                 unset($_SESSION['user']);
                 header('Location:http://'.$_SERVER['HTTP_HOST']);
                 exit();
            }
        }
        $this->display();
    }

    //ǩ��
    public function sign(){
        $time = time();
        $openid=session('user.openid');
        if (empty($openid)) {
            unset($_SESSION['user']);
            header('Location:http://'.$_SERVER['HTTP_HOST']);
            exit();
        }
        $signDayData[date('j', $time)] = $time;             //����ǩ��ʱ��
        $signMonData[date('n', $time)] = $signDayData;      //����ǩ����ӵ�����
        $signYearData[date('Y', $time)] = $signMonData;     //����ǩ����ӵ�����
        $exist = $this->_mod->where(array('openid'=>$openid))->find();
        $signData = $this->objToArr(json_decode($exist['data']));
        $lastSignTime = $exist['last_sign_time'];
        
        if ($exist) {
            if (!empty($signData[date('Y', $time)][date('n', $time)][date('j', $time)])) {  //���������Ƿ����
                echo json_encode(array('status'=>0, 'msg'=>L('operation_failure')));
            }else{
                if (date('Y', $time) != date('Y', $lastSignTime)) {
                    //����
                    $signData1 = $signData + $signYearData;
                    $data['data'] = json_encode($signData1);
                }elseif (date('n', $time) != date('n', $lastSignTime)) {
                    //����
                    $signData1 = $signData[date('Y', $time)] + $signMonData;
                    $signData[date('Y', $time)] = $signData1;
                    $data['data'] = json_encode($signData);
                }else{
                    $signData1 = $signData[date('Y', $time)][date('n', $time)] + $signDayData;
                    $signData[date('Y', $time)][date('n', $time)] = $signData1;
                    $data['data'] = json_encode($signData);
                }
                if (date('j', $lastSignTime+(24*60*60)) == date('j', $time)) {
                    $data['con_days'] = $exist['con_days']+1;  //����ǩ��
                    $data['last_sign_time'] = $time;
                    $this->_user_mod->where(array('openid'=>$openid))->setInc('score', 20);
                    $res = $this->_mod->where(array('openid'=>$openid))->save($data);
                    if ($res) {
                        echo json_encode(array('status'=>1, 'msg'=>L('operation_success'), 'data'=>20));
                    }
                }else{
                    $data['con_days'] = 1;  //©ǩ                                
                    $data['last_sign_time'] = $time;
                    $this->_user_mod->where(array('openid'=>$openid))->setInc('score', 10);
                    $res = $this->_mod->where(array('openid'=>$openid))->save($data);
                    if ($res) {
                        echo json_encode(array('status'=>1, 'msg'=>L('operation_success'), 'data'=>10));
                    }
                }
            }
        }else{
            $data['openid'] = $openid;
            $data['data'] = json_encode($signYearData);
            $data['con_days'] = 1;
            $data['last_sign_time'] = $time;
            $this->_user_mod->where(array('openid'=>$openid))->setInc('score', 10);
            $res = $this->_mod->add($data);
            if ($res) {
                echo json_encode(array('status'=>1, 'msg'=>L('operation_success'), 'data'=>10));
            }
        }
    }

    //��ȡǩ������
    public function getSignData(){
        $year = I('post.y');
        $month = I('post.m');
        $openid=session('user.openid');
        $days = $this->_mod->where(array('openid'=>$openid))->getField('con_days');   //����
        $score = $this->_user_mod->where(array('openid'=>$openid))->getField('score');//����
        $info['score'] = empty($score)?0:$score;
        $info['days'] = empty($days)?0:$days;
        $data = $this->_mod->where(array('openid'=>$openid))->getField('data');
        $signData = $this->objToArr(json_decode($data));
        if ($signData[date('Y', time())][date('n', time())][date('j', time())])
            $info['status'] = 1;
        else
            $info['status'] = 0;
        $data1 = $signData[$year][$month];
        $data1 = array_keys($data1);
        $i = 0;
        foreach ($data1 as $val) {
            $signDay[$i]['signDay'] = $val;
            $i++;
        }
        $array[0] = $info;
        $array[1] = $signDay; 
        echo json_encode($array);
    }

    //�Ӻ��ѻ�ȡ����
    public function addFriendScore(){
        $openid=session('user.openid');
        $weixin = htmlspecialchars(trim(I('post.weixin')));
        $getOpenid = htmlspecialchars(trim(I('post.openid')));
        if ($openid&&$weixin) {
            $role_id = $this->_user_mod->where(array('openid'=>$getOpenid))->getField('role_id');
            $cardOpenid = $this->_card_mod->where(array('weixin'=>$weixin))->field('openid')->select();
            foreach ($cardOpenid as $value) {
                $card_openid[] = $value['openid'];
            }
            if ($role_id == 3 && in_array($getOpenid, $card_openid)) {
                $this->countAddTimes($weixin, $getOpenid);
            }
            $exist = $this->_mod->where(array('openid'=>$openid))->find();
            if (!$exist) {
                $data['openid'] = $openid;
                $data['add_data'] = $weixin;
                $data['add_times'] = 1;
                $data['last_add_time'] = time();
                $this->_user_mod->where(array('openid'=>$openid))->setInc('score', 2);
                $res = $this->_mod->add($data);
            }else{
                $add_data = explode(',', $exist['add_data']);
                if (!in_array($weixin, $add_data)) {
                    $lastDay = date('j', $exist['last_add_time']);
                    $nowDay = date('j', time());
                    $diffTime = time()-$exist['last_add_time'];
                    $addData = empty($exist['add_data'])?'':$exist['add_data'].',';
                    if (($lastDay == $nowDay) && ($diffTime<24*60*60)) {
                        if ($exist['add_times'] < 10) {
                            $data['add_data'] = $addData.$weixin;
                            $data['add_times'] = $exist['add_times'] + 1;
                            $data['last_add_time'] = time();
                            $this->_user_mod->where(array('openid'=>$openid))->setInc('score', 2);
                            $res = $this->_mod->where(array('openid'=>$openid))->save($data);
                        }
                    }else{
                        $data['add_data'] = $addData.$weixin;
                        $data['add_times'] = 1;
                        $data['last_add_time'] = time();
                        $this->_user_mod->where(array('openid'=>$openid))->setInc('score', 2);
                        $res = $this->_mod->where(array('openid'=>$openid))->save($data);
                    }
                }
            }
        }
    }

    //ͳ�ƼӺ��Ѵ���
    public function countAddTimes($weixin, $openid){
        $map['weixin'] = $weixin;
        $map['openid'] = $openid;
        $map['year_date'] = date('Y', time());
        $map['month_date'] = date('n', time());
        $map['day_date'] = date('j', time());
        $exist = $this->_add_mod->where($map)->find();

        if ($exist) {
            $exist['times'] += 1;
            $this->_add_mod->save($exist);
        }else{
            $map['times'] = 1;
            $map['time'] = time();
            $this->_add_mod->add($map);
        }
    }

    //���ֶһ�VIP
    public function scoreExchangeVIP(){
        $openid=session('user.openid');
        if ($openid) {
            $user = $this->_user_mod->where(array('openid'=>$openid))->find();
            if ($user['role_id'] == 2) {
                echo json_encode(array('status'=>0, 'msg'=>L('operation_failure'), 'data'=>0));//VIP�û�
                exit;
            }
            if ($user['score']<600) {
                echo json_encode(array('status'=>0, 'msg'=>L('operation_failure'), 'data'=>2));//���ֲ���
                exit;
            }
            $data['role_id'] = 2;
            $data['start_time'] = time();
            $data['end_time'] = strtotime(date("Y-m-d H:i:s",strtotime("+1 month",time())));//1����VIP
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
                echo json_encode(array('status'=>1, 'msg'=>L('operation_success'), 'data'=>1));//�ɹ��һ�
            }
        }else{
            echo json_encode(array('status'=>1, '', 'data'=>3));//��������
        }

    }

    //objתarray
    protected function objToArr($obj){
        $ret = array();
        foreach($obj as $key =>$value){
            if(gettype($value) == 'array' || gettype($value) == 'object'){
                $ret[$key] = $this->objToArr($value);
            }
            else{
                $ret[$key] = $value;
            }
        }
        return $ret;
    }
}