//2017年金手掌后端运营管理系统  
 //郭振兴 create后端核心类
(function(window){
    function gold(){

    }
    gold.prototype={
    	  openwin:function(url){
                 try{
                       window.location=url
                 }
                 catch(error){

                 }
    	  },
    	  exit_system:function(url){
               sessionStorage.userid==''
               window.location=url
    	  },
    	  //工具类实现create数据库
    	  create_model:function(el,data,methods){
    	      var mainvuew=new Vue({
    	          el:el,
    	          data:data,
    	          methods:methods  	
    	      })	
    	      return this
    	  }

    };
   window.gold=new gold
})(window)
