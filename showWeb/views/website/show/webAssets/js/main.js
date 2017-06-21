(function(window){
	function glod(){

	}
	glod.prototype={
		init:function(el,data,methods){
			var minvue=new Vue({
				el:el,
				data:data,
				methods:methods

			})
		}
	}
	window.glods=new glod;
})(window)