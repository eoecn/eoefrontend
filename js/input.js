// JavaScript Document
jQuery(document).ready(function(){	
	newBtn();
});
var newBtn = function(){
	/*input输入框*/
	if(!$('input.txt').parent().hasClass('enTxt')){
		$('input.txt').wrap('<dfn class="enTxt"></dfn>').click(function(){
			$('.enTxt').removeClass('focTxt');
			$('.editTxt').removeClass('spotTxt');
			$('.selList').hide();
			$(this).attr('placeholder','').parents('.enTxt').addClass('focTxt');				
			return false;
		});
	}
	/*textarea输入框*/
	$('textarea.txt').wrap('<div class="editTxt"></div>').click(function(){
		$('.editTxt').removeClass('spotTxt');
		$('.enTxt').removeClass('focTxt');
		$('.selList').hide();
		$(this).attr('placeholder','').parent().addClass('spotTxt');
		return false;	
	})
	/*选择按钮*/	
	$('.selBtn span').hover(function(){
		$(this).css('backgroundPosition','-5px -115px');
		$(this).prev('.il').css('backgroundPosition','0 -115px');
	},function(){
		$(this).css('backgroundPosition','-5px -77px');
		$(this).prev('.il').css('backgroundPosition','0 -77px');
	})
	/*选择按钮列表*/
	$('.selBtn b').bind({
		'mouseenter mouseleave':function(){
			$(this).toggleClass('bHover');
		},											
		'click':function(){
			$(this).parents('.selBox').children('.selList').toggle();
			if($('.selList').css('display')=='block'){
				$('.selBtn b').unbind('mouseenter mouseleave').addClass('bHover');				
			}else{
				$('.selBtn b').bind('mouseenter mouseleave',function(){
					$(this).toggleClass('bHover');
				});
			}
			return false;											
		}									
	})
	$('.selList li').bind({
		'mouseenter':function(){
			$(this).addClass('on').children('a').css('color','#fff');											
		},
		'mouseleave':function(){
			$(this).removeClass('on').children('a').css('color','#333');
		},
		'click':function(){
			var valTxt = $(this).children('a').text();
			var valValue = $(this).children('a').attr("param");
			$("input.feedbacktype").val(valValue);
			$(this).parents('.selBox').children('.selBtn').children('span').text(valTxt);
		}
	})
	
	$(document).click(function(){
		if($('.enTxt').hasClass('focTxt')){
			$('.enTxt').removeClass('focTxt');
		}
		if($('.selBtn b').hasClass('bHover')){
			$('.selBtn b').removeClass('bHover').parents('.selBox').children('.selList').hide();		
		}
		if($('.editTxt').hasClass('spotTxt')){
			$('.editTxt').removeClass('spotTxt');
		}
			
	})	
}	






