/**
 * Created by lk on 2017/5/16.
 */

$(function () {
	$('.editName').on('click',function () {

		if($('.showInput').css('display','none')){
			$('.showInput').css('display','block');
			$('.editName').css('display','none');
			$('.eName').css('display','none');

		}
	});
	$('.am-btn-botton').on('click',function () {
		if($('.am-main-popup').css('display','none')){
			$('.am-conin-h').css('z-index','-1')
			$('.am-main-popup').css('display','block');
			$('.pop').css('display','block');


		}
	});
	$('.popup-close').on('click',function () {
		$('.am-main-popup').css('display','none');
		$('.pop').css('display','none');
		$('.am-conin-h').css('z-index','10');
		$('.exchange-xd').css('display','none');
	});
	$('.my-wallet-nav li').on('click',function () {
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	$('.tb-recharge li').on('click',function () {
		$(this).addClass("curr").siblings().removeClass("curr");
	});
	$('.add-bank') .on('click',function () {
		if($('.add-bank-card').css('display','none')){
			$('.add-bank-card').css('display','block');

		}
	});
	$('.adc-close').on('click',function () {
		$('.add-bank-card').css('display','none');
	});
	$('.btn-cash') .on('click',function () {
		if($('.exchange-xd').css('display','none')){
			$('.exchange-xd').css('display','block');

		}
	});

	$('.exchange-number li').on('click',function () {
		$(this).addClass("cur-li").siblings().removeClass("cur-li");
	});


	$('.tr-mun li').on('click',function () {
		$(this).addClass("cur-a").siblings().removeClass("cur-a");
	});
	
	$('.xl').on('click',function () {
		$('.box-ts').toggle();
	});

	$('.zfb-pay-btn').on('click',function () {
		$('.wx-pay-btn i').removeClass("cur-li");
		if($('i').hasClass("c-l")){
			$('.zfb-pay-btn i').addClass("cur-li");
		};
	});

	$('.wx-pay-btn').on('click',function () {
		$('.zfb-pay-btn i').removeClass("cur-li");
		if($('i').hasClass("c-l")){
			$('.wx-pay-btn i').addClass("cur-li");
		};
	});
	$('.btn-wxb').on('click',function (){
		$(this).css({
			'background-color': '#ea5147',
			'color': '#FFFFFF'
		});
		if($('.ac-ts').css('display','none')){
			$('.ac-ts').css('display','block')
		}
	});

});



/*关闭弹窗*/
$(function () {
	$('.box-ts').on('click',function () {
		var modifyPhtonpage='<div class="modify-frame">'+
			'<div class="modify-pass-header"> 解除绑定'+
			'<span class="close-modify"></span>'+
			'</div>'+
			'<div class="modify-cont-h">'+
			'<div class="modify-contin-h">'+
			'<ul>'+
			'<li>'+
			'<span>手机验证：</span>'+
			'<div class="phont-span">'+
			'<span>13993787477</span>'+
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
	})
	$('.modifypass-page').on('click',function(ev) {
		if ($(event.target).closest('.close-modify').attr('class')) {
			$('.modifypass-page').hide().empty()
		}
	});
});
/*解除绑定成功*/
/*
$(function () {
	$('.box-ts').on('click',function () {
		var modifyPhtonpage='<div class="modify-frame">'+
			'<div class="modify-pass-header"> 解除绑定'+
			'<span class="close-modify"></span>'+
			'</div>'+
			'<div class="modify-cont-h">'+
			'<div class="modify-contin-h">'+
			'<div class="modify-contin-img">' +
			'</div>'+
			'<div class="modify-contin-span">' +
			'<span>身份验证成功，已解绑尾号1234的银行卡！</span>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'
		$('.modifypass-page').show().append(modifyPhtonpage);
	})
	$('.modifypass-page').on('click',function(ev) {
		if ($(event.target).closest('.close-modify').attr('class')) {
			$('.modifypass-page').hide().empty()
		}
	});
});*/
