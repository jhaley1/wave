class VersionsController < ApplicationController
  def create
    @wave = Wave.find(params[:wave][:id])
    @version = @wave.build(params[:wave])
    @version.save_time = Time.now
    
    if @version.save!
      render :json => @version
    else
      render :json => @version.errors.full_messages
    end
  end
  
  def edit
    @version = Version.new
    
    render :json
  end
  
  def show
    @version = Version.find(params[:id])
    
    render :json => @version
  end
end
