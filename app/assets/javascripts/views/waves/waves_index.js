Wavly.Views.WavesIndex = Backbone.View.extend({

  template: JST['waves/index'],
  
  events: {
    "click button#js-new-wave": "newWave",
    "click button.back": "closeNewWave",
    "click button.wave-delete": "deleteWave",
    "click #save-wave": "saveWave",
    "click #friend-add-button": "shareWave",
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
  
  deleteWave: function (event) {
    event.preventDefault();
    
    var _model = this.collection.get(event.target.id);
    
    var options = {
      success: function () {
        Backbone.history.navigate("#/", { trigger: true });
      }
    };

    _model.destroy(options);
  },
  
  newWave: function (event) {
    event.preventDefault();
    
    $(".wave-content").append("<div class='lightbox'>" + JST['waves/new']() + "</div>");
  },
  
  saveWave: function (event) {
    event.preventDefault();
    var that = this;
    
    var attrs = $(event.target.form).serializeJSON();
    var options = {
      success: function () {
        Backbone.history.navigate("#waves/" + that.model.id + "/edit",
         { trigger: true });
      },
      error: function (model, response) {
        $(function () {
          $("#content").prepend("<div class='alert alert-error'><a class='close' data-dismiss='alert'>×</a>" + response.responseText + "</div>")
        });
      }
    };

    this.model.set(attrs);

    if (this.model.isNew()) {
      this.collection.create(this.model, options);
    } else {
      this.model.save({}, options);
    }
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
