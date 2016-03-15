
/**
 * jquery.cycle-animate.js
 */

'use strict';

$(function(){

	var cycleAnimations = {};

	cycleAnimations.incoming = function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

		// vars
		var $outgoingSlide,
	    	$incomingSlide,
	    	$incomingAnimationEl;

	    // if type is initialized animate first slide
	    if(event.type == 'cycle-initialized') {
	    	$incomingSlide = $(event.target).find('.slide').eq(0);
	    } else {
	    	$incomingSlide = $(incomingSlideEl);
	    	$outgoingSlide = $(outgoingSlideEl);
	    }

	    $incomingAnimationEl = $incomingSlide.find('[data-animatein]');

	    // if el exists
	    if($incomingAnimationEl.length) {
		    $incomingAnimationEl.each(function(){
		    	// split each animation type
		    	var $el = $(this);
		    	cycleAnimations.animate($el.attr('data-animatein'), $el);
		    });
		}

		if($outgoingSlide) {
			$outgoingSlide.find('[data-animatein]').each(function(){
				$(this).velocity("reverse", { duration: 0 });
			});
		}

	}

	cycleAnimations.outgoing = function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

		var $outgoingSlide = $(outgoingSlideEl),
	    	$outgoingAnimationEl = $outgoingSlide.find('[data-animateout]');

	    if($outgoingAnimationEl.length) {
		    $outgoingAnimationEl.each(function(){
		    	var $el = $(this);
		    	cycleAnimations.animate($el.attr('data-animateout'), $el);
		    });
		}

	}

	cycleAnimations.animate = function(string, $el) {

		var animations = {},
			duration = 2000,
			delay = false,
			easing = "swing",
			array = string.split(';'),
			number = /\d+/g;

		for ( var i = 0, l = array.length; i < l; i++ ) {
    		// split into key and value
    		// add to animation array
	    	var arr = array[i].split(':');
	    	if(arr[0] == 'duration') {
	    		duration = arr[1];
	    	} if(arr[0] == 'delay') {
	    		delay = arr[1];
	    	} if(arr[0] == 'easing') {

	    		var str = arr[1];

	    		if(str.match(number) != null) {
		    		easing = str.split(',');
		    	} else {
		    		easing = "" + easing + "";
		    	}

	    	} else {
	    		var str = arr[1];
	    		if (str.indexOf(",") >= 0) {

		    		var animation = str.split(/,(.+)?/).slice(0, -1),
	    				easingStr = animation.slice(-1)[0],
	    				animation = animation.slice(0, -1);

		    		if(easingStr.match(number) != null) {
		    			var newEasing = easingStr.split(',');
		    			animation.push(newEasing);
		    		}

		    		animations[arr[0]] = animation;

		    	} else {
		    		animations[arr[0]] = str;
		    	}
	    	}
	    };

	    $el.velocity(animations, {
	    	duration: duration,
	    	delay: delay,
	    	easing: easing,
	    	visibility: "visible"
	    });

	}

	var $cycle = $('.cycle');

	// must go before cycle starts
	$cycle.on( 'cycle-initialized', function(event, optionHash) {
		cycleAnimations.incoming(event, optionHash);
	});

	$cycle.cycle();

	// when cycle finsishes going to the next slide
	$cycle.on( 'cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		cycleAnimations.incoming(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
	});

	// before the cycle moves onto the next slide
	$cycle.on( 'cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
		cycleAnimations.outgoing(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
	});

});