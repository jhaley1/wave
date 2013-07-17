window.Wavly = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    Wavly.waves = new Wavly.Collections.Waves ();
    
    Wavly.waves.fetch({
      success: function () {
        new Wavly.Routers.Waves ({
          $rootEl: $(".wave")
        });
        
        Backbone.history.start();
      }
    });
  }
};

$(function(){
  Wavly.initialize();
});
