Wavly.Views.WaveEdit = Backbone.View.extend({

  template: JST['waves/edit'],
  
  events: {
    "button #back": "back",
    "click .friend-search-submit": "shareWave",
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
    Wavly.router.navigate("#/", { trigger: true });
  },
  
  shareWave: function (event) {
    event.preventDefault();
    
    var ev = $("ul.typeahead.dropdown-menu").find('li.active').data('value');
    var userObj = userObjs[ev];
    var id = userObj.id;
    var email = userObj.email;
    
    $(function () {
      $(".wave").append(
        "<input type='hidden' name='wave[friend_ids][]' value='" + id + "'>"
      );
    
      $(".in-wave ul").append(
        "<li><span class='friends-shared'>" + email + "</span></li>"
      );
      
      $("#search-friends").val("");
    });  
  },

});
