// JavaScript Document
;(function($){
	$.fn.extend({
		feedback: function(options){
			var defaults = {			
				title:'感谢您使用eoe.cn，并将遇到的问题反馈给我们，我们会在第一时间处理；为了能快速定位和解决您遇到的问题,请将您的问题描述的稍微详细一些，谢谢你参与eoe产品完善。',
				empty:'请输入反馈内容',
				lack:'不得少于15个字符。',
				beyond:'500个字以内',								
				succeed:'谢谢您的反馈，我们会尽快处理！'
			}
			var options = $.extend(defaults,options);
			return this.each(function(options){
				$(this).html('<div class="feedback fix"></div><div class="shade fix"></div><div class="feedbackBox fix"><div class="feedTitle"><a href="javascript:;" class="feedHide"></a>给我们的建议</div><form><div class="feedContent"><p>'+defaults.title+'</p><div class="mt10 fix"><label class="first">问题类型</label><div class="selBox"><a href="javascript:;" class="selBtn"><i class="il"></i><span>bug</span><b><i class="ir"></i></b></a><div class="selList fix"><div class="dropCase"><div class="fix"><em class="em1">&nbsp;</em><em class="em2">&nbsp;</em><em class="em3">&nbsp;</em><em class="em4">&nbsp;</em></div><div class="dropContent fix"><ol><li><a href="javascript:void(0)" param="bug">bug</a></li><li><a href="javascript:void(0)" param="suggestion">建议</a></li><li><a href="javascript:void(0)" param="idea">想法</a></li><li><a href="javascript:void(0)" param="cooperation">合作</a></li><li><a href="javascript:void(0)" param="other">其它</a></li></ol><input name="type" class="feedbacktype" type="hidden" value="bug" /></div></div></div></div></div><div class="mt10 fix"><label>问题描述</label><textarea class="txt" cols="30" rows="10" name="eoe_feedback_content" placeholder="不小于15个字且500字以内"></textarea></div><div class="mt10 fix"><label>联系方式（电子邮件/QQ）</label><input type="text" class="txt" name="eoe_feedback_contact"/></div></div><div class="feedFooter"><a href="javascript:;" class="newBtn blueBtn"><span><i class="il"></i><i class="ir"></i>提交反馈</span></a></div></form></div>')
				$('div.feedback').click(function(){
					var nTop = ($(window).height()-$('div.feedbackBox').height())/2;
					var nLeft = ($(window).width()-$('div.feedbackBox').width())/2;
					$('div.shade').css({width:$(document).outerWidth(true),height:$(document).outerHeight(true)}).show();
					$('div.feedbackBox').css({top:nTop,left:nLeft}).show();	
					$.newBtn();				
				})
				$('div.feedTitle').children('a.feedHide').click(function(){
					$('div.feedbackBox,div.shade').hide();	
				})
				$('.feedFooter a.newBtn').click(function(){					
					var url = 'http://comment.eoe.'+document.location.hostname.split(".").pop();
					var type = $('input.feedbacktype').val();
					var content = $('textarea[name="eoe_feedback_content"]').val().replace(/^(\s*)|(|s*)$/g,'');
					var contact = $('input[name="eoe_feedback_contact"]').val();
					contact = contact?contact:"";					
					if(!content){
						alert(defaults.empty);
						return false;	
					}else if(content.length<15){
						alert(defaults.lack);
						return false;							
					}else if(content.length>500){
						alert(defaults.beyond);
						return false;	
					}
					$.getJSON(url+"/like/userfeedback?callback=?&"+"type="+type+"&content="+content+"&contact="+contact,function(data){
						if(data.status==1){
							$('textarea[name="eoe_feedback_content"],input[name="eoe_feedback_contact"]').val(null);
							$('div.feedbackBox,div.shade').hide();
							alert(defaults.succeed);
						}else{
							alert(data.info);
						}
					})
				})
			})
		}			
	})
})(jQuery)

;(function(){
	$.newBtn = function(){
		/*input输入框*/		
		
			$('input.txt').each(function(){
				$(this).wrap('<dfn class="enTxt"></dfn>').focus(function(){
					$(this).attr({placeholder:""}).parent().addClass("focTxt");	
				}).blur(function(){
					$(this).parent().removeClass("focTxt");	
				})
			})
		
		/*textarea输入框*/
		$("textarea.txt").each(function(){
			$(this).wrap('<dfn class="editTxt"></dfn>').focus(function(){
				$(this).attr({placeholder:""}).parent().addClass("spotTxt");
			}).blur(function(){
				$(this).parent().removeClass("spotTxt");			
			})
		})
		/*仿select选择框*/
		$("div.selBox b").bind("mouseenter mouseleave",function(){
			$(this).toggleClass("bHover");	
		}).click(function(){
			$(this).unbind("mouseenter mouseleave").addClass('bHover').parents("div.selBox").children("div.selList").show();
			return false;
		})
		$("div.selList li").bind({
			"mouseenter mouseleave":function(){
				$(this).toggleClass('on');
			},			
			"click":function(){
				var valTxt = $(this).children('a').text();
				var valValue = $(this).children('a').attr("param");
				$("input.feedbacktype").val(valValue);
				$(this).parents('div.selBox').children("a.selBtn").find('span').text(valTxt).end().find("b").removeClass("bHover").bind("mouseenter mouseleave",function(){
						$(this).toggleClass("bHover");	
				});
				$(this).parents('div.selList').hide();
			}
		})
		$(document).click(function(){
			if($('.selBtn b').hasClass('bHover')){
				$('.selBtn b').removeClass('bHover').bind("mouseenter mouseleave",function(){
					$(this).toggleClass("bHover");	
				}).parents('.selBox').children('.selList').hide();
			} 	
		})
	}
})(jQuery)


$(function(){
	$('body').prepend("<div class='feedbackfrom'></div>");
	$('div.feedbackfrom').feedback();
	$('body').prepend("<div class='backTop'></div>");
	$(window).scroll(function(){
		if($(window).scrollTop()>0){
			$('.backTop').slideDown(30);
		}else{
			$('.backTop').slideUp(30);
		}
	})
	$('.backTop').click(function(){
		$('body,html').animate({scrollTop:0},500)	
	})	
})