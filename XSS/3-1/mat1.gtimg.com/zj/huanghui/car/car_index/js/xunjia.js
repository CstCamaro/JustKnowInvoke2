function checkVal(){
  ask_name = $(".name").val()
  ask_tel = $(".tel").val()
  ask_car_type = $(".car_type").val()
  if(!ask_name){
    layer.alert('请输入姓名')
    return false
  }
  if (!valTel(ask_tel)) {
    return false;
  }
  if(!ask_car_type){
    layer.alert('请输入车型')
    return false
  }
  return true
}
function valTel(val) {
  let TEL_REG = /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/; // 手机正则
  if (val) {
    if (!TEL_REG.test(val)) {
      layer.alert('请输入正确的手机号')
      return false;
    }
  } else {
    layer.alert('请输入您的手机号')
    return false;
  }
  return true;
};
function reg_new(actid){
  var url = 'http://vip.zjqq.mobi/sign/submit/' + actid;
  var signSource = check_source();
  if(checkVal()){
    $('#' + actid + '_reg_button').attr('disabled', 'disabled');
    var data = {
      name:ask_name,
      mobile:ask_tel,
      wantcar: ask_car_type,
      signSource:signSource,
    }
    $.ajax({
      cache: false,
      type: "post",
      url:url,
      data:{
        id: actid,
        data: data
      },
      dataType:'json',
      error: function(request) {
        layer.alert("提交失败，请重试");
        $('#' + actid + '_reg_button').removeAttr('disabled');
      },
      success: function(res) {
        $('#' + actid + '_reg_button').removeAttr('disabled');
        console.log(res)
        if(res.msg_re == 0){
          layer.alert('提交成功')
        }else{
          layer.alert(res.result)
        }
        $(".name").val("")
        $(".tel").val("")
        $(".car_type").val("")
      }
    })
  }
}
/*判断设备来源*/
function check_source(){
  if(window.TencentNews){
          signSource = 1;		//判断是否来自腾讯客户端
      }else if(typeof WeixinJSBridge !== 'undefined'){
          signSource = 3;		//判断是否来自微信
      }/*else if(browser.versions.mobile){
          signSource = 2;		//判断是否来自手机端
      }*/else if(navigator.userAgent){
          signSource = 4;		//判断是否来自微信pc
  }else{
          signSource = 0;
      }
  return signSource;
}/*  |xGv00|c8964906ec90cd8a3ed44df4df272854 */