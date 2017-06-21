(function(window){
   function gold(){

     }
     gold.prototype={
            init:function(){
               window.onload=function(){
                var el='#app'
                var data={
                    imgcls:'imgcls'

                }
                var methods={

                }
                  change(0)
                  var swiper = new Swiper('.swiper-normal', {
                        pagination: '.swiper-pagination',
                        loop: true
                    });
                 //首页菜单增加交互点
               

            }
                console.log(document.getElementById("banner"));
              // document.getElementById("banner").style.height='400px';
              // document.getElementById("banner").style.width=window.innerWidth/2+'px';
              // document.getElementById("banner").style.marginTop='-30px';

            }
     }

     window.gold=new  gold();

})(window)

 function change(index){
     // alert(index)
      var meymenu=document.getElementsByName("mymenu");
      //alert(meymenu)
      for (var i=0;i<meymenu.length;i++){
        meymenu[i].classname='hw-menu'
      }
     // meymenu[index].classname='hmenuactive'

  }

