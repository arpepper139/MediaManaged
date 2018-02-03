Rails.application.routes.draw do
  root 'ownerships#index'

  get '/home', to: 'ownerships#index'
  get '/movies', to: 'ownerships#index'
  get '/shows', to: 'ownerships#index'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
