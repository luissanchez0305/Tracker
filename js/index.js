/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var timer;
var map;
var interval;
var markers = [];
var mapId = 'map1';
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('beginTracking').addEventListener('click', this.begin, false);
        document.getElementById('stopTracking').addEventListener('click', this.stop, false);
        document.getElementById('cleanTracking').addEventListener('click', this.clean, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		navigator.geolocation.getCurrentPosition(function(position){
	    	var lat = position.coords.latitude;
	    	var lng = position.coords.longitude;
	    	var myLatlng = new google.maps.LatLng(lat,lng);

	    	var mapOptions = {
	    	    center: myLatlng,
	    	    zoom: 14
	    	};

	    	map = new google.maps.Map(document.getElementById(mapId), mapOptions);
	    	google.maps.Map.prototype.clearOverlays = function() {
	    		for (var i = 0; i < markers.length; i++ ) {
	    		    markers[i].setMap(null);
	    		}
	    		markers.length = 0;
	    	};
		}, function(){
			alert('error');
		});
    },
    begin: function(){
    	interval = setInterval(placeMarker,2000);
    },
    stop: function(){
    	clearInterval(interval);
    },
    clean: function(){
    	map.clearOverlays();
    }
};

function placeMarker() {
	navigator.geolocation.getCurrentPosition(function(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var myLatlng = new google.maps.LatLng(lat,lng);
		var marker = new google.maps.Marker({
		    position: myLatlng,
		    map: map
		});

		map.panTo(myLatlng);
		markers.push(marker);		
	}, function(){ alert('error'); });
}