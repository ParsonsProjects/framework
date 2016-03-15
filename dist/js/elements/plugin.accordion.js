/*
 *  Project: Framework
 *  Description: Tabs plugin to enhance the CSS accordion
 *  Author: Alan Parsons
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($) {

    var pluginName = "accordion", initialLoad = true, clickEvent = false;

    $[pluginName] = function(element, options) {

        var defaults = {
            history : true,
            link : '.s-title',
            target  : '.s-target'
        }

        var plugin = this;

        plugin.settings = {}

        var $el = $(element),
             el = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options,
            //check if the plugin exists first
            ( typeof $.html5data === 'function' ?
              $el.html5data(pluginName)
              //if not, fall back to the global namespace
              : $el.data() )
            );
            // code goes here

            if(plugin.settings.history) {

                $(window).bind('hashchange', function () {

                    var hash = window.location.hash,
                        $target = $(hash),
                        $link = $('[href="' + hash + '"]');

                    if($target.hasClass('s-target')) {
                        plugin.changeTab($target, $link);
                        // Might need to find a better way to delay scroll after page has loaded
                        if(initialLoad && !clickEvent) {
                            $('html, body').animate({
                                scrollTop: $link.offset().top
                            }, 2000);
                            initialLoad = false;
                        }
                    }

                });

                $(window).trigger("hashchange");

            }

            $el.find(plugin.settings.link).on('click', function(e) {
                var $link = $(this);
                var $target = $($link.attr('href'));
                if(!plugin.settings.history) e.preventDefault();
                clickEvent = true;
                plugin.changeTab($target, $link);
            });

        }

        plugin.changeTab = function($target, $link) {
            $el.find(plugin.settings.link).removeClass('is-current');
            $el.find($link).addClass('is-current');
            $el.find(plugin.settings.target).removeClass('is-current');
            $el.find($target).addClass('is-current');
        }

        plugin.init();

    }

    $.fn[pluginName] = function(options) {

        return this.each(function() {
            if (undefined == $(this).data(pluginName)) {
                var plugin = new $[pluginName](this, options);
                $(this).data(pluginName, plugin);
            }
        });

    }

})(jQuery);