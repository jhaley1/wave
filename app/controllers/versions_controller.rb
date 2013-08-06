class VersionsController < ApplicationController
  def create
    debugger
    @wave = Wave.find(params[:wave][:id])
    @version = @wave.versions.build({
      wave_id: params[:wave][:id],
      title: params[:wave][:title],
      content: params[:wave][:content]
    })
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
