(function(){
  
  angular.module('controllers', []).controller('MapCtrl', ['$scope', '$http', function ($scope, $http) {
      
    $scope.val = "#nike";

    sweetAlert({ title: "Welcome!",   text: "Submit a topic to get started."});

    // D3 =========================
    // we define d3 us-map here
      var width = 1280,
          height = 600,
          active = d3.select(null);

      var projection = d3.geo.albersUsa()
          .scale(1280)
          .translate([width / 2, height / 2]);

      var path = d3.geo.path()
          .projection(projection);
      var svg = d3.select('#partial-app').append("svg")
          .attr("width", width)
          .attr("height", height);

      svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height)
          .on("click", reset);

      var g = svg.append("g")
          .style("stroke-width", "1.5px");

      d3.json("/states.json", function(error, us) {
        g.selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "feature")
            .on("click", clicked);
            //console.log(us.objects.states.geometries[0]);

        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "mesh")
            .attr("d", path);
      });
      $scope.hashTag = $scope.val;
      var geoLocation;

      $('form').fadeIn();
      $('.submit').on('click', function(){
          $('form').fadeOut();
          sweetAlert({ title: "Great!",   text: "Now choose a state to run the analysis."});
      });

      function clicked(d) {
        
        if (active.node() === this) return reset();
 
        $('form').fadeOut();
        // ========= The link between the client and the server ===============
          d3.json('/geo.json', function(err, data) {
            // activate the loading icon
            $('.spinner').show();
            $('svg').css('opacity', '0.2');
            geoLocation = (data[d.id].geo);
            console.log(geoLocation);
            //sending data (geo location and the end user search criteria) to server
            //a post request with data to twitter
            $http.post('/map', {geo: geoLocation, subject: $scope.val })
               .success(function(data){
                // disable the loading icon
                $('.spinner').hide();
                // in case no enough data found raise an error
                if (data.Error1 || data.Error2) {
                  sweetAlert({ title: "Watson says:",   text: "Oh, dear. It looks like there aren't enough tweets to conduct an analysis. Kindly send me another search query." });
                  reset();
                  $('form').fadeIn();
                } else {
                  $scope.hashTag = $scope.val;
                  // on success, the `data` is the data from Watson
                  // the data is the big 5 for a collection of tweets
                  graphIt(data);
                  $('.output').fadeIn();
                  $('#another').fadeIn();

                  $('#anotherTopic').on('click', function(){
                    reset();
                    $('form').fadeIn();
                  });
                  $('#anotherState').on('click', function(){
                    reset();
                  });
                }
               });
          });

        active.classed("active", false);
        active = d3.select(this).classed("active", true);

        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = .9 / Math.max(dx / width, dy / height),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        g.transition()
            .duration(750)
            .style("stroke-width", 1.5 / scale + "px")
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
      }

      function reset() {
        geoLocation = "";
        $('.output').fadeOut();
        $('svg').css('opacity', '1');
        active.classed("active", false);
        active = d3.select(null);
        g.transition()
            .duration(550)
            .style("stroke-width", "1.5px")
            .attr("transform", "");
      }
  }]);
})();