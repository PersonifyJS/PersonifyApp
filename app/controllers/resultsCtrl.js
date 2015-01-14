var graphIt = function (watsonData){
  
  $('.us, .state').show();

  $('#a1').animate({
      marginLeft: watsonData.USdata[1].value,
    }, 1000, function() {
  });

  $('#a2').animate({
      marginLeft: watsonData.USdata[8].value,
    }, 1000, function() {
  });

  $('#a3').animate({
      marginLeft: watsonData.USdata[15].value,
    }, 1000, function() {
  });

  $('#a4').animate({
      marginLeft: watsonData.USdata[22].value,
    }, 1000, function() {
  });

  $('#a5').animate({
    // Neuroticism to be checked with phil
      marginLeft: watsonData.USdata[29].value,
    }, 1000, function() {
  });

  $('#b1').animate({
      marginLeft: watsonData.stateData[1].value,
    }, 1000, function() {
  });

  $('#b2').animate({
      marginLeft: watsonData.stateData[8].value,
    }, 1000, function() {
  });

  $('#b3').animate({
      marginLeft: watsonData.stateData[15].value,
    }, 1000, function() {
  });

  $('#b4').animate({
      marginLeft: watsonData.stateData[22].value,
    }, 1000, function() {
  });

  $('#b5').animate({
    // Neuroticism to be checked with phil
      marginLeft: watsonData.stateData[29].value,
    }, 1000, function() {
  });
    
};

