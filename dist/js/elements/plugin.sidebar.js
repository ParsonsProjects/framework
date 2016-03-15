/*
 *  Project: Framework
 *  Description: Sidebar plugin to enhance the CSS sidebar
 *  Author: Alan Parsons
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($) {

    var pluginName = "sidebar";

    $[pluginName] = function(element, options) {

        var defaults = {
            history : true,
            close : '[href="#close"]'
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

            if(!plugin.settings.history) {

                var target = $el.attr('href'),
                    $close = $(target).find(plugin.settings.close);

                $el.on('click', function(e) {
                    e.preventDefault();
                    $(target).addClass('is-in');
                });

                $close.on('click', function(e) {
                    e.preventDefault();
                    $(target).removeClass('is-in');
                });

            }
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
