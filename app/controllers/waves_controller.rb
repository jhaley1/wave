class WavesController < ApplicationController
  respond_to :json
  
  def create
    @wave = current_user.build(params[:wave])
    
    if @wave.save
      Pusher['mice ']
        .trigger('created', @wave.to_json,
          request.headers["X-Pusher-Socket-ID"])
      
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
  def destroy
    @wave = current_user.waves.find(params[:id])
    
    if @wave.destroy
      Pusher[@wave.channel_name]
        .trigger('destroyed', 
          {:id => params[:id]}, 
          request.headers["X-Pusher-Socket-ID"])
      
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
  def edit
    @wave = Wave.find(params[:id])
  end
  
  def index
    if current_user.friends_waves
      @waves = current_user.waves + current_user.shared_waves
    else
      @waves = current_user.waves
    end
    
    render :json => @waves
  end
  
  def new
    @wave = Wave.new
  end
  
  def show
    @wave = Wave.find(params[:id])
    
    render :json => @wave
  end
  
  def update
    @wave = Wave.find(params[:id])
    
    if @wave.update_attributes(params[:wave])
      Pusher[@wave.channel_name]
        .trigger('updated', item.attributes,
          request.headers["X-Pusher-Socket-ID"])
      
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
end
