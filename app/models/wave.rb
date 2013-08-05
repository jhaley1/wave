class Wave < ActiveRecord::Base
  attr_accessible :title, :content, :user_id, :friend_ids

  belongs_to :user
  
  has_many :versions
  
  has_many :friends_waves, :foreign_key => :shared_wave_id
  has_many :friends, :through => :friends_waves
  
end
