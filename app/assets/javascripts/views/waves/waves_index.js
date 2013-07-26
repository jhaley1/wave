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
    
    $(".wave-container").append("<div class='lightbox'>" + JST['waves/new']() + "</div>");
  }

});
