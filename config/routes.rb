Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  get '/home', to: 'static_pages#index'
  get '/movies/:id', to: 'static_pages#index'
  get '/shows/:id', to: 'static_pages#index'
  get '/media/new', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :users do
        get :current, on: :collection
      end

      resources :movies, only: [:show, :create, :update]
      resources :movie_ownerships, only: [:create, :update, :destroy]

      resources :shows, only: [:show, :create, :update]
      resources :show_ownerships, only: [:create, :update, :destroy]

      resources :genres, only: [:index]

      resources :search, only: [:index] do
        get :external, on: :collection
      end

      resources :sort, only: [] do
        get :type, on: :collection
        get :genre, on: :collection
        get :rating, on: :collection
      end
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
