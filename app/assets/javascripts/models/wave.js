Wavly.Models.Wave = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'versions',
    relatedModel: 'Wavly.Models.Version',
    collectionType: 'Wavly.Collections.Versions'
  }]
  
});