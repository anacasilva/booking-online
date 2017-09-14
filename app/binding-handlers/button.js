define(function(require) {
    var ko = require("knockout"),
        $ = require("jquery"),
        button = require("ui/button");

    ko.bindingHandlers.button = {
        init: function (element, valueAccessor) {
            button({}, element);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(element).button("destroy");
                }
            );
        }
    };
});