class Api::V1::ShowsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }

  def show
    show = Show.find(params[:id])
    render json: show
  end

  def create
    show_data = params[:show] ? omdb_show_params : form_show_params
    new_show = Show.new(show_data)
    if new_show.save
      ShowOwnership.create(user_id: current_user.id, show_id: new_show.id, user_rating: params[:user_rating])
      add_genres(new_show, params[:genres])
      render json: { message: "Sucessfully added #{new_show.name}!" }, status: 201
    else
      render json: { error: "Whoops! Looks like we already have #{new_show.name}. If it's not in your personal collection, you can add it by searching above!" }, status: :unprocessable_entity
    end
  end

  def update
    show = Show.find(params[:id])
    show.poster = params[:poster]
    if show.save
      render json: show
    else
      render json: { error: "Oops! We had problems on our end. Try again." }, status: :unprocessable_entity
    end
  end

  private
    def omdb_show_params
      params.require(:show).permit(:name, :writer, :studio, :start_year, :end_year, :description, :imdb_rating, :remote_poster_url)
    end

    def form_show_params
      params.permit(:name, :writer, :studio, :start_year, :end_year, :description, :imdb_rating, :poster)
    end

    def add_genres(show, provided_genres)
      string_check = params[:genres].is_a? String
      genres_array = string_check ? provided_genres.split(",") : provided_genres
      if genres_array != [] && genres_array != nil
        genres_array.each do |genre|
          genre = Genre.where(name: genre)[0]
          show.genres << genre
        end
      end
    end
end
