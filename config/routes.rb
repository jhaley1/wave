Wavly::Application.routes.draw do
  root :to => "root#root"
  
  resources :waves

  devise_for :users
    
end