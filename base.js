//base.js
//定义获取dom元素对象的函数
/*
var base = {
	
	getById : function(id, pel) {
		pel = pel || document;
		return pel.getelById(id);
	},
	getByName : function(name, pel) {
		pel = pel || document;
		return pel.getelsByName(name);
	},
	getByTagName : function(tagName, pel) {
		
		pel = pel || document;
		
		return pel.getelsByTagName(tagName);
	},
	getByClassName : function(clazz, pel) {
		pel = pel || document;
		var el = pel.getelsByTagName('*');
		var pattern = new RegExp("(\\s|^)" + clazz + "(\\s|$)");
		var arr = [];
		for(var i = 0; i < el.length; i++) {
			if(!!el[i].className.match(pattern)) {
					
				arr.push(el[i]);
			}
			
			
		}
		
		return arr;
		
	}
	
};



/*
if(new RegExp("^#\\w+").test(selector)) {
	selector = selector.replace(/^#/, "");
	base.el = base.getById(selector, pel);
	

	
} else if(new RegExp("^\\w+").test(selector)) {
	
	base.el = base.getByTagName(selector, pel);
	
} else if(new RegExp("^\\+\\w+").test(selector)) {

	selector = selector.replace(/^\+/, "");
	
	base.el = base.getByName(selector, pel);
} else if(new RegExp("^\\.\\w+").test(selector)) {
	selector = selector.replace(/^\./, "");

	base.el = base.getByClassName(selector, pel);
} else {
	throw new Error("没有获取到任何DOM元素");

}

*/
//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] :
	(s = ua.match(/webkit\/([\d.]+)/)) ? sys.webkit = s[1] : 0;
	
//	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();
//DOM加载，替换window.onload
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
			*/
			if(document && document.getElementById && document.getElementsByTagName && document.body) {
				
				doReady();
				
			}
			
		}, 1);

	}
	
	
};


//用于每次创建一个Base对象，#seletor为id选择器，.selector为className选择器，
//+selector为Name选择器,什么都不加tagname选择
/**
 *selector:选择器或者DOM对象
 *pel:父DOM
 */
function $(selector, pel) {
	//看是否穿了父元素
	if(arguments.length == 2) {
		
		pel = pel.el[0];
	}
	var base = new Base();
	//包装htmlDOM元素为Base对象
	if(arguments.length == 1 && typeof selector == "object") {
		base.el.push(selector);
		
		return base;
		
	}
	
	if(arguments.length == 1 && typeof selector == "function") {
		base.ready(selector);
		return base;
	}
	
	if(arguments.length == 0) {
		return base;
		
	}
	
	var arrStr = trim(selector).split(" ");
	base.el = [document];
	for(var n = 0; n < arrStr.length; n++) {

		
		base.find(arrStr[n]);

	
		
	}
	
	
	return base;
	
}

//Base的构造函数
function Base() {
	this.el = [];
	
	
	
	
	
}
//DOM加载准备函数
/**
 *fn:函数
 */
Base.prototype.ready = function(fn) {
	
	addDOMLoad(fn);
	
}
//查找子元素
/**
 *str:选择器
 */
Base.prototype.find = function(str) {
	var headStr = str.charAt(0);
	var arr = [];
	var bott = null;
	var flag = false;

	for(var i = 0; i < this.el.length; i++) {
		var target = this.el[i];

		switch(headStr) {
			case "#" : //id选择器
				
				bott = (this.getById(str.substring(1)));
				for(var j = 0; j < bott.length; j++) {
					//查找是否有重复的元素
					for(var n = 0; n < arr.length; n++) {
						if(arr[n] == bott[j]) {
							flag = true;
							break;
						}
						
					}
					if(!flag) {
						
						arr.push(bott[j]);
					}
					
					
				}
				break;
			
			case "." : //类选择器
				
				bott = this.getByClassName(str.substring(1), target);
				for(var j = 0; j < bott.length; j++) {
					//查找是否有重复的元素
					for(var n = 0; n < arr.length; n++) {
						if(arr[n] == bott[j]) {
							flag = true;
							break;
						}
						
					}
					if(!flag) {
						
						arr.push(bott[j]);
					}
					
				}

				break;
				
			case "+" : //名称选择
				bott = this.getByName(str.substring(1));
				for(var j = 0; j < bott.length; j++) {
					for(var n = 0; n < arr.length; n++) {
						if(arr[n] == bott[j]) {
							flag = true;
							break;
						}
						
					}
					if(!flag) {
						
						arr.push(bott[j]);
					}
					
				}
				break;
				
			default : //标签名选择器
				
				bott = this.getByTagName(str, target);
				for(var j = 0; j < bott.length; j++) {
					for(var n = 0; n < arr.length; n++) {
						if(arr[n] == bott[j]) {
							flag = true;
							break;
						}
						
					}
					if(!flag) {
						
						arr.push(bott[j]);
					}

				}
				break;
		
		}
		
	}
	
	this.el = arr;
	return this;

}
//通过id选择元素
Base.prototype.getById = function(id) {
		
		
		return [(document.getElementById(id))];
}

Base.prototype.getByName = function(name) {

		return document.getElementsByName(name);
}
//通过标签名选择元素
/**
 *tagName:标签名选择器
 *pel:父元素
 */
Base.prototype.getByTagName = function(tagName, pel) {
		
		pel = pel || document;

		
		return pel.getElementsByTagName(tagName);
}
//类名选择函数
/**
 *clazz:类名称
 *pel:父元素
 */
Base.prototype.getByClassName = function(clazz, pel) {
		pel = pel || document;
		var el = pel.getElementsByTagName('*');

		var pattern = new RegExp("(\\s|^)" + clazz + "(\\s|$)");
		var arr = [];
		for(var i = 0; i < el.length; i++) {
			
			if(!!el[i].className.match(pattern)) {
			
				arr.push(el[i]);
			}
			
			
		}
		

		return arr;
		
}
//css操作
/**
 *attr:属性名
 *value:为此属性设值，不填为获取此属性值
 */
Base.prototype.css = function(attr, value) {
	
	
	for(var i = 0; i < this.el.length; i++) {
		if(arguments.length == 1) {
			if(typeof attr != "object") {
				
				return getStyle(this.el[i],attr);
			}
			
			for(var c in attr) {

				this.el[i].style[c] = attr[c];
			
			}
			return this;
		}
		
			this.el[i].style[attr] = value;
			
		
		
	}
	return this;
	
}
//html内容操作函数
/**
 *value:设置html值，不填为选取html
 */
Base.prototype.html = function(value) {
	
		for(var i = 0; i < this.el.length; i++) {
			if(arguments.length == 0) {
				
				return this.el[i].innerHTML;
			}
			this.el[i].innerHTML = value;
		}
		return this;
	
	
}
//获取DOM元素
/**
 *index:DOM元素的下标
 */
Base.prototype.getelByIndex = function(index) {
	if(index >= this.el.length) {
		
		throw new Error("数组超界！！！0~" + (this.el.length - 1));
	}
	
	
	return $(this.el[index]);
	
}

Base.prototype.getDOMElement = function(index) {
	if(index >= this.el.length) {
		
		throw new Error("数组超界！！！0~" + (this.el.length - 1));
	}
	
	
	return this.el[index];
	
}



//定义兼容的绑定事件函数
/**
 *type:绑定的事件类型
 *fn:绑定的函数
 */
Base.prototype.addEvent = function(type, fn) {
	for(var i = 0; i < this.el.length; i++) {

		if(typeof this.el[i].addEventListener != 'undefined') {//W3C
		
			this.el[i].addEventListener(type, fn, false);
		
		}/* else if(typeof this.el[i].attachEvent != 'undefined') {//IE,使用ie的attachEvent存在内存泄露问题，而且不能
																//解决重复绑定的问题，绑定多个函数，执行顺序反向
		//	this.el[i].attachEvent('on'+type, fn);
			
			
		}*/ else {//通用
			//this.el[i]['on'+type]=fn;
			var existsFn = false;
			if(!this.el[i].events) {
				
				this.el[i].events = {};
				
			}
			if(!this.el[i].events[type]) {
				
				this.el[i].events[type] = [];
				
			}
			for(var j = 0; j < this.el[i].events[type].length; j++) {

				if(this.el[i].events[type][j] == fn) {
					existsFn = true;
					break;
				}
				
			}
			
			if(!existsFn) {
				
				this.el[i].events[type].push(fn);
			}
			
			
			this.el[i]['on' + type] = function() {

				for(var n = 0; n < this.events[type].length; n++) {
					
					this.events[type][n]();
				}
				
			}
			
		}
	}
	
	return this;
	
}


//移除事件
/**
 *type:事件类型
 *fn:绑定的函数
 */
Base.prototype.removeEvent = function(type, fn) {
	for(var i = 0; i < this.el.length; i++) {
		if(typeof this.el[i].removeEventListener != 'undefined') {//W3C
		
			this.el[i].removeEventListener(type, fn, false);
		
		}/* else if(typeof this.el[i].detachEvent != 'undefined') {//IE
			this.el[i].detachEvent('on'+type, fn);
			
		}*/ else {
			//this.el[i]['on'+type]=null;
			var target = this.el[i];
			if(target.events && target.events[type]) {
				for(var j = 0; j < target.events[type].length; j++) {
					if(target.events[type][j] == fn) {
						
						target.events[type].splice(j,1);
					}
				
				}
				
			}
			
		
		}
		
	}
	
	return this;
	
}
//运动函数，opacity以0~100传参。
/**
 *targetAttr:json对象属性
 *duration:动画执行的过渡时间
 *运动完成后调用的函数
 */
Base.prototype.animate = function(obj){
	for(var i = 0; i < this.el.length; i++) {
		
		obj.element = this.el[i],
			
		
		startMove(obj);
	}
	
	return this;
	
}
//添加类
/**
 *clazzName:类名
 */
Base.prototype.addClass = function(clazzName) {
	for(var i = 0; i < this.el.length; i++) {

		if(this.el[i].className != '') {
			
			if(!this.el[i].className.match(new RegExp("(^|\\s)" + clazzName + "(\\s|$)"))) {

				this.el[i].className += " " + clazzName; 
				
			}
			
			
			
		} else {
			
			this.el[i].className = clazzName;
		}
		
		
	}
	
	return this;
	
}
//删除类
/**
 *clazzName:类名
 */
Base.prototype.removeClass = function(clazzName) {
	
	for(var i = 0; i < this.el.length; i++) {
	
		this.el[i].className = this.el[i].className.replace(new RegExp("(^|\\s)" + clazzName + "(\\s|$)")," "); 

	}
	
	return this;
}
//添加规则
/**
 *num:第几个样式表（即第几个link）
 *selector：选择器
 *cssText：css样式，如background-color：red
 *position：样式规则的在样式里的位置
 */
Base.prototype.addRule = function(num, selector, cssText, position) {
	var sheet = document.styleSheets[num];
	if(sheet.insertRule) {
		
		sheet.insertRule(selector + "{" + cssText + "}", position);
		
	} else if(sheet.addRule) {
		
		sheet.addRule(selector, cssText, position);
	}
	return this;
	
}
//删除规则
/**
 *num:第几个样式表（即第几个link）
 *index：要删除的样式规则的位置
 */
Base.prototype.removeRule = function(num, position) {
	var sheet = document.styleSheets[num];
	if(sheet.deleteRule) {//w3c
		sheet.deleteRule(position);
		
	} else if(sheet.removeRule) {//ie
		sheet.removeRule(position);
		
	}
	
	return this;
	
}
//绑定移入移出事件
/**
 *showFn:移入函数
 *hideFn:移出函数
 */
Base.prototype.hover = function(showFn, hideFn) {
	
	this.addEvent('mouseover', showFn);
	this.addEvent('mouseout', hideFn);
	return this;
	
}

Base.prototype.show = function() {
	
	for(var i = 0; i < this.el.length; i++) {
		
		this.el[i].style.display = "block";
		
	}
	return this;
}
//隐藏对象
Base.prototype.hide = function() {
	
	for(var i = 0; i < this.el.length; i++) {
		
		this.el[i].style.display = "none";
		
	}
	return this;
}
//是元素相对浏览器居中
Base.prototype.center = function() {

	var viewWidth = document.documentElement.clientWidth;
	var viewHeight = document.documentElement.clientHeight;
	
	for(var i = 0; i < this.el.length; i++) {
		var boxWidth = this.el[i].offsetWidth;
		var boxHeight = this.el[i].offsetHeight;
		this.el[i].style.top = (viewHeight - boxHeight) / 2 + 'px';
		this.el[i].style.left = (viewWidth - boxWidth) / 2 + 'px';
		
	}
	
	
	return this;
	
}
//绑定onresize事件
/**
 *fn:函数
 */
Base.prototype.resize = function(fn) {

	window.onresize = fn;
	return this;
}
//绑定点击事件
/**
 *fn:函数
 */
Base.prototype.click = function(fn) {
	
	this.addEvent('click',fn);
	
	return this;
	
}
//锁定屏幕
Base.prototype.lock = function() {

	for(var i = 0; i < this.el.length; i++) {
		this.el[i].style.display = "block";
		this.el[i].style.width = getInner().width + 'px';
		this.el[i].style.height = getInner().height + 'px';
		
	}
	return this;
}
//取消锁定
Base.prototype.unlock = function() {
	
	for(var i = 0; i < this.el.length; i++) {
		this.el[i].style.display = "none";
		
		
	}
	return this;
	
}
//插件封装函数
/**
 *functionName:将要插入的函数名
 *fn:将要插入的函数
 */
Base.prototype.extend = function(funtionName, fn) {
	
	Base.prototype[funtionName] = fn;
	return this;
}

//拖拽函数
/**
 *handler:作为拖动句柄的Base对象
 */
Base.prototype.drag = function(handler) {
	var that = this;
	if(this.el.length == handler.el.length) {
		for(var i = 0; i < handler.el.length; i++) {
		handler.el[i].index = i;
		handler.el[i].onmousedown = function(e) {
				e = e || window.event;
				var current = that.el[this.index];
				var topHeight = e.clientY - current.offsetTop;
				var leftWidth = e.clientX - current.offsetLeft;
				
				document.onmousemove = function(evt) {
					evt = evt || window.event;
					var top = evt.clientY - topHeight;
					var left = evt.clientX - leftWidth;
					var width = current.offsetWidth;
					var height = current.offsetHeight;
					var windowWidth = getInner().width;
					var windowHeight = getInner().height;
					if(top < 0) {
						top = 0;
						
					} else if(top > (windowHeight - height)) {
						top = windowHeight - height;
						
					}
					if(left < 0) {
						
						left = 0;
					} else if(left > (windowWidth - width)) {
						left = windowWidth - width;
						
					}

					current.style.top = top + 'px';
					current.style.left = left + 'px';
			
					
				}
				
				document.onmouseup = function() {
				
					document.onmousemove = null;
						
					document.onmouseup = null;
				}
			
			}
			
			
		
		}
		
		
		
	} else {
		
		throw new Error("拖动元素与拖动句柄不一致！！！");
	}
	return this;
	
}
//获取属性和设置属性
/**
 *attr:属性名
 *value:属性值，可选
 */
Base.prototype.attr = function(attr, value) {
	
	if(arguments.length == 1) {
		return this.el[0].attr;
		
	}
	
	for(var i = 0; i < this.el.length; i++) {
		
		this.el[i].attr = value;
	}
	return this;
}
//选取下一个元素
Base.prototype.next = function() {
	for(var i = 0; i < this.el.length; i++) {
		if(this.el[i].nextSibling == null) {


			throw new Error("没有找到元素！！！");
			
		} else {
			while(this.el[i].nextSibling.nodeType == 3) {
				
				this.el[i] = this.el[i].nextSibling;
			}
			this.el[i] = this.el[i].nextSibling;
			if(this.el[i] == null) {
				throw new Error("没有找到元素！！！");
				
			}
		}
		
	}
	return this;
}
//控制移动框的位置
Base.prototype.controllDrag = function() {
	
	for(var i = 0; i < this.el.length; i++) {
			if(this.el[i].offsetTop > getInner().height - this.el[i].offsetWidth) {
				
				this.el[i].style.top = getInner().height - this.el[i].offsetHeight + "px";
			} else if(this.el[i].offsetTop < 0){
				this.el[i].style.top = 0;
				
			}
			if(this.el[i].offsetLeft > getInner().width - this.el[i].offsetWidth) {
				
				this.el[i].style.left = getInner().width - this.el[i].offsetWidth + "px";
			} else if(this.el[i].offsetLeft < 0) {
				
				this.el[i].style.left = 0;
			}
			
		}
}

//切换状态函数
Base.prototype.toggle = function() {
	var args = arguments;
	for(var i = 0; i < this.el.length; i++) {
		
		(function(element) {
			var count = 0;
			$(element).addEvent('click', function() {
			args[count++ % args.length].call(element);
			
			});
		})(this.el[i]);
		
		
	}
	
}
//绑定事件
/**
 *type:事件类型
 *fun:函数
 */
Base.prototype.bind = function(type, fun) {
	this.addEvent(type, fun);
	return this;
	
}



//获取表单元素
/**
 *name:表单元素的name
 */
Base.prototype.form = function(name) {
	for(var i = 0; i < this.el.length; i++) {
		this.el[i] = this.el[i][name];
		
	}
	return this;
}

//获取表当元素的值或者设置值
Base.prototype.value = function(value) {
	var arr = [];
	for(var i = 0; i < this.el.length; i++) {
		if(value) {
			this.el[i].value = value;
			
		} else {
			
			arr.push(this.el[i].value);
		}
		
	}
	return arr;
}

//获取元素内的文本
Base.prototype.text = function(textContent) {
	var arr = [];
	for(var i = 0; i < this.el.length; i++) {
		if(textContent) {
			
			if(this.el[i].textContent) {
			
				this.el[i].textContent = textContent;
			
			} else if(this.el[i].innerText){
				
				this.el[i].innerText = textContent;
			}
		} else {
			
			arr.push(this.el[i].textContent || this.el[i].innerText);
		}
		
	}
	return arr;
}


//获取出发事件的对象
/**
 *evt:ie的事件对象
 */
function getTarget(evt) {
	
	evt = evt || window.event;
	
	return evt.target || evt.srcElement;
	
}

//取得window浏览器的内部大小

function getInner() {
	if(window.innerWidth) {
		return {
			width:window.innerWidth,
			height:window.innerHeight
			
		};
		
	} else {
		
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
			
		};
	}
	
}

//运动框架函数
/**
 *obj:对象，以下为obj内的属性
 *element:将要运动的对象
 *targetAttr:需要做出变化的css属性
 *duration:过渡时间
 *fn:运动完成后调用的函数
 *isBuffer:是否使用缓冲动画
 */
function startMove(obj){
	if(!obj.duration || obj.duration == 0) {
		
		obj.duration = 30;
	}
	clearInterval(obj.element.timer);
	var attrValue;
	obj.element.timer = setInterval(function(){
		var flag = true;
		
		for(var c in obj.targetAttr){
			if(c == 'opacity') {
				attrValue = getStyle(obj.element,c) * 100;
			} else {
				attrValue = parseInt(getStyle(obj.element,c));
				
			}
			if(obj.isBuffer == true) {
				//js中if与for没有作用域
				var speed = (obj.targetAttr[c] - attrValue) / 10;
				
				
			} else if(obj.targetAttr[c] > attrValue) {
				speed = 10;
				
			} else {
			
				speed = -10;
			}
			
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(obj.isBuffer == true) {
				if(Math.abs(attrValue - obj.targetAttr[c]) < Math.abs(speed)) {
					obj.element.style[c] = obj.targetAttr[c];
					
				}
				if(attrValue != obj.targetAttr[c]) {
					flag = false;
					if(c == 'opacity') {
						obj.element.style[c] = (attrValue + speed) / 100;
						obj.element.style.filter = 'alpha(opacity:' + (attrValue+speed) + ')';
					} else {
						obj.element.style[c] = attrValue + speed + 'px';
					}
				}
				
			} else if(Math.abs(attrValue - obj.targetAttr[c]) < Math.abs(speed)) {
				flag = true;
				obj.element.style[c] = obj.targetAttr[c];
			} else {
				flag = false;
				obj.element.style[c] = attrValue + speed + 'px';
				
			}
			
		}
		
		if(flag == true) {
			clearInterval(obj.element.timer);
			if(obj.fn) {
				obj.fn();
			}
		}
		
	},obj.duration);
	
}
//获得计算后的样式
/**
 *el:需要获取属性的对象
 *attr:属性
 */
function getStyle(el,attr){
	if(window.currentStyle || el.currentStyle) {
		return window.currentStyle || el.currentStyle[attr];
	} else if(window.getComputedStyle){
		return getComputedStyle(el,null)[attr];
	}
}
//获取滚动条滚动的距离
function getDocumentScroll() {
	
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
	
}

//扩张IE中的event
/**
 *evt:ie的事件对象
 */
function eventWapper(evt) {
	evt.preventDefault = preventDefault;
	
	evt.stopPropagation = stopPropagation;
	
	return evt;
}

//ie组织默认行为
function preventDefault() {

	this.returnValue = false;
}
//ie组织冒泡
function stopPropagation() {
		
	this.cancelBubble=true;
}
//去掉字符串的左右的空格,并把字符间的多个空格，改成一个空格
/**
 *str:需要做空格处理的字符串
 */
function trim(str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	str = str.replace(/\s+/g, " ");
	return str;
}

function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != 'undefined') {
		var version = [
									'MSXML2.XMLHttp.6.0',
									'MSXML2.XMLHttp.3.0',
									'MSXML2.XMLHttp'
		];
		for (var i = 0; version.length; i ++) {
			try {
				return new ActiveXObject(version[i]);
			} catch (e) {
				//跳过
			}	
		}
	} else {
		throw new Error('您的系统或浏览器不支持XHR对象！');
	}
}

//名值对转换为字符串
function params(data) {
	var arr = [];
	for (var i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	}
	return arr.join('&');
}


//封装ajax
function ajax(obj) {
	var xhr = createXHR();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);
	if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
	if (obj.async === true) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method === 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);	
	} else {
		xhr.send(null);
	}
	if (obj.async === false) {
		callback();
	}
	function callback() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);			//回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}	
	}
}
