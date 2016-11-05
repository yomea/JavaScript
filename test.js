//main.js
/*
window.onload = function() {
	
	var div = base.getById('test');
	var p = base.getByClassName('hello', div)[0];
	//alert(p.nodeName);
	//alert(div);
	//var div = base.getByName('hello')[0];
	
	var p = base.getByTagName('p', div)[0];
	//alert(p.tagName);
	
	addEvent(p, 'click', ah);
	
	removeEvent(p, 'click', ah);
	
	
	
	
}

function ah(e) {
		
		//alert(e.target);//ie8以下不兼容
		//alert(e.srcElement);
		var that = getTarget(e);
		
		alert(that.tagName);
	}
	*/
	
	/*
window.onload = function() {
	var box1 = $('#test').css({fontSize:"80px", color:'red'}).html("北京欢迎你");
	//var box = $('#test');
	//alert(box);
	var pp = $('+p').css("backgroundColor", "red");
	var lai = $('lai').css("backgroundColor", "yellow");
	var clazz = $('.clazz').css("color", "green");
	//alert(box instanceof Base);
	//box.css("color", "yellow");
	//pp.css("backgroundColor", "red");
	clazz.addClass('yes');
	//clazz.addClass('clazz');
	clazz.removeClass('cazz');
	//pp.animate({width:600});
	box1.addClass('heihei');
	//$().addRule(0, "body", "background-color:red;", 0).removeRule(0, 1);
	//box1.removeRule(0, 1);
	pp.addEvent('mouseover',function() {
		var obj = $(this);
		obj.animate({width:666,opacity:100}, 1);
		
	});
	pp.addEvent('mouseout',function() {
		var obj = $(this);
		obj.animate({width:300,opacity:30});
		
	});
	
	box1.addEvent('mouseover', function() {
		
		box1.animate({opacity:100});
	});
	box1.addEvent('mouseout', function() {
		
		box1.animate({opacity:30});
	});
	//alert(clazz.css('color'));
	
	//alert(pp.html());
	pp.getelByIndex(4).css({fontSize:'24px', color:'yellow'});
	//pp.getelByIndex(4).css('fontSize');
	//pp.getelByIndex(4).css('fontSize', '80px');
	
	pp.addEvent('click', function() {
		
		alert("test success!!!");
	});
	
	
}
*/
/*
window.onload = function() {
	
	$("+p").addEvent('mouseout', function() {
		alert("haha");

	});
	
	$("+p").addEvent('mouseout', function() {
		alert("hehe");

	});
	
	$("+p").addEvent('mouseover', function() {
		alert("hi");

	});
	
	$("+p").addEvent('mouseover', function() {
		alert("no");

	});
	
	//$("+p").addEvent('mouseover', test);
	//$("+p").addEvent('mouseover', test);
	$("+p").addEvent('mouseout', test);
}

function test() {
	alert("test");
	


	$(".link").addEvent('click', function(e) {

		e = e || eventWapper(window.event);
		e.preventDefault();
		
	});
	
	$(".link").addEvent('click', fn);
	
	function fn() {
		
		alert("百度一下吧！");
	}
	
	
	$(".link").removeEvent('click', fn);
	
	//var body = document.getElementsByTagName('body')[0];
	//alert(body.tagName);

	//alert(document.getElementById('screen'));
	alert($('body').find('.close').el[0].src);
	
	//var each = $("      div   ul  li   .aa    ").el;
	//var each = $("      div   ul  li       ").find(".aa").el;
	var each = $("#header div").el
	for(var i = 0; i < each.length; i++) {
		
		alert(each[i].className);
	}
	
	//alert($(".member").el[0].tagName);
}
*/
/*
window.onload = function() {
	
	alert($('.beauty').el[0].src);
	
}

if(document.addEventListener) {
	
	document.addEventListener('DOMContentLoaded', function() {
		fn();
		document.removeEventListener('DOMContentLoaded', arguments.callee, false);
	}, false);
	
} else {
	var timer = null;
	timer = setInterval(function() {
		try{ 
			document.documentElement.doScroll('left');
			fn();
		} catch(e){}
		
		
		
		
	});
	
	
}

function fn() {
	
	alert($('.beauty').el[0].src);
	
}
*/

/*
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();
*/
//alert(document.body);
/*
addDOMLoad(function() {
	
	alert($('.beauty').el[0].src);
	
});
function addDOMLoad(fn) {
	
	var flag = false;
	var timer = null;
	function doReady() {
		if(flag) {
			window.clearInterval(timer);
			return ;
		}
		flag = true;
		
		fn();
	}
	if(document.addEventListener) {
		$(document).addEvent('DOMContentLoaded', function() {
			
			doReady();
			$(this).removeEvent('DOMContentLoaded', arguments.callee);
		});
		
	} else {

		timer = window.setInterval(function() {
			/*
			if(/loaded|complete/.test(document.readyState)) {
				
				doReady();
				
			}
			
			if(document && document.getElementById && document.getElementsByTagName && document.body) {
				
				doReady();
				
			}
			
		}, 1);

	}
	
	
};
*/