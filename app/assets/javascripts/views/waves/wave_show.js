Wavly.Views.WaveShow = Backbone.View.extend({

  template: JST['waves/show'],
  
  render: function () {
    var renderedContent = this.template({
      waves: this.collection,
      thisWave: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }

});
