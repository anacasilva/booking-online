define(function(require) {
    function EventManager() {
        this.listener = {};
    }

    EventManager.prototype.on = function(eventName, callback) {
        this.listener[eventName] = this.listener[eventName] || [];
        this.listener[eventName].push(callback);
    };

    EventManager.prototype.off = function(eventName, callback) {
        this.listener[eventName].remove(callback);
    };

    EventManager.prototype.trigger = function(eventName, parameters) {
        var callbacks = this.listener[eventName] || [];
        for (var callback in callbacks) {
            callbacks[callback](parameters);
        }
    };

    return new EventManager();
});