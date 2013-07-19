var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backbone.RealtimeView = (function(_super) {

  __extends(RealtimeView, _super);

  function RealtimeView() {
    return RealtimeView.__super__.constructor.apply(this, arguments);
  }

  RealtimeView.prototype.events = {};

  RealtimeView.prototype.channel = null;

  RealtimeView.prototype.delegateEvents = function(events) {
    RealtimeView.__super__.delegateEvents.call(this, events);
    return this._setupPusher();
  };

  RealtimeView.prototype._setupPusher = function() {
    var channel;
    if (_.isFunction(this[this.channel])) {
      channel = this[this.channel].apply(this);
    } else {
      channel = this.channel;
    }
    if ((channel != null) && (typeof pusherToken !== "undefined" && pusherToken !== null)) {
      this.pusher = new Pusher(pusherToken);
      this.pusherChannel = this.pusher.subscribe(channel);
      return this._bindEvents();
    }
  };

  RealtimeView.prototype.event = function(eventName, callback) {
    var self,
      _this = this;
    self = this;
    return this.pusherChannel.bind(eventName, function(params) {
      callback.apply(self, [params]);
      return _this.trigger.apply(self, ["event:" + eventName].concat(params));
    });
  };

  RealtimeView.prototype._bindEvents = function() {
    var event, events, i, l, _results;
    if (!((this.events != null) && (this.pusherChannel != null))) {
      return;
    }
    events = [];
    for (event in this.events) {
      events.unshift([event, this.events[event]]);
    }
    i = 0;
    l = events.length;
    _results = [];
    while (i < l) {
      this.event(events[i][0], this[events[i][1]]);
      _results.push(i++);
    }
    return _results;
  };

  return RealtimeView;

})(Backbone.View);
