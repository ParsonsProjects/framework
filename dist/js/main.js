
/**
 * main.js
 */

'use strict';

// Using require js to include js files http://requirejs.org/

require.config({
    baseUrl: '../assets/js',
    paths: {
        jQuery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
        bbq : 'vendor/jquery.ba-bbq.min', // Used for history changes tabs, modals, sidebar http://benalman.com/projects/jquery-bbq-plugin/
        html5data : 'vendor/jquery.html5data.min', // Used for data attr for plugins tabs, modals, sidebar http://markdalgleish.com/projects/jquery-html5data/
        vminpoly : 'vendor/vminpoly', // Used for vh and vw IE8 and below https://github.com/saabi/vminpoly
        prefixfree : 'vendor/prefixfree.min', // Used for CSS prefix saves on file space http://leaverou.github.io/prefixfree/
        es5 : 'vendor/ie/es5-shim.min', // Used for javascript polyfil in IE8 https://github.com/es-shims/es5-shim
        selectivizr : 'vendor/ie/selectivizr-min', // Used to polyfill selectors in IE8 http://selectivizr.com/
        smoothscroll: 'vendor/jquery.smoothscroll', // Smoother scrolling on the page https://github.com/galambalazs/smoothscroll/blob/master/src/sscr.js
        velocity: 'addon/velocity.min', // Used for banner animations http://julian.com/research/velocity/
        cycle: 'addon/cycle/jquery.cycle2.min', // Cycle2 http://jquery.malsup.com/cycle2/
        cycleAnimate : 'addon/cycle/jquery.cycle.animate', // Used with velocity to generate banner animations
        tabs : 'elements/plugin.tabs',
        modal : 'elements/plugin.modal',
        sidebar : 'elements/plugin.sidebar',
        accordion : 'elements/plugin.accordion'
    },
    shim: {
    	'cycle': ['jQuery', 'velocity'],
        'cycleAnimate': ['jQuery', 'cycle', 'velocity'],
        'velocity': ['jQuery'],
        'tabs': ['jQuery', 'html5data', 'bbq'],
        'modal': ['jQuery', 'html5data', 'bbq'],
        'sidebar': ['jQuery', 'html5data', 'bbq'],
        'accordion': ['jQuery', 'html5data', 'bbq'],
        'html5data': ['jQuery'],
        'bbq': ['jQuery'],
        'smoothscroll': ['jQuery'],
        'vminpoly': ['es5']
    }
});

require(['jQuery', 'cycle', 'velocity', 'cycleAnimate', 'html5data', 'bbq', 'tabs', 'modal', 'sidebar', 'prefixfree', 'smoothscroll', 'accordion'], function () {
    $(function () {

        // IE8 Scripts
        // Not needed straight away so loaded here ones needed on
        // intial load should be added to the DOM
        if($('html').hasClass('lt-ie9')) {
            require(['es5', 'selectivizr', 'vminpoly']);
        }

        $('.js-cycle').cycle();

        $('.js-accordion').each(function(){
            $(this).accordion();
        });

        $('.js-sidebar').each(function(){
            $(this).sidebar();
        });

        $('.js-tabs').each(function(){
            $(this).tabs();
        });

        $('.js-modal').each(function(){
            $(this).modal();
        });

    });
});
