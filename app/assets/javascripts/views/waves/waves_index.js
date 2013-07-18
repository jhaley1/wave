Wavly.Views.WavesIndex = Backbone.View.extend({

  template: JST['waves/index'],
  
  events: {
    
  },
  
  render: function () {
    var renderedContent = this.template({
      waves: this.collection
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  viewWave: function (event) {
    console.log(event.currentTarget.className);
    var waveId = event.currentTarget.className;
    
    event.preventDefault();
    
    Backbone.history.navigate("waves/" + waveId, { trigger: true })
  }

});
