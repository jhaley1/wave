class WavesController < ApplicationController
  respond_to :json
  
  def create
    @wave = current_user.waves.build(params[:wave])
    
    if @wave.save
      Pusher['meow'].trigger_async('created', @wave.to_json)
      
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
  def destroy
    @wave = current_user.waves.find(params[:id])
    
    if @wave.destroy
      Pusher['meow'].trigger_async('destroyed', { :id => params[:id] })
      
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
    @wave = Wave.find(params[:id].to_s)
    
    if @wave.update_attributes(params[:wave])
      Pusher['meow'].trigger_async('updated', @wave.to_json)
      
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
end
