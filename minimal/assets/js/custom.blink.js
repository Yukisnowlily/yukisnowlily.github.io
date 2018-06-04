(function($) {
	"use strict";


	// Set this to 'false' to disable Parallax FX
	// on header and ease the browser's CPU effort
	var useParallax = true;


	// 1. Size setup

	var fullHeight = function() {
		$( 'body' ).css( 'height', $( window ).height() - $( 'body' ).offset().top );
	}

	fullHeight();

	$( window ).on( 'resize', function() {
		fullHeight();
	});

	// 2. Navigation

	$( '#nav-trigger' ).click( function(el) {
		el.preventDefault();
		$( this ).find( 'i.fa' ).toggleClass( 'fa-bars' ).toggleClass( 'fa-close' );
		$( '#nav' ).toggleClass( 'active' );
		$( '#nav-drop' ).slideToggle( 100 );
	});

	// 2.1. Same Page Scrolling Links

	$( '#menu' ).onePageNav({
		scrollSpeed: 400,
		changeHash: false,
		easing: 'swing',
		begin: function() {
			$( '#nav' ).removeClass( 'active' );
			$( '#nav-drop' ).slideUp( 100 );
			$( '#nav-trigger i.fa' ).removeClass( 'fa-close' ).addClass( 'fa-bars' );
		},
		scrollOffset: 69,
	});
	$.localScroll();

	// 2.2. Navigation FX on Scroll

	if( $( window ).scrollTop() > 60) {
		$( '#nav' ).addClass( 'scrolled' );
	}

	$( window ).bind( 'scroll', function() {
		if( $( this ).scrollTop() > 60) {
			$( '#nav' ).addClass( 'scrolled' );
		}
		if( $(this).scrollTop() < 60 ) {
			$( '#nav' ).removeClass( 'scrolled' );
		}
	});

	// 3. Hero

	// 3.1. Hero FX on Scroll

	if( useParallax == true ) {
		// Moving the background
		$( window ).scroll( function() {
			var st = $( this ).scrollTop();
			$( '#hero' ).css( { 'background-position': 'center '+ st/4 +'px' } );
			$( '.hero-slide' ).css( { 'background-position': 'center '+ st/4 +'px' } );
			$( '.hero-box' ).css( { transform: 'translateY( '+ st/1.5 +'px )', 'opacity' : (1 - st/700) } );
			$( '.scroll-alert i' ).css({ 'opacity' : (1 - st/100) });
			$( '#hero-slider .owl-controls' ).css({ 'opacity' : (1 - st/100) });
		});
	}

	// 3.2. Hero Slider

	var time = 7; // time in seconds

	var $progressBar,
		$bar, 
		$elem, 
		isPause, 
		tick,
		percentTime;

	// 3.2.1 Init the carousel
	$("#hero-slider").owlCarousel({
		slideSpeed: 500,
		paginationSpeed: 500,
		singleItem: true,
		afterInit: progressBar,
		afterMove: moved,
		startDragging: pauseOnDragging
	});

	// 3.2.2. Init progressBar where elem is $("#owl-demo")
	function progressBar(elem){
		$elem = elem;
		//build progress bar elements
		buildProgressBar();
		//start counting
		start();
	}

	// 3.2.3. Create div#progressBar and div#bar then prepend to $("#owl-demo")
	function buildProgressBar(){
		$progressBar = $("<div>",{
			id:"progressBar"
		});
		$bar = $("<div>",{
			id:"bar"
		});
		$progressBar.append($bar).prependTo($elem);
	}

	function start() {
		//reset timer
		percentTime = 0;
		isPause = false;
		//run interval every 0.01 second
		tick = setInterval(interval, 10);
	};

	function interval() {
		if(isPause === false){
			percentTime += 1 / time;
			$bar.css({
				 width: percentTime+"%"
			});
			//if percentTime is equal or greater than 100
			if(percentTime >= 100){
				//slide to next item 
				$elem.trigger('owl.next')
			}
		}
	}

	// 3.2.4. Pause while dragging 
	function pauseOnDragging(){
		isPause = true;
	}

	// 3.2.5. Moved callback
	function moved(){
		//clear interval
		clearTimeout(tick);
		//start again
		start();
	}

	// Uncomment this to add pause on mouseover 
	/*$elem.on('mouseover',function(){
		isPause = true;
	});
	$elem.on('mouseout',function(){
		isPause = false;
	});*/

	// 4. Sliders

	$( '.slider' ).each( function() {
		if( $( this ).hasClass( 'slider-arrows' ) ) {
			$( this ).owlCarousel({
				autoPlay: 7000,
				stopOnHover: true,
				slideSpeed: 200,
				pagination: false,
				paginationSpeed: 800,
				rewindSpeed: 800,
				singleItem: true,
				navigation: true,
				navigationText: [
					"<i class='fa fa-angle-left'></i>",
					"<i class='fa fa-angle-right'></i>"
				],
			});
		}
		else {
			$( this ).owlCarousel({
				autoPlay: 7000,
				stopOnHover: true,
				slideSpeed: 200,
				paginationSpeed: 800,
				rewindSpeed: 800,
				singleItem: true
			});
		}
	});

	// 5. Skill bars

	$( '.skill-bar' ).waypoint( function() {
		var bw = $( this ).data( 'skill' );
		$( this ).find( '.skill-fill' ).animate( { width: bw }, 500 );
	}, {
		offset: 'bottom-in-view',
		triggerOnce: true
	});

	// 6. Portfolio / Venobox / Lightbox

	$( '.lightbox' ).venobox({
		numeratio: true
	});
	$( '.info-link' ).venobox({
		bgcolor: '#161617'
	});

	// 6.1. Project Filtering

	$( '.project-filters a' ).click( function(el) {
		el.preventDefault();
		var filter = $( this ).data( 'filter' );

		$( '.project-filters a' ).removeClass( 'active' );
		$( this ).addClass( 'active' );

		if( filter != 'all') {
			$( '.project' ).removeClass( 'inactive' ).not('[data-filter="' + filter + '"]' ).addClass( 'inactive' );
		}
		else {
			$( '.project' ).removeClass( 'inactive' );
		}
	});

	// 6.2. Project Hovering

	$( '.project' ).hover(
		function() {
			$( this ).find( '.project-overlay ').stop().animate( { opacity: 0.9 }, 200 );
		},
		function() {
			$( this ).find( '.project-overlay ').stop().animate( { opacity: 0 }, 200 );
		}
	);

	// 7. Google Maps Setup
	// .gmap as class selector, also defined in stylesheet. Edit at own risk.

	function gmapSetup() {
		$( '.gmap' ).each( function() {
			$( this ).uniqueId();
			var gmapId = $( this ).attr( 'id' );
			var gmapLat = $( this ).data( 'lat' );
			var gmapLng = $( this ).data( 'lng' );
			var gmapTitle = $( this ).attr( 'title' );
			var gmapInfo = $( this ).html();
			// Cleaning the content
			//$( this ).css( 'display' , 'none');

			gmapInit( gmapId, gmapLat, gmapLng, gmapTitle, gmapInfo );
		});
	}

	function gmapInit( gmapId, gmapLat, gmapLng, gmapTitle, gmapInfo ) {
		var iconBase = 'assets/img/';

		var gmapLatLng = new google.maps.LatLng( gmapLat, gmapLng );
		var infowindow = new google.maps.InfoWindow({
			content: gmapInfo,
		});
		var gmapOptions = {
			scrollwheel: false,
			center: gmapLatLng,
			zoom: 14,
			styles: [
				{
					"featureType": "administrative",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"saturation": -100
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"saturation": -100
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"saturation": -10
						},
						{
							"lightness": 30
						}
					]
				},
				{
					"featureType": "landscape.man_made",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						},
						{
							"saturation": -60
						},
						{
							"lightness": 10
						}
					]
				},
				{
					"featureType": "landscape.natural",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						},
						{
							"saturation": -60
						},
						{
							"lightness": 60
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						},
						{
							"saturation": -100
						},
						{
							"lightness": 60
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						},
						{
							"saturation": -100
						},
						{
							"lightness": 60
						}
					]
				}
			],
		};

		var gmap = new google.maps.Map( document.getElementById( gmapId ), gmapOptions );

		var gmapMarker = new google.maps.Marker({
			icon: iconBase + 'gmaps-marker.png',
			position: gmapLatLng,
			map: gmap,
			title: gmapTitle
		});
		google.maps.event.addListener(gmapMarker, 'click', function() {
			infowindow.open( gmap, gmapMarker );
		});
	}

	// Will test for existing Google Maps on page and
	// execute only if any have been found
	if ( $( '.gmap' )[0] ){
		google.maps.event.addDomListener(window, 'load', gmapSetup);
	}


	// 8. Custom animations on scroll using jQuery Waypoints

	// Fades in an element in place
	$( '.fade-it-in' ).waypoint( function() {
		$( this ).addClass( 'fade-it-now');
	}, {
		offset: '90%',
		triggerOnce: true
	});

	// Fades in an element while moving it up to its place
	$( '.fade-it-up' ).waypoint( function() {
		$( this ).addClass( 'fade-it-now');
	}, {
		offset: '100%',
		triggerOnce: true
	});

})(jQuery);