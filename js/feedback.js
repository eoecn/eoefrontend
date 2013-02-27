// JavaScript Document
jQuery(document).ready(function(){	
/*反馈弹框*/		
	$('.row').after('<div class="feedback fix"></div><div class="shade fix"></div><div class="feedbackBox fix"><div class="feedTitle"><a href="javascript:;" class="feedHide"></a>给我们的建议</div><form><div class="feedContent"><p>感谢您使用eoe.cn，并将遇到的问题反馈给我们，我们会在第一时间处理；为了能快速定位和解决您遇到的问题,请将您的问题描述的稍微详细一些，谢谢你参与eoe产品完善。</p><div class="mt10 fix"><label class="first">问题类型</label><div class="selBox"><a href="javascript:;" class="selBtn"><i class="il"></i><span>bug</span><b><i class="ir"></i></b></a><div class="selList fix"><div class="dropCase"><div class="fix"><em class="em1">&nbsp;</em><em class="em2">&nbsp;</em><em class="em3">&nbsp;</em><em class="em4">&nbsp;</em></div><div class="dropContent fix"><ol><li><a href="javascript:void(0)" param="bug">bug</a></li><li><a href="javascript:void(0)" param="suggestion">建议</a></li><li><a href="javascript:void(0)" param="idea">想法</a></li><li><a href="javascript:void(0)" param="cooperation">合作</a></li><li><a href="javascript:void(0)" param="other">其它</a></li></ol><input name="type" class="feedbacktype" type="hidden" value="bug" /></div></div></div></div></div><div class="mt10 fix"><label>问题描述</label><textarea class="txt" cols="30" rows="10" name="content" placeholder="500字以内"></textarea></div><div class="mt10 fix"><label>联系方式（电子邮件/QQ）</label><input type="text" class="txt" name="contact"/></div></div><div class="feedFooter"><a href="javascript:;" class="newBtn blueBtn"><span><i class="il"></i><i class="ir"></i>提交反馈</span></a></div></form></div>')
	
	var $box = $('.feedbackBox');
	var bDrag = false;	
	var nTop = ($(window).height() - $box.height())/2;
	var nLeft = ($(window).width() - $box.width())/2;	
	$('.feedback').click(function(){
		$('.shade').css({'width':$(document).outerWidth(true),'height':$(document).outerHeight(true)}).show();		
		$('.feedbackBox').css({'top':nTop+'px','left':nLeft+'px'}).show();
		newBtn();
	})
		
	$('.feedbackBox .feedTitle').mousedown(function(e){			
		var e = e||event;
		bDrag = true;		
		var disx = e.clientX-$box.position().left;
		var disy = e.clientY-$box.position().top;			
		$(document).mousemove(function(e){		
			if(!bDrag) return false;
			var e = e||event;
			var x = e.clientX-disx-$(document).scrollLeft();
			var y = e.clientY-disy-$(document).scrollTop();				
			var maxL = $(window).width() - $box.width();
			var maxT = $(window).height() - $box.height();					
			x=x<0?0:x;
			x=x>maxL?maxL:x;
			y=y<0?0:y;
			y=y>maxT?maxT:y;
			$box.css({left:x+'px',top:y+'px'});	
			return false;
		}).mouseup(function(){
			bDrag = false
			return false;	
		})
		return false;
	})
	
	
	$('.feedbackBox .feedHide').click(function(){
		$('.feedbackBox').hide();
		$('.shade').hide();
	})	
	$(".feedFooter a").click(function(){
		var url = 'http://comment.eoe.'+document.location.hostname.split(".").pop();
		var type = $("input.feedbacktype").val();
		var content = $("textarea[name='content']").val();
		var contact = $("input[name='contact']").val();
		contact = contact?contact:"";
		if(!content || content.length < 4)
			alert("请输入反馈内容");
		$.getJSON(url+"/Like/userfeedback?callback=?&"+'type='+type+'&content='+content+'&contact='+contact,
			function(data){
				if(data.status == 1){
					alert("谢谢您的反馈，我们会尽快处理！");
					$('.feedbackBox').hide();
					$('.shade').hide();
					$("textarea[name='content']").val(null);
					$("input[name='contact']").val(null);
				}else{
					alert(data.info);
				}	
			}
		)
	})
	
	
})