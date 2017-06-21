var jquery = {
	close:function(element1,element2) {
				element1.onclick = function() {
					element2.style.display = "none";
				}
			},
	show:function(ele) {//显示
		ele.style.display = "block";
	},
	clickOpen:function(ele1,ele2,number) {
		for(var i=0;i<ele1.length;i++) {
			ele1[i].setAttribute('index',i);
			ele1[i].onclick = function() {
				var num = this.getAttribute('index');
				if(number == num) {
					ele2.style.display = "block";
				}
			}
 		}
	},
	getLeft:function(ele) {//获取距离父元素左边的距离
		return ele.offsetLeft;
	},
	getTop:function(ele) {//获取距离父元素顶部的距离
		return ele.offsetTop;
	},
	getWidth:function(ele) {//获取元素本身的宽度
		return ele.clientWidth;
	},
	getHeight:function(ele) {//获取元素本身的高度
		return ele.clientHeight;
	},
	addClass:function(ele,newClass) {//添加样式
		ele.className += " " + newClass;
	},
	removeClass:function(ele,oldClass) {//移除样式
		var reg = new RegExp('(\\s|^)' + oldClass + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
	},
	mouseOver:function(ele1,newClass) {
		ele1.onMouseOver = function() {
			jquery.addClass(ele1,newclass);
		}
	}
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
// 底部栏点击事件
function bottomClick() {
	var footer = document.getElementsByClassName('footer')[0];
	var ulBottom = document.getElementsByClassName('bottom-aside')[0];
	var shareBox = document.getElementsByClassName('share-box')[0];
	var shareMore = document.getElementsByClassName('share-more')[0];

	var cancel = document.getElementsByClassName('btncancel')[0];
	var cancel1 = document.getElementsByClassName('btncancel1')[0];
	
	var lis = ulBottom.getElementsByTagName('li');
	for(var i=0;i<lis.length;i++) {
		lis[i].setAttribute('index',i);
		lis[i].onclick = function() {
			var num = this.getAttribute('index');
			if(num == 0) {
				H.openWin('redpacket','redpacket.html');
			}
			if(num == 2) {
				shareBox.style.display = "block";
			}
			if(num == 3) {
				shareMore.style.display = "block";
			}
		}
	}
	jquery.close(cancel,shareBox);
	jquery.close(cancel1,shareMore);
}

//红包点击改变红包类型
function changeClass(){
	var spans = document.getElementsByClassName('change-class')[0];
	var changeName = document.getElementsByClassName('change-name')[0];
	var changeMoney = document.getElementsByClassName('change-money')[0];
	spans.onclick = function() {
		var inner = spans.innerHTML;
		if(inner == "改为拼手气红包") {
			changeMoney.innerHTML = "总金额"
			changeName.innerHTML = "拼手气"
			spans.innerHTML = "改为普通红包";
		}else if(inner == "改为普通红包") {
			changeMoney.innerHTML = "单个金额"
			changeName.innerHTML = "普通"
			spans.innerHTML = "改为拼手气红包";
		}
		
	}

}
