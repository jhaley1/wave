Wavly.Routers.Waves = Backbone.Router.extend({
  routes: {
    "": "index",
    "waves/new": "newWave",
    "waves/:id": "showWave",
    "waves/:id/edit": "editWave",
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  index: function () {
    var indexView = new Wavly.Views.WavesIndex ({
      collection: Wavly.waves
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
  
  newWave: function () {
    var wave = new Wavly.Models.Wave ();
    
    var newView = new Wavly.Views.WaveNew ({
      collection: Wavly.waves,
      model: wave
    });
    
    this._swapView(newView);
  },
  
  showWave: function (id) {
    var wave = Wavly.waves.get(id);
    
    var showView = new Wavly.Views.WaveShow ({
      model: wave
    });
    
    this._swapView(showView);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
  
});
