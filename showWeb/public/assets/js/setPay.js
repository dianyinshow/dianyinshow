/**
 * Created by lk on 2017/6/23.
 */
$(function () {
	$('.box-btn').on('click',function () {
		var modifyPhtonpage='<div class="modify-frame">'+
			'<div class="modify-pass-header"> 支付设置-身份验证'+
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
			'<button class="btn-pay">获取验证码</button>'+
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
			'<span class="send-seccess"><img src="assets/img/seccess.png" alt=""></span>'+
			'发送成功'+
			'</div>'+
			'</div>'+
			'<div class="canle-preserve">'+
			'<span class="preserve-pass am-fr pass-action">下一步</span>'+
			'<span class="canle-pass am-fr">取消</span>'+
			'</div>'+
			'</div>'+
			'</div>'
		$('.modifypass-page').show().append(modifyPhtonpage);
		$('.btn-pay').click(function () {
			$(this).css({
				'border':'1px solid #dfdfdf',
				'background':'#f8f8f8',
				'color':'#666666'
			});
		});

		$('.pass-action').on('click',function () {
			var modifyPasspage='<div class="modify-frame">'+
				'<div class="modify-pass-header">'+
				'修改登录密码'+
				'<span class="close-modify"></span>'+
				'</div>'+
				'<div class="modify-cont-h">'+
				'<div class="modify-contin-h">'+
				'<ul>'+
				'<li>'+
				'<span>密码：</span>'+
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
				'<span class="cp-over am-fr pass-action ">完成</span>'+
				'<span class="canle-pass am-fr">取消</span>'+
				'</div>'+
				'</div>'+
				'</div>'
			$('.modifypass-page').show().append(modifyPasspage);
			$('.cp-over').on('click',function () {
				var modifyPasspage='<div class="modify-frame">'+
					'<div class="modify-pass-header">'+
					'支付设置'+
					'<span class="close-modify"></span>'+
					'</div>'+
					'<div class="modify-cont-h">'+
					'<div class="modify-contin-h">'+
					'<div class="modify-ch">' +
					'<img src="assets/img/submit-ok.png" alt="">' +
					'<button class="go-pay">去支付</button>' +
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>'
				$('.modifypass-page').show().append(modifyPasspage);
			});
		});

	});

	$('.modifypass-page').on('click',function(ev) {
		if ($(event.target).closest('.close-modify').attr('class')) {
			$('.modifypass-page').hide().empty()
		}
	});

});
