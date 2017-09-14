define(function(require) {
    var ko = require("knockout"),
        $ = require("jquery"),
        autocomplete = require("ui/autocomplete");

    ko.bindingHandlers.autoComplete = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                allBindings = ko.utils.unwrapObservable(allBindingsAccessor()),
                options = allBindings.autoCompleteOptions || {},
                events = allBindings.autoCompleteEvents || {},
                $element = $(element);
            autocomplete(options, $element);

            if (options._renderItem) {
                var widget = $element.autocomplete("instance");
                widget._renderItem = options._renderItem;
            }

            for (var event in events) {
                ko.utils.registerEventHandler(element, event, events[event]);
            }

// handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $element.autocomplete("destroy");
            });
        },
        update: function(element, valueAccessor) {
            var value = valueAccessor(),
                $element = $(element),
                data = value();

            if (!data)
                $element.val("");
        }
    };
});
