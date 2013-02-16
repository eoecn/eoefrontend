$(document).ready(function(){
  $.getJSON( 'http://code.eoe.' + eoe.domain + '/api/recent_visitors.json?pattern=' + eoe.app_item() + '&limit=42&app=' + eoe.app, function(data) {
    // 用js来添加自己为最近访客，并排除自己访问自己的情况
    var current_item_uid = 0;
    if (eoe.app.match(/blog/i)) { current_item_uid = parseInt(($(".visitorList script").html() || "uid=").match(/uid=([0-9]*)/) || [])[1]; };
    if (eoe.app.match(/code/i)) { current_item_uid = parseInt($(".span9 .author_name a").attr('href').match(/\/users\/([0-9]*)/)[1]); };

    if ((eoe.uid != 0 ) && (current_item_uid != eoe.uid)) {
      var current_uid_uname = [eoe.uid, eoe.uname];
      data = _.reject(data, function(i) { return i[0] == current_uid_uname[0]; });
      data.unshift(current_uid_uname);
    }

    // 追加访客节点
    var dom = $(".lastvisitor");
    $.each(data, function(idx, id_name) {
      var img_html = $('<img>').attr('src', eoe.avatar(id_name[0]));
      var a_html = $('<a>').attr('href', eoe.appUrl(id_name[0])).attr('title', id_name[1]).attr('target', '_blank').html( img_html );
      dom.append(a_html);
    });

    // 有数据就显示
    if (data.length > 0) { $(".lastvisitor").parent(".frame").show(); };
  });
})
