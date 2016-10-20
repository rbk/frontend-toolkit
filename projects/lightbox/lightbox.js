;(function( modal,undefined){

	// define local variables
	var i = 0,
		p = '',
		po = '',
		selector = '',
		el = '',
		modals = document.querySelectorAll('.modal-trigger'),
		modal_class = 'modal-overlay hide';

	// main function to call everything
	function initialize( ) {
		
		setupOverlay();
		addCloseButtonToOverlay();
		
		for (var i = modals.length - 1; i >= 0; i--) {
			setupModalEvents( modals[i] );
		}
	}

	function setupModalEvents( arg ) {

		selector = arg.getAttribute('href');

		var el = document.querySelector( selector );

		arg.addEventListener('click', function(e){
			e.preventDefault();
			showModal( el );
			po.className = po.className.replace('hide', '');
		});

		po.addEventListener('click', function(e){
			e.preventDefault();
			hideModal( el );
		});

	}
	function showModal( el ) {
		el.className = el.className + ' visible';
	}
	function hideModal( el ) {
		el.className = el.className.replace('visible', '');
	}

	// create overlay element
	function setupOverlay( ){

		// create overlay element
		po = document.createElement('div');

		// add new overlay class
		po.className = modal_class;

		// append overlay to footer
		document.body.appendChild(po);

		// add event to close footer on click
		po.addEventListener( 'click', function(){
			this.className = this.className + ' hide';
		});

	}

	function addCloseButtonToOverlay( ){
		el = document.createElement('a')
		el.className = 'modal-close';
		el.innerText = 'x';
		po.appendChild(el);
	}

	initialize();

})(window.modal = window.modal || {})