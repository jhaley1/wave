class Wave < ActiveRecord::Base
  attr_accessible :title, :content, :user_id

  before_create :create_token

  belongs_to :user
  
  has_many :friends_waves, :foreign_key => :shared_wave_id
  has_many :friends, :through => :friends_waves
  
  def self.find_by_token(token)
    self.includes(:items).where(:token => token).limit(1).first
  end
  
  def channel_name
    @channel_name ||= "list-#{Rails.env}-#{strip_for_channel_name(self.token)}"
  end

  private

  def create_token
    self.token = strip_for_channel_name(ActiveSupport::SecureRandom.base64(8))
  end

  def strip_for_channel_name(str)
    str.gsub("/","").gsub("+","").gsub(/=+$/,"")
  end
  
end
