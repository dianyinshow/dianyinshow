$(function(){
	$('.Use-item-list').on("click",function(){
		var index=$(this).index()-1
		// console.log($('.Use-item-list').length)
		$('.Use-item-list').removeClass('li-borderb')
		$(this).addClass('li-borderb')
		console.log(index)
		$('.itemtab').removeClass('itemtabblock');
		$('.itemtab').eq(index).addClass('itemtabblock')
	})
})