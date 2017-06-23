$(function(){
	// 我的消息点击编辑出现
	$('.edit-mynews').on('click',function(){
		$('.am-main-header .editvd').show();
		$('.myNews-right-edit .myNews-delall').show();
		$(this).hide()
	})
	// 全选
	$('.allcheck').on('click',function(){
		// 点击全选
		if($('.allcheck input').prop('checked')){
			$(this).find('.discheck-state').addClass('checkstate');
		}else{
			$(this).find('.discheck-state').removeClass('checkstate');
		}
		// 单选状态
		 $('.myNews-delall').find('input')
            .prop('checked', $('.allcheck').find('input').prop('checked'));
            change()
	})
	$('.myNews-delall input').on('change',function(){
       // 点击单选列表
            change()
	})
	// 点击删除列表内容
	$('.edit-del').on('click',function(){
		$('.myNews-delall input').each(function(){
        //列表状态
        var index=$(this).index()
        if($('.myNews-delall input').eq(index).prop('checked')){
            $('.myNews-delall input').eq(index).parents("li").remove();
        }
        if($('.myNews-delall input').length==0){
        	$('.allcheck').find('input').prop('checked',false)
            $('.allcheck').find('.discheck-state').removeClass('checkstate');
        }
        })
	})
	$('.edit-voer').on('click',function(){
		$('.am-main-header .editvd').hide();
		$('.myNews-right-edit .myNews-delall').hide();
		$('.edit-mynews').show()
	})
	function change(){
        var numa=0;//判断列表长度
        $('.myNews-delall input').each(function(index){
        //列表状态
            if($('.myNews-delall input').eq(index).prop('checked')){
                numa+=1
                $(this).siblings("label").addClass('myNew-del-stateall')
                $(this).parents('li').css({'background':'#fafafc'})
            }else{
            	 $(this).siblings("label").removeClass('myNew-del-stateall')
            	 $(this).parents('li').css({'background':'#fff'})
            }
        })
        //全选状态
        if(numa===$('.myNews-delall input').length){
            $('.allcheck').find('input').prop('checked',true)
            $('.allcheck').find('.discheck-state').addClass('checkstate');

        }else{
            $('.allcheck').find('input').prop('checked',false)
            $('.allcheck').find('.discheck-state').removeClass('checkstate');
        }
		  
	}
	// 继续沟通
	$('.linkup-img').on('click',function(){
		$('.myNews-item').css({'background':'#fff'});
		$('.myNews-item').find('.myNews-communicate').hide();
		$('.myNews-item').find('.myNews-datas').show()
		$(this).parents('li').css({'background':'#fafafc'});
		$(this).parents('li').find('.myNews-communicate').show();
		$(this).parents('li').find('.myNews-datas').hide()
	})
	// $('.myNews-item').on('mouseout',function(){
	// 	$(this).css({'background':'#fff'});
	// 	$(this).find('.myNews-communicate').hide();
	// 	$(this).find('.myNews-datas').show()
	// })
	$('.myNews-communicate').on('click',function(){
		
	})

	$('.my-wallet-nav li').on('click',function () {
		$(this).addClass("cur").siblings().removeClass("cur");
	})
	$('.canOrder').on('click',function(){
		$(this).parents('.Order-items').remove();
	})


	// 我的收藏点击编辑
	var collflat=false;
	$('.edit-collect').click(function(){
		collflat=!collflat
		if(collflat){
		$('.collect-list-li').find('.canlecoll').show();
		}else{
		$('.collect-list-li').find('.canlecoll').hide();
		}
	})
	// 我的收藏点击取消按钮删除
	$('.canlecoll').on('click',function(){
		$(this).parents('.collect-list-li').remove();
	})
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
 $('.close-modify').click(function(){
 	$(this).parents('.modifypass-page').hide();
 })
	})
$('.modifypass-page').on('click',function(){
	console.log('2')
	if($(this).hasClass("close-modify")){
		$('.modifypass-page').hide().empty()
		console.log('1')
	}
	
})


})