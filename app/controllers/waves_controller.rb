class WavesController < ApplicationController
  respond_to :json
  
  def create
    @wave = current_user.build(params[:wave])
    
    if @wave.save
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
  def destroy
    @wave = current_user.waves.find(params[:id])
    
    if @wave.destroy
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
  def edit
    @wave = Wave.find(params[:id])
  end
  
  def index
    @waves = current_user.waves    
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
      @wave.save
      render :json => @wave
    else
      render :json => @wave.errors.full_messages
    end
  end
  
end
