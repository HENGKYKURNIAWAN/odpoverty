var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var map = L.map('myMap').setView( [40.738153,-73.913612], 12);
map.addLayer(layer);

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