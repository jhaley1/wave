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
    debugger
    @wave = current_user.waves.where(id: params[:id])

    if @wave == []
      @wave = current_user.shared_waves.where(id: params[:id])
      is_a_shared_wave = true
    end
    
    current_user.waves.delete(@wave)
    current_user.shared_waves.delete(@wave) if is_a_shared_wave
    
    current_user.save!
    
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
