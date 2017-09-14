define(["knockout"], function(ko) {
    //private template source that is simply a string
    var StringTemplateSource = function(template) {
        this.template = template;
    };

    StringTemplateSource.prototype.text = function() {
        return this.template;
    };

    var stringTemplateEngine = new ko.nativeTemplateEngine();
    stringTemplateEngine.makeTemplateSource = function(template) {
        return new StringTemplateSource(template);
    };

    return stringTemplateEngine;
});
