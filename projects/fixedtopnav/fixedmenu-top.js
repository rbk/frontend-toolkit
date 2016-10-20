(function(window, document) {
	
	var topNav = document.querySelector('.main-navigation'),
		scrollTop = 0,
		style = null,
		inRange = false,
		originalOffset = topNav.offsetTop,

	// Custom Style
	style = document.createElement('style');
	style.innerHTML = '.fixed { position: fixed; top: 0; width: 100%; z-index: 99999; }';
	document.body.appendChild( style );

	// Make sure the offset is current at different screen sizes
	// This doesn't work if the top nav is already fix. When the nav is fixed the actually header height is different.
	window.addEventListener('resize', function(){
		originalOffset = topNav.offsetTop;
	});

	// Listen to the music of the scroll bar and change some classes
	window.addEventListener('scroll', function(e){
		scrollTop = document.documentElement.scrollTop || window.scrollY;
		if( scrollTop >= originalOffset ) {
			if( ! topNav.className.match('fixed') ) {
				topNav.className = topNav.className + ' fixed';
			}
		} else {
			topNav.className = topNav.className.replace(' fixed', '');
		}
	});

})(window, document);	