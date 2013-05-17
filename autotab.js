;(function ($, window, document, undefined) {
    var pluginName = "autotab";
    var defaults = {
        len: 2,
        next: null
    };

    function AutoTab(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    AutoTab.prototype = {
        init: function () {
            var focusin = null,
                self = this;

            $(this.element).on( {
                'focusin': function () {
                    focusin = $(this).val().length;
                },
                'keydown': function () {
                    focusin = null;
                },
                'keyup': function () {
                    var that = $(this);
                    if(that.val().length == self.options.len && focusin === null ) {
                        if (self.options.next === null) {
                            that.next().focus();
                        } else {
                            self.options.next.focus();
                        }
                    }
                }
            });
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new AutoTab(this, options));
            }
        });
    };
})(jQuery, window, document);