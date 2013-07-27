Wavly.Views.WavesIndex = Backbone.View.extend({

  template: JST['waves/index'],
  
  events: {
    "click button#js-new-wave": "newWave",
    "click #friend-add-button": "shareWave",
    "click button.back": "closeNewWave",
  },
  
  render: function () {
    var renderedContent = this.template({
      waves: this.collection
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  closeNewWave: function (event) {
    event.preventDefault();
    
    $(".lightbox").remove();
  },
  
  newWave: function (event) {
    event.preventDefault();
    
    $(".wave-content").append("<div class='lightbox'>" + JST['waves/new']() + "</div>");
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
    
      $(".added-to-wave").append(
        "<span class='friends-added'>" + email + "</span>"
      );
      
      $("#search-friends").val("");
    });
  },


});
