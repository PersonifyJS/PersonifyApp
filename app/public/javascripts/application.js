// animating the scroll effect 
$('.screenshots').on('click', function(e){
  e.preventDefault();
  $("html, body").animate({ scrollTop: "950px", duration: 500 });
});
