class Api::V1::MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }

  def show
    movie = Movie.find(params[:id])
    render json: movie
  end

  def create
    movie_data = params[:movie] ? omdb_movie_params : form_movie_params
    new_movie = Movie.new(movie_data)
    if new_movie.save
      MovieOwnership.create(user_id: current_user.id, movie_id: new_movie.id, user_rating: params[:user_rating])
      add_genres(new_movie, params[:genres])
      render json: { message: "Sucessfully added #{new_movie.name}!" }, status: 201
    else
      render json: { error: "Whoops! Looks like we already have #{new_movie.name}. If it's not in your personal collection, you can add it by searching above!" }, status: :unprocessable_entity
    end
  end

  def update
    movie = Movie.find(params[:id])
    movie.poster = params[:poster]
    if movie.save
      render json: movie
    else
      render json: { error: "Oops! We had problems on our end. Try again." }, status: :unprocessable_entity
    end
  end

  private
    def omdb_movie_params
      params.require(:movie).permit(:name, :director, :studio, :year, :runtime, :description, :imdb_rating, :remote_poster_url)
    end

    def form_movie_params
      params.permit(:name, :director, :studio, :year, :runtime, :description, :imdb_rating, :poster)
    end

    def add_genres(movie, provided_genres)
      string_check = params[:genres].is_a? String
      genres_array = string_check ? provided_genres.split(",") : provided_genres
      if genres_array != [] && genres_array != nil
        genres_array.each do |genre|
          genre = Genre.where(name: genre)[0]
          movie.genres << genre
        end
      end
    end
end
