// d3 Results Graph

// set the container
var width = 500,
    height = 500;
var traitsArray = [];

var graphIt = function (data){

  var container = document.getElementById('resultsContainer');
  var resultsBoard = d3.select(container).append('div')
                          .attr("width", width)
                          .attr("height", height);
  
  for (var key in data) {
    traitsArray.push(data[key]);
  }

  var traits = resultsBoard.selectAll("span").data(traitsArray);
  

  traits.enter().append("span")
      .attr("class", "points")
      .attr("x", function(d, i) { return i * 32; })
      .attr("dy", ".35em");

  traits.text(function(d) { return d; });  
    
}

