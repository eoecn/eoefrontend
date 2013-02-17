//= require underscore/underscore-min.js
//= require common.js

;(function() {
  if (location.host.match(/cn$|name$/)) {; $(document).ready(function(){ // TODO pure js
    var ds = document.createElement('script');
        ds.type = 'text/javascript'; ds.async = true;
        ds.src = 'http://code.eoe.'+eoe.domain+'/log.js?user_id='+eoe.uid+'&fp='+encodeURI(eoe.fp)+'&_do='+eoe.app+'&uhash='+eoe.uhash+'&re='+encodeURI(document.referrer);
        ds.charset = 'UTF-8';
        document.getElementsByTagName('body')[0].appendChild(ds);
  }); };
})();
