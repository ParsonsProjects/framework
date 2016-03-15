/*
 *  Project: Framework
 *  Description:
 *  Author: Alan Parsons
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function($) {

    var pluginName = "pluginName";

    $[pluginName] = function(element, options) {

        var defaults = {
            foo: 'bar',
            onFoo: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $el = $(element),
             el = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            // code goes here
        }

        plugin.foo_public_method = function() {
            // code goes here
        }

        var foo_private_method = function() {
            // code goes here
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


/* Usage

$(document).ready(function() {

    // attach the plugin to an element
    $('#element').pluginName({'foo': 'bar'});

    // call a public method
    $('#element').data('pluginName').foo_public_method();

    // get the value of a property
    $('#element').data('pluginName').settings.foo;

});

*/