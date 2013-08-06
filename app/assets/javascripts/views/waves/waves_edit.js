Wavly.Views.WaveEdit = Backbone.View.extend({

  template: JST['waves/edit'],
  
  events: {
    "click button#back-to-waves": "back",
    "click .friend-search-submit": "shareWave",
    "click #save-button": "createVersion",
    "click .version-link": "viewVersion",
    "click .revert-button": "revertToCurrent",
    "click .commit-button": "commitToVersion",
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
    
    $(function () {
      $("#slider").slider({
        value: 100,
        min: 0,
        max: 500,
        step: 50,
        slide: function (event, ui) {
          $("#amount").val("$" + ui.value);
        }
      });
      $("#amount").val("$" + $("#slider").slider("value"));
    });
  
    return this;
  },
  
  back: function (event) {
    event.preventDefault();
    
    Wavly.router.navigate("#/", { trigger: true });
  },
  
  commitToVersion: function (event) {
    event.preventDefault();

    $('#wave-title')
      .prop('readonly', false);
    $('#wave-content')
      .prop('readonly', false);
      
    var valuesToSubmit = $('.wave').serialize();
    var thisWaveId = $('#js-wave-id').val();
    
    $.ajax({
      url: '/waves/' + thisWaveId,
      type: 'PUT',
      data: valuesToSubmit
    });
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
  
  revertToCurrent: function (event) {
    $('#wave-title')
      .val(this.currentTitle)
      .prop('readonly', false);
    $('#wave-content')
      .val(this.currentContent)
      .prop('readonly', false);
  },
  
  viewVersion: function (event) {
    event.preventDefault();
    
    this.currentTitle = $('#wave-title').val();
    this.currentContent = $('#wave-content').val();
    
    var thisVersionId = $(event.target).attr('data-id');
    var theseVersions = this.model.get('versions');
    var thisVersion;
    var thisVersion = this.model.get('versions').get(thisVersionId);
    
    $('#wave-title')
      .val(thisVersion.get('title'))
      .prop('readonly', true);
    $('#wave-content')
      .val(thisVersion.get('content'))
      .prop('readonly', true);
  }

});
