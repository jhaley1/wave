Wavly.Views.WaveEdit = Backbone.View.extend({

  template: JST['waves/edit'],
  
  events: {
    "button .back": "back",
  },
  
  initialize: function () {
    this.model.on("change", this.render, this);
  },
  
  render: function () {
    console.log(this.model);
    var renderedContent = this.template({
      waves: this.collection,
      thisWave: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  back: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  }

});
