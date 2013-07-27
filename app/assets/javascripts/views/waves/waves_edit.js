Wavly.Views.WaveEdit = Backbone.View.extend({

  template: JST['waves/edit'],
  
  events: {
    "click button#back-to-waves": "back",
    "click .friend-search-submit": "shareWave",
  },
  
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
      $(".add-user-to-wave").append(
        "<input type='hidden' name='wave[friend_ids][]' value='" + id + "'>"
      );
    
      $(".in-wave ul").append(
        "<li><span class='friends-shared'>" + email + "</span></li>"
      );

        var thisWaveId = $("#js-wave-id").val();
        var valuesToSubmit = $(".add-user-to-wave").serialize();
        console.log('hi')
        $.ajax({
          url: "/waves/" + thisWaveId,
          type: "PUT",
          data: valuesToSubmit
        });
        
        console.log('there')
      });
      
      $("#search-friends").val("");

  },

});
