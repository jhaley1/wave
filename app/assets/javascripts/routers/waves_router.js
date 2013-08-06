Wavly.Routers.Waves = Backbone.Router.extend({
  routes: {
    "": "index",
    "waves/new": "newWave",
    "waves/:id/edit": "editWave",
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  index: function () {
    var _wave = new Wavly.Models.Wave ();
    
    var indexView = new Wavly.Views.WavesIndex ({
      collection: Wavly.waves,
      model: _wave
    });

    this._swapView(indexView);
  },
  
  editWave: function (id) {
    var wave = Wavly.waves.get(id);
    
    var editView = new Wavly.Views.WaveEdit ({
      collection: Wavly.waves,
      model: wave
    });
    
    this._swapView(editView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
  
});
