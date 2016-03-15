
/**
 * main.js
 */

'use strict';

$(function() {

    var filePath = '../assets/less/';

    $.get(filePath + $('.js-location').text(), function( data ) {

        var vars = data.match(/[^ |(|-](\@[^}].*)\;/g);

        if(vars) {

            var $vars = $('<table class="mf m-striped e-table"></table>').appendTo('.js-variables');
            $vars.append('<thead><tr><th><span>Var</span></th><th><span>Default</span></th></tr></thead>');

            for ( var i = 0, l = vars.length; i < l; i++ ) {
                console.log(vars[i]);
                var label = vars[i].match(/[^ |(](\@[^}].*)\:/g),
                    value = vars[i].match(/[^|(](\:[^}].*)\;/g);
                if(label) label = label[0].replace(':', '');
                if(value) value = value[0].replace(':', '');
                $vars.append('<tr><td><span>'+label+'</span></td><td><span>'+value+'</span></td></tr>');
            }

            if(vars.length > 1) {

                $vars.addClass('u-hide');

                var $varsButton = $('<a class="e-button">Vars</a>').appendTo($('.js-buttons'));

                $varsButton.on('click', function(){
                    $vars.toggleClass('u-hide');
                });

            }

        }

        var hooks = data.match(/[^ ](\.[^}].*)\}/g),
            $hooks = $('<ul></ul>').appendTo('.js-hooks');

        for ( var i = 0, l = hooks.length; i < l; i++ ) {
            $hooks.append('<li>'+hooks[i]+'</li>');
        }

        if(hooks.length > 1) {

            $hooks.addClass('u-hide');

            var $hooksButton = $('<a class="e-button">Hooks</a>').appendTo($('.js-buttons'));

            $hooksButton.on('click', function(){
                $hooks.toggleClass('u-hide');
            });

        }

    });

    $('.js-markup').each(function(){

        var $this = $(this),
            output = $this.html(),
            brush = $this.attr('brush'),
            $after = $this,
            $title = $this.prev('.js-preview'),
            $output;

        $this.wrap('<div class="e-preview"></div>');
        $output = $('<div class="l-container u-hide"><div class="e-section m-attached m-bottom e-highlight m-example"><pre class="brush: '+brush+'">'+output+'</pre></div></div>').insertAfter($after);
        var $codeButton = $('<a class="e-button m-code">Code</a>').appendTo($title);

        $codeButton.on('click', function(){
            $output.toggleClass('u-hide');
            $this.toggleClass('e-section m-attached m-top');
        });

        SyntaxHighlighter.all()

    });

});
