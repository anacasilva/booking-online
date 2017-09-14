define(function(require) {
    var ko = require("knockout"),
        template = require("text!./hotelCard.html");
    require("binding-handlers/button");

    function HotelCard(data) {
        ko.utils.extend(this, data);

        this.getThumb = function () {
            return this.image || "/images/default.jpg";
        };

        this.starRange = ko.utils.range(1, this.stars);
        var colors = ['bad', 'normal', 'normal', 'good', 'good'];
        this.starType = colors[this.stars - 1];
    }

    HotelCard.prototype.book = function () {
    };

    return {viewModel: HotelCard, template: template};
});
