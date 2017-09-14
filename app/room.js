define(function(require) {
    var ko = require("knockout");

    function Room(roomNumber) {
        this.roomNumber = roomNumber;

        this.numberOfAdults = ko.observable(2);
        this.ageOfChildren = ko.observableArray([]);

        this.numberOfChildren = ko.computed({
            read: function() {
                return this.ageOfChildren().length;
            },
            write: function(value) {
                var previousValue = this.ageOfChildren().length;

                if (value > previousValue) {
                    for (var i = previousValue; i < value; i++) {
                        this.ageOfChildren.push(ko.observable(0));
                    }
                } else {
                    this.ageOfChildren().splice(value);
                    this.ageOfChildren.valueHasMutated();
                }
            },
            owner: this
        });

        this.hasChildren = ko.computed(function() {
            return this.numberOfChildren() > 0;
        }, this);
    }

    Room.prototype.rangeOfAdults = ko.utils.range(1, 10);
    Room.prototype.rangeOfChildren = ko.utils.range(0, 10);
    Room.prototype.rangeOfAge = ko.utils.range(0, 17);

    return Room;
});
