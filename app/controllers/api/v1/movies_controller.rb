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
      user_id = current_user.id

      new_movie.update_attributes(remote_poster_url: params[:movie][:poster])
      MovieOwnership.create(user_id: user_id, movie_id: new_movie.id, user_rating: params[:user_rating])

      render json: { message: "#{new_movie.name} sucessfully added!" }
    else
      render json: { error: new_movie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def movie_params
      params.require(:movie).permit(:name, :director, :studio, :year, :runtime, :description, :imdb_rating)
    end
end
