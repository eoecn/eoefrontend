// ensure webkit's console.log() function in every browser
if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = { log: function(msg) { } };
}
function cl() {
  console.log.apply(console, arguments);
}



// eoe common variables and function
;window.eoe = {
  app: location.hostname.split(':')[0].split(".")[0].replace(/^my$/, 'blog'),
  domain: location.hostname.split(':')[0].split(".").pop(),
  uid: parseInt((document.cookie.match(/uid=([0-9]+)/) || [0,0])[1]),
  uname: (document.cookie.match(/uname=([^\;]*);/) || ['',''])[1].trim(),
  uhash: (document.cookie.match(/uhash=([a-z0-9]{32})/i) || ['',''])[1].trim(),
  avatar: function(uid) { return "http://www.eoeandroid.com/uc_server/avatar.php?size=small&uid=" + uid; },
  homeUrl: function(uid) { return "http://my.eoe." + this.domain + '/' + uid; },
  appUrl: function(uid) { var user_path = (this.app == 'code') ? 'users/' : ''; return 'http://' + this.app + '.eoe.' + this.domain + '/' + user_path + uid; },
  app_item: function() {
    return ({
     code: function() { var m = location.pathname.match(/\/([0-9]*)/); return m ? m[1] : 0; },
     blog: function() { var m = location.pathname.match(/\/([0-9]*)\.html/); return m ? m[1] : 0;  }
    }[this.app])();
  },
  fp: location.href.match(/http:\/\/[^/]*(\/.*)/)[1]
}
