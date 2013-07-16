class RootController < ApplicationController
  before_filter :authenticate!

  def index
  end
  
  private
  
  def authenticate!
    unless current_user
      redirect_to new_user_session_url
    end
  end
  
end
