class Api::V1::MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def show
    @movie = Movie.find(params[:id])
    render json: @movie
  end

  def create
    new_movie = Movie.new(movie_params)
    if new_movie.save
      provided_genres = params[:genres]
      user_id = current_user.id

      new_movie.update_attributes(remote_poster_url: params[:movie][:poster])
      MovieOwnership.create(user_id: user_id, movie_id: new_movie.id, user_rating: params[:user_rating])

      if provided_genres != []
        provided_genres.each do |provided_genre|
          genre = Genre.where(name: provided_genre)[0]
          new_movie.genres << genre
        end
      end

      render json: { message: "Sucessfully added #{new_movie.name}!" }, status: 201
    else
      render json: { error: "Whoops! Looks like we already have #{new_movie.name}. If it's not in your personal collection, you can add it by searching above!" }, status: :unprocessable_entity
    end
  end

  private
    def movie_params
      params.require(:movie).permit(:name, :director, :studio, :year, :runtime, :description, :imdb_rating)
    end
end
