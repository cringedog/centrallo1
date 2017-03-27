;$( document ).ready(function() {
	var popout = $('.popout');
	var popoutBg = $( '.popout__bg' );
	var closeBtn = $( '.popout__close' );
	var shareButton = $( '.share__button-link' );
	var shareLink = $( '.section__share-link' );
	var togglePopout = function(){
		popout.toggle();
	};

	closeBtn.click( function(e){
		e.preventDefault();
		togglePopout();
	});

	popoutBg.click( function(e){
		e.preventDefault();
		togglePopout();
	});

	shareButton.click( function(e){
		e.preventDefault();
		togglePopout();
	});

	shareLink.click( function(e){
		e.preventDefault();
		togglePopout();
	});


});