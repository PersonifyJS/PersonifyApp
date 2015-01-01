$(document).ready(function(){
  $(".us").mouseover(function() {
        $(this).animate({top:"0", left:"0", width:"100px", height:"100px", opacity: 0}, 200);  
  }).mouseout(function() {
        $(this).animate({top:"50px", left:"50px", width:"0", height:"0", opacity: 1}, 200);
  });
});