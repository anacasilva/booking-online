define(function(require) {
    var $ = require("jquery"),
        ko = require("knockout"),
	    eventManager = require("services/eventManager"),
        viewModel = {
			  hotels: ko.observableArray([])
		};
		
	eventManager.on("search:result", function(data) {
		viewModel.hotels(data);
	});

ko.components.register("search", {require: "components/search"});
ko.components.register("hotel-card", 
                       {require: "components/hotelCard"});

    $(function() {
        ko.applyBindings(viewModel);
    });
});
