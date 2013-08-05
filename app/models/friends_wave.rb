class FriendsWave < ActiveRecord::Base
  attr_accessible :friend_id, :shared_wave_id

  belongs_to :shared_wave, :class_name => "Wave"
  belongs_to :friend, :class_name => "User"
  
end
