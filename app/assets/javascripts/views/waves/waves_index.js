Wavly.Views.WavesIndex = Backbone.View.extend({

  template: JST['waves/index'],
  
  events: {
    "click button#js-new-wave": "newWave",
  },
  
  render: function () {
    var renderedContent = this.template({
      waves: this.collection
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  newWave: function (event) {
    event.preventDefault();
    
    Backbone.history.navigate("waves/new", { trigger: true });
  },
  
  viewWave: function (event) {
    console.log(event.currentTarget.className);
    var waveId = event.currentTarget.className;
    
    event.preventDefault();
    
    Backbone.history.navigate("waves/" + waveId, { trigger: true });
  }

});
