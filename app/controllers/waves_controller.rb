class WavesController < ApplicationController
  respond_to :json
  
  def create
    @wave = current_user.waves.build(params[:wave])
    
    if @wave.save
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
  def destroy
    @wave = current_user.waves.find(params[:id])
    current_user.waves.delete(@wave)
    
    render :json => @wave
  end
  
  def edit
    @wave = Wave.find(params[:id])
    
    render :edit
  end
  
  def index
    if current_user.shared_waves
      @waves = current_user.waves + current_user.shared_waves
    else
      @waves = current_user.waves
    end
    
    render :index
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
      Pusher['meow']
        .trigger_async('updated', @wave.to_json)
      
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
end
