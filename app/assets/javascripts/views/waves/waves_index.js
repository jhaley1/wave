Wavly.Views.WavesIndex = Backbone.View.extend({

  template: JST['waves/index'],
  
  render: function () {
    var renderedContent = this.template({
      waves: this.collection
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }

});
