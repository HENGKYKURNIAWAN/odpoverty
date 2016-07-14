<<<<<<< HEAD
var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
=======
var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
>>>>>>> 1b4165a29718e5ad5cadd787d699111fe499fb1b
});

var map = L.map('myMap').setView( [40.738153,-73.913612], 12);
map.addLayer(layer);

<<<<<<< HEAD
var actorData = [0,0,0];    
var geojson;

$.getJSON('data/merged1407.geojson', function(data) {
	geojson = L.geoJson(data, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
});


function getColor(d) {
	return d > 0.8  ? '#006837' :
	d > 0.6  ? '#31A354' :
	d > 0.4  ? '#78C679' :
	d > 0.2  ? '#c2e699' :
	'#FFFFCC' ;
}


function style(feature) {
	return {
		fillColor: getColor(feature.properties.mmx_rep),
		weight: .6,
		opacity: 1,
		color: '#000000',
		dashArray: '0',
		fillOpacity: 1.0
	};
}

function mouseoverFunction(e) {
	var layer = e.target;
		layer.setStyle({
			weight: 5,
			opacity: 1,
			color: 'white',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
		actorData = updateRadar(e.target.feature.properties);
		myRadar.data.datasets[0].data = actorData;
		myRadar.update();
		$('#repscore').html((layer.feature.properties.mmx_rep * 100).toFixed());
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: mouseoverFunction,
			mouseout: resetHighlight
				//click: zoomToFeature
			});
	}
=======
var rentData = [];
rentData[0]={};
var currid=0;
var med=0;
    

var chart;

var manhattan = [40.763121,-73.948288];
var brooklyn = [40.637925,-73.948288];
var bronx = [40.841606, -73.874817];
var queens = [40.716298,-73.853874];
var statenisland = [40.571719,-74.148788];

var panOptions = {
    animate: true,
    duration: 2
 	}

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        map.panTo(manhattan, panOptions);
      } 
      
      else if 
      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#fff');
        map.panTo(brooklyn, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#fff');
        map.panTo(bronx, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#fff');
        map.panTo(queens, panOptions);
      } 

      else {
        $(this).css('background-color','#fff');
        map.panTo(statenisland, panOptions);
      }
    });
      
// function onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//     }
// }

  $("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
    });

  var geojson;

  $.getJSON('data/vac.geojson', function(data) {
    geojson = L.geoJson(data, {
    	style: style,
    	onEachFeature: onEachFeature
    }).addTo(map);
    updateChart(data.features[currid].properties)
  });


  function getColor(d) {
    return d > 90 ? '#0000cc' :
           d > 80  ? '#BD0026' :
           d > 60  ? '#E31A1C' :
           d > 50  ? '#FC4E2A' :
           d > 40  ? '#FD8D3C' :
           d > 30  ? '#FEB24C' :
           d > 20  ? '#FED976' :
                     '#FFEDA0' ;
  }


  function style(feature) {
    return {
        fillColor: getColor(feature.properties.VALUE2),
        weight: .2,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.7
    };
  }

  function mouseoverFunction(e) {
    var layer = e.target;
    // med value
    //med = e.target.feature.properties.median_income;
    //console.log(med);

    layer.setStyle({
        weight: 5,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    // try updatechart
    updateChart(e.target.feature.properties);

    // console.log(layer.feature.properties.VALUE2);
    $('#side').html('<h3>' + layer.feature.properties.VALUE2 + '%' + '</h3>' + '<h4>' + 'of Unoccupied Units Available for Rent in this Region - 2015.' + '</h4>');
  	}

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }
>>>>>>> 1b4165a29718e5ad5cadd787d699111fe499fb1b

//subway stations
// $.getJSON('data/subwaystop.geojson', function(data2) {
//   // console.log(data);

// var subwaystations = {
//     radius: 2,
//     fillColor: "green",
//     color: "#fff",
//     weight: .5,
//     opacity: 1,
//     fillOpacity: 01,
<<<<<<< HEAD

=======
    
>>>>>>> 1b4165a29718e5ad5cadd787d699111fe499fb1b
// };

// L.geoJson(data2, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, subwaystations);
//     }
// }).addTo(map);
// });

//dropdown scroll
<<<<<<< HEAD
$(".dropdown-menu li a").click(function(){
	var selText = $(this).text();
	$(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});


//bar chart


//Each bar represents a single discrete quantity.

////SPIDER CHART



var config = {
	type: 'radar',
	data: {
		labels: ["Health","School","Crime"],
		datasets: [{
			label: "Actors Score",
			backgroundColor: "rgba(255,99,132,0.8)",
			pointBackgroundColor: "rgba(220,220,220,1)",
			pointHoverBorderColor: "rgba(255,99,132,1)",
			borderColor: "rgba(255,99,132,1)",
			/*data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]*/
			data: actorData
		},]
	},
	options: {
		scale: {
			ticks: {
				beginAtZero: true,
				display: false,
				maxTicksLimit: 5
			}

		},
		legend : {
			display: false
		}
	},

};

var myRadar = new Chart(document.getElementById("canvas"), config);




function updateRadar(f){
	return [f.mmx_health,f.mmx_school,f.mmx_crime]
}
=======
  $(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
  });


//bar chart
nv.addGraph(function() {
  chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .staggerLabels(true)
    .showValues(true)
    .margin({left:0,right:0})
    .color(['rgb(77,175,74)','rgb(55,126,184)','rgb(228,26,28)'])
    .valueFormat(function(d){
        return Math.round(d * 10)/10;
      });
    ;

  nv.utils.windowResize(chart.update);

  return chart;
});


//Each bar represents a single discrete quantity.
function updateChart(f){

  rentData[0].key = "vacancyrent";
  rentData[0].values =
    [
        { 
          "label" : "Median Monthly Income" , 
          "value" : f.median_income / 12
        } , 
        { 
          "label" : "Median Monthly Rent" , 
          "value" : f.median_rent 
        } , 
        { 
          "label" : "30% Of A Household's Total Income" , 
          "value" : f.median_income /12 * .3
        } 
      ]
    d3.select('#chart svg')
    .datum(rentData)
    .transition().duration(500)
    .call(chart);
  
}


//bulletchart
// nv.addGraph(function() {  
//   var chart2 = nv.models.bulletChart();

//   d3.select('#chart2 svg')
//       .datum(exampleData())
//       .transition().duration(1000)
//       .call(chart2);

//   return chart2;
// });


// function exampleData() {
//   return {
//     "title":"Revenue",    //Label the bullet chart
//     "subtitle":"US$",   //sub-label for bullet chart
//     "ranges":[150,225,300],  //Minimum, mean and maximum values.
//     "measures":[220],    //Value representing current measurement (the thick blue line in the example)
//     "markers":[250]      //Place a marker on the chart (the white triangle marker)
//   };
// }


>>>>>>> 1b4165a29718e5ad5cadd787d699111fe499fb1b
