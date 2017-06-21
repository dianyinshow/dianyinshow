$(function(){
	$('.checkeditem').click(function(){
		console.log('/')
		// $(this).toggleClass('checkeditem1');
		$(this).toggleClass('checkeditem1');

	})
	$('.del').click(function(){
		$(this).parents('li').remove();
	})

})