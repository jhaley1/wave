Wavly.Views.WaveEdit = Backbone.View.extend({

  template: JST['waves/edit'],
  
  events: {
    "click button#back-to-waves": "back",
    "click .friend-search-submit": "shareWave",
    "click #save-button": "createVersion",
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
  
  createVersion: function (event) {
    event.preventDefault();
    
    var _version = new Wavly.Models.Version ();
    var attrs = $('.wave').serializeJSON();
    var _wave = Wavly.waves.get(attrs.wave.id);
    

    var options = {
      success: function (model, response) {
        console.log(success);
      }
    };

    _version.set(attrs);
    _wave.get('versions').add(_version);
    _version.save({}, options);
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
      $.ajax({
        url: "/waves/" + thisWaveId,
        type: "PUT",
        data: valuesToSubmit
      });
    });
    
    $("#search-friends").val("");
},

});
