Wavly::Application.routes.draw do
  root :to => "root#root"
  
  resources :versions
  resources :waves

  devise_for :users
    
end