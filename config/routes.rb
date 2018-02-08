Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/home', to: 'static_pages#index'
  get '/movies/:id', to: 'static_pages#index'
  get '/shows/:id', to: 'static_pages#index'
  get '/media/new', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :users do
        get :current, on: :collection
      end

      resources :movies, only: [:show, :create]
      resources :shows, only: [:show, :create]
      resources :movie_ownerships, only: [:create]
      resources :show_ownerships, only: [:create]

      resources :search, only: [:index] do
        get :external, on: :collection
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
