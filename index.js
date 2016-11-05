//index.js
$(function(){
	
	
	$(".member").hover(function() {
		$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
		$(".member ul").show();
		$(".member ul").animate({
			targetAttr:{top:30},
			duration:10,
			isBuffer:true
			
		});
		
		
	}, function() {
		$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
		$(".member ul").hide();
		$(".member ul").animate({
			targetAttr:{top:50},
			duration:10,
			isBuffer:false
			
		});
	});
	var loginBox = $("#login");
	var screenCanvs = $("#screen");
	var dragHeader = $("#login h2", loginBox);
	
	$(".close").click(function() {
		loginBox.hide();
		screenCanvs.unlock();
		document.documentElement.style.overflow = 'auto'; 
		
	});
	
	
	
	
	$(".login").click(function() {
		
		document.documentElement.style.overflow = 'hidden'; 
		loginBox.show();
		screenCanvs.lock();
		loginBox.center();
		
		
	});
	loginBox.drag(dragHeader);
	$("#reg").drag($("#reg h2"));
	var share = $("#share");
	
	share.css('top', (getInner().height-share.getDOMElement(0).offsetHeight)/2 + 'px');
	share.hover(function() {
		share.animate({
		targetAttr:{left:0},
		duration:30,
		isBuffer:true
		
		});
		
	}, function() {
		share.animate({
		targetAttr:{left:-220},
		duration:30,
		isBuffer:true
		
		});
		
	});
	
	$("#nav .about li").hover(function() {
		var _that = this;
		$("#nav .nav_bg").animate({
			targetAttr:{left:_that.offsetLeft + 20},
			duration:20,
			fn:function() {
				$("#nav .nav_bg .white").animate({
					targetAttr:{left:-_that.offsetLeft},
					duration:10
					
				});
				
			}
		});
		
	}, function() {
		$(".nav_bg").animate({
			targetAttr:{left:20},
			duration:20,
			fn:function() {
				$("#nav .nav_bg .white").animate({
					targetAttr:{left:0},
					duration:10
					
				});
				
			}
		});
		
	});
	
	$("#sidebar h2").toggle(function() {

		$(this).next().css('display', 'none');
		
	}, function() {
		$(this).next().css('display', 'block');
		
	});
	
	window.onscroll = function() {
		share.css('top', getDocumentScroll().top + (getInner().height-share.getDOMElement(0).offsetHeight)/2 + 'px');
		
	}
	
	$().resize(function() {
		
		
			
		loginBox.controllDrag();
		$('#reg').controllDrag();
		if(screenCanvs.css('display') != 'none') {
			screenCanvs.lock();
			
		}
		
	});
	
	$('.reg').addEvent('click', function() {
		$('#reg').show();
		$('#reg').center();
		
	});
	
	$('#reg .close').addEvent('click', function() {
		$('#reg').hide();
		
	});
	

});
