Wavly.Views.WaveNew = Backbone.View.extend({

  template: JST['waves/new'],
  
  initialize: function () {
    this.model.on("change", this.render, this);
  },
  
  render: function () {
    var renderedContent = this.template({
      waves: this.collection,
      thisWave: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }

});
