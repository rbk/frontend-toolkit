// return;



	// Listen to the music of the scroll bar and change some classes
	window.addEventListener('scroll', function(e){

		if(siteContent.offsetHeight < 800)
			return;

		scrollTop = document.documentElement.scrollTop || window.scrollY;

		// console.log((topOffset-100));

		if( scrollTop >= (topOffset-100) && fixTheNav ) {
			if( ! sideDiv.className.match('fixed-top') ) {
				sideDiv.className = sideDiv.className + ' fixed-top';
			}
		} else {
			sideDiv.className = sideDiv.className.replace(' fixed-top', '');
		}

		
		footStop =  document.body.offsetHeight - (sideDiv.offsetHeight + footerHeight + 100);
		if( scrollTop > footStop ){
			if( ! sideDiv.className.match('fixed-bottom') ) {
				sideDiv.className = sideDiv.className + ' fixed-bottom';
			}
			bottomOffset = 0;
			bottomOffset = -(footer.getBoundingClientRect().top - window.innerHeight)
			sideDiv.style.bottom = bottomOffset  + 'px';

		} else {
			sideDiv.className = sideDiv.className.replace(' fixed-bottom', '');
			sideDiv.style.bottom = 'initial';
		}

		var fh = footer.clientHeight;

	});



		sideDiv.style.width = sideDiv.clientWidth + 'px';

	window.addEventListener('scroll', function(e){
		// console.dir( sideDiv.parentNode.clientWidth )
		sideDiv.style.width = sideDiv.clientWidth + 'px';

	});
	window.addEventListener('resize', function(e){
		// console.dir( sideDiv.parentNode.clientWidth )
		sideDiv.style.width = sideDiv.clientWidth + 'px';
	});