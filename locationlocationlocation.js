var map, marker, geocoder;

// update location information in HTML document
function up(latLng) {
	var address = 'Unknown';
	$('#lat')[0].innerHTML = latLng.lat().toString();
	$('#lng')[0].innerHTML = latLng.lng().toString();
}

// initialise Google maps
function init() {
    // initial coordinates
    var myLatLng = new google.maps.LatLng(51.5001524, -0.1262362);

    // initial zoom level
    var myZoom = 8;

    // initial map options
    var mapOpts = {
        zoom: myZoom,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        overviewMapControl: false,
        panControl: true,
        rotateControl: false,
        scaleControl: true,
        streetViewControl: false,
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        disableDefaultUI: true
    };

    // initial marker options    
    var markerOpts = {
        clickable: true,
        draggable: true,
        visible: true,
        position: myLatLng
    };

    // initialise variables
    map = new google.maps.Map(document.getElementById("map"), mapOpts);
    marker = new google.maps.Marker(markerOpts);
    marker.setMap(map);
    geocoder = new google.maps.Geocoder();
    
    // listener to allow marker to be clicked to center map
    google.maps.event.addListener(marker, 'click', function() {
        map.setCenter(marker.getPosition());
        up(marker.getPosition());
    });
    
    // listener to allow marker to be dragged around the map
    google.maps.event.addListener(marker, 'dragend', function() {
        up(marker.getPosition());
    });
    
    // listener to allow double click to center map on mouse
    google.maps.event.addListener(map, 'dblclick', function() {
        marker.setPosition(map.getCenter());
        up(marker.getPosition());
    });
    
    // listener to center marker on map
    google.maps.event.addListener(map, 'center_changed', function() {
        marker.setPosition(map.getCenter());
        up(marker.getPosition());
    });
    
    // listener to center marker when zoom level is changed
    google.maps.event.addListener(map, 'zoom_changed', function() {
        marker.setPosition(map.getCenter());
        up(marker.getPosition());
    });
    
    // listener to center marker when map is dragged
    google.maps.event.addListener(map, 'drag', function() {
        marker.setPosition(map.getCenter());
        up(marker.getPosition());
    });  
}

// geocode an address/location specified by the user  
function code() {
    geocoder.geocode( {'address': $('#address')[0].value}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
        }
    });
}

// set the height of the map
function map_height() {
    $('#map').height($(window).height()-1.5*$('#controls').height());
}

// start the magic
$(document).ready(function(){
    $('<script></script>', {
        type: 'text/javascript',
        src: 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init'
    }).appendTo('body');
    map_height();
    up(marker.getPosition());
});
