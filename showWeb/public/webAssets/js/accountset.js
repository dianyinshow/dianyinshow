$(function(){
	// 账户与设置修改密码
	$('.modifyPass').on('click',function(){
		var modifyPasspage='<div class="modify-frame">'+
		'<div class="modify-pass-header">'+
      '修改登录密码'+
      '<span class="close-modify"></span>'+ 
    '</div>'+
    '<div class="modify-cont-h">'+
      '<div class="modify-contin-h">'+
        '<ul>'+
          '<li>'+
            '<span>当前密码：</span>'+
            '<input type="text" value="请输入当前登录密码" name="nowpass">'+
            '<div class="clear"></div>'+
          '</li>'+
          '<li>'+
            '<span>新密码：</span>'+
            '<input type="text" value=“请输入新密码（字母，数字，至少6位） name="newpass">'+
            '<div class="clear"></div>'+
          '</li>'+
          '<li>'+
            '<span>重复密码：</span>'+
            '<input type="text" value="请重复密码" name="repeatpass">'+
            '<div class="clear"></div>'+
          '</li>'+
          '<div class="claer"></div>'+
        '</ul>'+
     '</div>'+
      '<div class="canle-preserve">'+
        '<span class="preserve-pass am-fr pass-action">保存</span>'+  
        '<span class="canle-pass am-fr">取消</span>'+
      '</div>'+  
    '</div>'+
  '</div>'
 $('.modifypass-page').show().append(modifyPasspage);
	})
// 更改手机
  $('.modifyPhton').on('click',function(){
    var modifyPhtonpage='<div class="modify-frame">'+
    '<div class="modify-pass-header"> 更改手机'+
      '<span class="close-modify"></span>'+ 
    '</div>'+
    '<div class="modify-cont-h">'+
      '<div class="modify-contin-h">'+
        '<ul>'+
          '<li>'+
            '<span>手机验证：</span>'+
            '<div class="phont-input">'+
              '<label>+86 <span></span></label>'+
               '<input type="text" value="请输入手机号码" name=""></div>'+
            '<div class="clear"></div>'+
          '</li>'+
          '<li>'+
            '<span>验证码：</span>'+
            '<div class="Verification">'+
              '<input type="text" value="请输入验证码" name="">'+
              '<button>获取验证码</button>'+
            '</div>'+            
            '<div class="clear"></div>'+
          '</li>'+
          '<div class="addph-tit">'+
            '<span></span>'+
            '<p>该手机号码已被其他账号绑定，换个号码试试吧</p>'+
            '<div class="clear"></div>'+
          '</div>'+
          '<div class="claer"></div>'+
        '</ul>'+
        '<div class="modify-send-secc">'+
          '<span class="send-seccess"><img src="webAssets/img/seccess.png" alt=""></span>'+
          '发送成功'+
        '</div>'+
      '</div>'+
      '<div class="canle-preserve">'+
        '<span class="preserve-pass am-fr pass-action">下一步</span> '+ 
        '<span class="canle-pass am-fr">取消</span>'+
      '</div>'+  
    '</div>'+
  '</div>'
 $('.modifypass-page').show().append(modifyPhtonpage);

  });
// 修改邮箱
$('.modifyEmail').on('click',function(){
    var modifyEmailpage='<div class="modify-frame">'+
    '<div class="modify-pass-header">'+
      '修改邮箱'+
      '<span class="close-modify"></span>'+
    '</div>'+
    '<div class="modify-cont-h">'+
      '<div class="modify-contin-h">'+
        '<ul>'+
          '<li>'+
            '<span>当前邮箱：</span>'+
            '<div>mao***@163.com</div>'+
            '<div class="clear"></div>'+
          '</li>'+
          '<li>'+
            '<span>新邮箱：</span>'+
            '<input type="text" value="请输入邮箱地址" name="newpass">'+
            '<div class="clear"></div>'+
          '</li>'+
          '<div class="claer"></div>'+
        '</ul>'+
     '</div>'+
      '<div class="canle-preserve">'+
        '<span class="preserve-pass am-fr pass-action">下一步</span>'+ 
        '<span class="canle-pass am-fr">取消</span>'+
      '</div> '+
    '</div>'+
  '</div>'+
 $('.modifypass-page').show().append(modifyEmailpage);
  });
// 添加邮箱
$('.addEmail').on('click',function(){
var addEmailpage='<div class="modify-frame">'+
    '<div class="modify-pass-header">'+
     '更改邮箱'+
      '<span class="close-modify"></span>'+
    '</div>'+
    '<div class="modify-cont-h">'+
      '<div class="validate-process">'+
          '<span class="process-step step-action">1</span> '+
          '<span class="process-course"></span>'+
          '<span class="process-step">2</span> '+
          '<span class="process-course"></span> '+
          '<span class="process-step">3</span> '+
          '<div class="clear"></div> '+
      '</div> '+ 
      '<div class="modify-contin-h">'+
        '<ul>'+
          '<li>'+
            '<span>手机验证：</span>'+
            '<div class="holdphont">'+
              '1234567890'+
            '</div>'+   
            '<div class="clear"></div>'+
          '</li>'+
          '<li>'+
            '<span>验证码：</span>'+
            '<div class="Verification">'+
              '<input type="text" value="请输入验证码" name="">'+
              '<button>获取验证码</button>'+
            '</div>'+    
            '<div class="clear"></div>'+
          '</li>'+
          '<div class="claer"></div>'+
        '</ul>'+
     '</div>'+
      '<div class="canle-preserve">'+
        '<span class="preserve-pass am-fr pass-action next-process">下一步</span>'+ 
        '<span class="canle-pass am-fr">取消</span>'+
      '</div>'+ 
    '</div>'+
  '</div>'
  $('.modifypass-page').show().append(addEmailpage);
})
// 点击关闭弹窗
var proessnum=0;
$('.modifypass-page').on('click',function(event){
  if($(event.target).closest('.close-modify').attr('class')){
    $('.modifypass-page').hide().empty()
  }
  if($(event.target).closest('.next-process').attr('class')){
    proessnum+=1;
    // $('.process-step').each(function(){
      // console.log(this)
      console.log(proessnum)
      // var index=$(this).index();
        $('.process-step').eq(1).addClass('step-action');
         $('.process-course').eq(0).addClass('step-action')
    // });
    if(proessnum==1){
      // var emails='<ul>'+
      //     '<li>'+
      //       '<span>邮箱地址：</span>'+
      //       '<input type="text" value="请输入邮箱地址" name="">'+
      //       '<div class="clear"></div>'+
      //     '</li>'+
      //     '<div class="addph-tit">'+
      //       '<span></span>'+
      //       '<p>该邮箱已被其他账号添加，换个邮箱试试吧</p>'+   
      //       '<div class="clear"></div>'+
      //     '</div>'+
      //     '<div class="claer"></div>'+
      //   '</ul> '
      var emailsend='<p class="email-e">邮件已发送到您的邮箱<span>8330248@qq.com</span>,请尽快激活</p>'
      var sentaccept='<div class="check-send">'+
        '<span class="check-accept am-fr"><a href="">立即查收邮件</a></span>'+ 
        '<span class="sendagain-e am-fr"><a href="">没收到，重新发送</a></span>'+
      '</div>'
      $('.modify-contin-h').empty();
      $('.canle-preserve').remove();
      $('.modify-contin-h').append(emailsend)
      $('.modify-contin-h').after(sentaccept)
    }
  }	
})


// $('.canle-preserve span').on('mouseout',function(){
//   // $('.canle-preserve span').removeClass('pass-action');
//   $('this').addClass('pass-action')
// })

})