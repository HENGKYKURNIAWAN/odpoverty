var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var map = L.map('myMap').setView( [40.738153,-73.913612], 12);
map.addLayer(layer);

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

  $.getJSON('data/merged1407.geojson', function(data) {
    geojson = L.geoJson(data, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);
    updateChart(data.features[currid].properties)
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
    $('#side').html('<h3>' + (layer.feature.properties.mmx_rep * 100).toFixed() + '</h3>' + '<h4>' + 'of representation score on NYC Open Data Portal' + '</h4>');
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
    
// };

// L.geoJson(data2, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, subwaystations);
//     }
// }).addTo(map);
// });

//dropdown scroll
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
          "label" : "STD" , 
          "value" : f.std_rep
        } , 
        { 
          "label" : "MMX" , 
          "value" : f.mmx_rep 
        }
      ]
    d3.select('#chart svg')
    .datum(rentData)
    .transition().duration(500)
    .call(chart);
  
}



////SPIDER CHART


