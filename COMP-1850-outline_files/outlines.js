$(document).ready(function(){
   var text = $("td.t_main h1:first").html()
   if (text != null){
      document.title = 'BCIT : : ' + text;
   } else {
      document.title = 'BCIT : : Course Outlines';
   }
   //kludge - adding margin on h1 for print only
   var url = document.location.href;
   if (url.indexOf('print')) {
      $('.t_main h1').css('margin-top', '15px');
   }
   
   //add gentable to any table in the amendment section
   $('#amendmentSection table').addClass('gentable');
});