window.Wavly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    Wavly.waves = new Wavly.Collections.Waves ();
    
    Wavly.waves.fetch({
      success: function () {
        Wavly.router = new Wavly.Routers.Waves ({
          $rootEl: $(".wave-container")
        });
        
        Backbone.history.start();
      }
    });
  }
};

$(function(){
  Wavly.initialize();
});
