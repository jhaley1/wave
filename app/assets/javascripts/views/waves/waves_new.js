Wavly.Views.WaveNew = Backbone.View.extend({

  template: JST['waves/new'],
  
  events: {
    "click .friend-search-submit": "shareWave",
  },

  render: function () {
    var renderedContent = this.template({
      waves: this.collection,
      thisWave: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  shareWave: function (event) {
    event.preventDefault();
    
    var ev = $("ul.typeahead.dropdown-menu").find('li.active').data('value');
    var userObj = userObjs[ev];
    var id = userObj.id;
    var email = userObj.email;
    
    $(function () {
      $(".wave-participants").append(
        "<input type='hidden' name='wave[friend_ids][]' value='" + id + "'>"
      );
    
      $(".in-wave ul").append(
        "<li><span class='friends-shared'>" + email + "</span></li>"
      );
      
      $("#search-friends").val("");
  },

});
