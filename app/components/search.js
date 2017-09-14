define(function(require) {
    var ko = require("knockout"),
        template = require("text!./search.html"),
        Room = require("room"),
        rest = require("services/rest");
    require("binding-handlers/autocomplete");
    require("binding-handlers/datepicker");
    require("binding-handlers/clearable");
    require("binding-handlers/button");

    function Search() {

        this.rooms = ko.observableArray([]);

        this.numberOfRooms = ko.computed({
            read: function() {
                return this.rooms().length;
            },
            write: function(value) {
                var previousValue = this.rooms().length;

                if (value > previousValue) {
                    for (var i = previousValue; i < value; i++) {
                        this.rooms.push(new Room(i + 1));
                    }
                } else {
                    this.rooms().splice(value);
                    this.rooms.valueHasMutated();
                }
            },
            owner: this
        });

        this.destination = ko.observable();
        this.destination.options = {
            minLength: 3,
            source: rest.getDestinationByTerm,
            select: function(event, data) {
                this.destination(data.item);
            }.bind(this),
            _renderItem: function(ul, item) {
                return $("<li>").append(item.label).appendTo(ul);
            }
        };
        this.destination.events = {
            blur: function(event) {
                if (this.destination() &&
                    (event.currentTarget.value !==
                    this.destination().value)) {
                    this.destination(undefined);
                }
            }.bind(this)
        };

        this.checkIn = ko.observable();
        this.checkOut = ko.observable();

        this.isValid = ko.computed(function() {
            var d = this.destination(),
                cIn = this.checkIn(),
                cOut = this.checkOut();

            return d && cIn && cOut;
        }, this);
    }

    Search.prototype.execute = function() {
        rest.getHotelByDestination(this.destination());
    };

    Search.prototype.rangeOfRooms = ko.utils.range(1, 10);

    return {
        viewModel: Search,
        template: template
    };
});
