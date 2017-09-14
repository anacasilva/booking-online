define(function(require) {
    var ko = require("knockout"),
        $ = require("jquery"),
        stringTemplateEngine = require("stringTemplateEngine"),
        template = require("text!./clearable.html");

    ko.bindingHandlers.clearable = {
        init: function (element, valueAccessor) {
            var value = valueAccessor(),
                bindingContext = {
                    clear: function () {
                        value(undefined);
                    },
                    isNotEmpty: ko.computed(function () {
                        return this();
                    }, value)
                },
                options = {
                    templateEngine: stringTemplateEngine
                },
                span = document.createElement("SPAN");

            $(element).after(span);
            ko.renderTemplate(template, bindingContext, options, span, "replaceNode");
        }
    };
});
