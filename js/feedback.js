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
				newBtn();
				$('div.feedback').click(function(){
					var nTop = ($(window).height()-$('div.feedbackBox').height())/2;
					var nLeft = ($(window).width()-$('div.feedbackBox').width())/2;
					$('div.shade').css({width:$(document).outerWidth(true),height:$(document).outerHeight(true)}).show('fast');
					$('div.feedbackBox').css({top:nTop,left:nLeft}).show();					
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
							alert(defaults.succeed);							
							$('div.feedbackBox,div.shade').hide();
							$('textarea[name="eoe_feedback_content"],input[name="eoe_feedback_contact"]').val(null);							
						}else{
							alert(data.info);
						}
					})
				})
			})
		}			
	})
})(jQuery)


$(function(){
	$('body').prepend("<div class='feedbackfrom'></div>");
	$('div.feedbackfrom').feedback();
})