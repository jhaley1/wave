Wavly::Application.routes.draw do
  root :to => "root#root"
  
  resources :verions
  resources :waves

  devise_for :users
    
end