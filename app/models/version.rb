class Version < ActiveRecord::Base
  attr_accessible :title, :content, :wave_id
  
  belongs_to :wave
  
end
