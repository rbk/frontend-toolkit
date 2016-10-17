(function($, window, document) {
	
	var sideDiv = document.querySelector('.stick-nav');

	if( sideDiv === null )
		return;

	// var footer = document.querySelector('.feeter-content');
	// var footerHeight = footer.offsetHeight;
	var topOffset = sideDiv.offsetParent.offsetTop;
	var bottomOffset = 0;
	var fixTheNav = false;
	var select = function(arg) {
		return document.querySelector( arg );
	};
	var footStop = 0;

	var sideOffset = sideDiv.getBoundingClientRect();
	var sideTop = sideOffset.top;
	var sideLeft = sideOffset.left;
	// var siteContent = select('.new-page-wrapper');
	var topOffset = findPos(sideDiv)
	console.log( topOffset )

	window.addEventListener('scroll', function(e){
		topOffset = findPos(sideDiv)
		// console.log(topOffset)
		scrollTop = document.documentElement.scrollTop || window.scrollY;
		// console.log( scrollTop )
		sideDiv.style = 'top:' +scrollTop + 'px';
	});




	function findPos(el) {
	    var node = el; 	
	    var curtop = 0;
	    var curtopscroll = 0;
	    if (node.offsetParent) {
	        do {
	            curtop += node.offsetTop;
	            curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
	        } while (node = node.offsetParent);

	        // alert(curtop - curtopscroll);
	    }
	    return (curtop - curtopscroll);
	}
	





})(jQuery, window, document);	





