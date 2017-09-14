define(function(require) {
    var ko = require("knockout"),
        $ = require("jquery"),
        eventManager = require("services/eventManager");

    function Rest() {
        $.ajax({
            url: "/server/hotels.json",
            success: function(data) {
                this.hotels = [];

                var index = 0;
                ko.utils.arrayForEach(data, function(country) {
                    ko.utils.arrayForEach(country.counties, function(county) {
                        ko.utils.arrayForEach(county.hotels, function(hotel) {
                            this.hotels.push({
                                id: index++,
                                hotel: hotel.name,
                                city: hotel.city || county.name,
                                country: country.name,
                                description: hotel.description || "",
                                image: hotel.image,
                                stars: Math.floor((Math.random() * 5) + 1)
                            });
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this)
        });
    }

    var rest = new Rest();

    Rest.prototype.getDestinationByTerm = function(request, response) {
        var hotels = ko.utils.arrayFilter(this.hotels, function(item) {
            var label = item.hotel +
                (item.city && (", " + item.city)) +
                (item.country && (", " + item.country));
            return (label.toLowerCase().indexOf(request.term.toLowerCase()) !== -1);
        });

        ko.utils.arrayForEach(hotels, function(item) {
            var text = item.hotel +
                (item.city && (", " + item.city)) +
                (item.country && (", " + item.country));
            item.label = text.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
            item.value = text;
        });

        response(hotels);
    }.bind(rest);

    Rest.prototype.getHotelByDestination = function(destination) {
        var selected = this.hotels[destination.id];

        var city = selected.city;
        var hotels = ko.utils.arrayFilter(this.hotels, function(item) {
            return item.city === city;
        });

        if (hotels.length < 1) {
            var country = selected.country;
            hotels = ko.utils.arrayFilter(this.hotels, function(item) {
                return item.country === country;
            });
        }

        hotels = ko.utils.arrayMap(hotels, function(item) {
            return $.extend({
                price: Math.floor((Math.random() * 200) + 1) + "£"
            }, item);
        });

        eventManager.trigger("search:result", hotels);
    }.bind(rest);

    return rest;
});