define(function(require) {
    var ko = require("knockout"),
        $ = require("jquery");
    require("ui/datepicker");

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor) {
            var value = valueAccessor(),
                $element = $(element);

            $element.datepicker({
                onSelect: function (dateText, inst) {
                    value($element.datepicker("getDate"));
                },
                numberOfMonths: 2
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datepicker("destroy");
            });

        },
        update: function (element, valueAccessor) {
            var value = valueAccessor(),
                $element = $(element),
                data = value();

            if (!data)
                $element.datepicker("setDate", undefined);
        }
    };
});
