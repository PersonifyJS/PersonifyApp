// d3 Results Graph


// Watson Big5
// 0 Object {id: "Big 5", title: true, val5 1 Object {id: "Openness", title: true, value: "86%"}
// mapCtrl.js:85 2 Object {id: "Adventurousness", title: false, value: "78%"}
// mapCtrl.js:85 3 Object {id: "Artistic interests", title: false, value: "4%"}
// mapCtrl.js:85 4 Object {id: "Emotionality", title: false, value: "12%"}
// mapCtrl.js:85 5 Object {id: "Imagination", title: false, value: "93%"}
// mapCtrl.js:85 6 Object {id: "Intellect", title: false, value: "93%"}
// mapCtrl.js:85 7 Object {id: "Authority-challenging", title: false, value: "89%"}
// mapCtrl.js:85 8 Object {id: "Conscientiousness", title: true, value: "33%"}
// mapCtrl.js:85 9 Object {id: "Achievement striving", title: false, value: "35%"}
// mapCtrl.js:85 10 Object {id: "Cautiousness", title: false, value: "57%"}
// mapCtrl.js:85 11 Object {id: "Dutifulness", title: false, value: "22%"}
// mapCtrl.js:85 12 Object {id: "Orderliness", title: false, value: "7%"}
// mapCtrl.js:85 13 Object {id: "Self-discipline", title: false, value: "23%"}
// mapCtrl.js:85 14 Object {id: "Self-efficacy", title: false, value: "46%"}
// mapCtrl.js:85 15 Object {id: "Extraversion", title: true, value: "18%"}
// mapCtrl.js:85 16 Object {id: "Activity level", title: false, value: "8%"}
// mapCtrl.js:85 17 Object {id: "Assertiveness", title: false, value: "37%"}
// mapCtrl.js:85 18 Object {id: "Cheerfulness", title: false, value: "10%"}
// mapCtrl.js:85 19 Object {id: "Excitement-seeking", title: false, value: "26%"}
// mapCtrl.js:85 20 Object {id: "Outgoing", title: false, value: "11%"}
// mapCtrl.js:85 21 Object {id: "Gregariousness", title: false, value: "12%"}
// mapCtrl.js:85 22 Object {id: "Agreeableness", title: true, value: "12%"}
// mapCtrl.js:85 23 Object {id: "Altruism", title: false, value: "18%"}
// mapCtrl.js:85 24 Object {id: "Cooperation", title: false, value: "55%"}
// mapCtrl.js:85 25 Object {id: "Modesty", title: false, value: "5%"}
// mapCtrl.js:85 26 Object {id: "Uncompromising", title: false, value: "12%"}
// mapCtrl.js:85 27 Object {id: "Sympathy", title: false, value: "42%"}
// mapCtrl.js:85 28 Object {id: "Trust", title: false, value: "33%"}
// mapCtrl.js:85 29 Object {id: "Emotional range", title: true, value: "44%"}
// mapCtrl.js:85 30 Object {id: "Fiery", title: false, value: "34%"}
// mapCtrl.js:85 31 Object {id: "Prone to worry", title: false, value: "26%"}
// mapCtrl.js:85 32 Object {id: "Melancholy", title: false, value: "41%"}
// mapCtrl.js:85 33 Object {id: "Immoderation", title: false, value: "25%"}
// mapCtrl.js:85 34 Object {id: "Self-consciousness", title: false, value: "28%"}
// mapCtrl.js:85 35 Object {id: "Susceptible to stress", title: false, value: "30%"}
// mapCtrl.js:85 36 Object {id: "Needs", title: true, value: ""}
// mapCtrl.js:85 37 Object {id: "Challenge", title: false, value: "98%"}
// mapCtrl.js:85 38 Object {id: "Closeness", title: false, value: "81%"}
// mapCtrl.js:85 39 Object {id: "Curiosity", title: false, value: "38%"}
// mapCtrl.js:85 40 Object {id: "Excitement", title: false, value: "76%"}
// mapCtrl.js:85 41 Object {id: "Harmony", title: false, value: "89%"}
// mapCtrl.js:85 42 Object {id: "Ideal", title: false, value: "54%"}
// mapCtrl.js:85 43 Object {id: "Liberty", title: false, value: "61%"}
// mapCtrl.js:85 44 Object {id: "Love", title: false, value: "41%"}
// mapCtrl.js:85 45 Object {id: "Practicality", title: false, value: "85%"}
// mapCtrl.js:85 46 Object {id: "Self-expression", title: false, value: "28%"}
// mapCtrl.js:85 47 Object {id: "Stability", title: false, value: "41%"}
// mapCtrl.js:85 48 Object {id: "Structure", title: false, value: "62%"}
// mapCtrl.js:85 49 Object {id: "Values", title: true, value: ""}
// mapCtrl.js:85 50 Object {id: "Conservation", title: false, value: "11%"}
// mapCtrl.js:85 51 Object {id: "Openness to change", title: false, value: "70%"}
// mapCtrl.js:85 52 Object {id: "Hedonism", title: false, value: "9%"}
// mapCtrl.js:85 53 Object {id: "Self-enhancement", title: false, value: "69%"}
// mapCtrl.js:85 54 Object {id: "Self-transcendence", title: false, value: "94%"}


var graphIt = function (watsonData){
  
  $('.us, .state').show();

  $('#a1').animate({
      marginLeft: watsonData.USData[1].value,
    }, 1000, function() {
  });

  $('#a2').animate({
      marginLeft: watsonData.USData[8].value,
    }, 1000, function() {
  });

  $('#a3').animate({
      marginLeft: watsonData.USData[15].value,
    }, 1000, function() {
  });

  $('#a4').animate({
      marginLeft: watsonData.USData[22].value,
    }, 1000, function() {
  });

  $('#a5').animate({
    // Neuroticism to be checked with phil
      marginLeft: watsonData.USData[29].value,
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
// =======
//   for (var key in data) {
//     traitsArray.push(data[key]);
//   }

//   var widthScale = d3.scale.linear()
//                   .domain([0, 100])
//                   .range([0, width]);

//   var color = d3.scale.linear()
//               .domain([0,100])
//               .range(["red", "blue"]);

//   var container = document.getElementById('resultsContainer');
//   var resultsBoard = d3.select(container)
//                           .append('svg')
//                           .attr("width", width)
//                           .attr("height", height)
//                           .append("g")
//                           .attr("transform", "translate(50,50)");

// //Grabs the stateData array from traitsArray (1th index)
// //slices off the first val because there's no 'value' key
//   var tempObj = [];
//   var stateData = traitsArray[1].slice(1);

// //loop through stateData array and convert percentages (type string) to numbers
//   for( var j=0;j<stateData.length;j++){
//     if(stateData[j]['value'].indexOf('%') > -1)
//     tempObj.push(parseInt(stateData[j]['value']));
//   }


//   var traits = resultsBoard.selectAll("rect")
//                   .data(tempObj)
//                   .enter()
//                       .append("rect")
//                       .attr("width", function(d){ return widthScale(d); })
//                       .attr("height", 5 )
//                       .attr("fill", function(d){ return color(d); })
//                       .attr("y", function(d, i){ return i * 10; })
//                       //.text(function(d) { return d; });  
    
}

