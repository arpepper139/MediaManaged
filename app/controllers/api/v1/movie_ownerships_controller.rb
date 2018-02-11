class Api::V1::MovieOwnershipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    user_id = current_user.id
    movie_id = movie_ownership_params[:movie_id]

    movie_ownership = MovieOwnership.new({user_id: user_id, movie_id: movie_id})
    if movie_ownership_params[:user_rating] != ""
      movie_ownership.user_rating = movie_ownership_params[:user_rating]
    end

    if movie_ownership.save
      movie = Movie.find(movie_id)
      render json: { message: "Sucessfully added #{movie.name}!" }, status: 201
    else
      render json: { error: movie_ownership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    movie_ownership = MovieOwnership.find(params[:id])
    movie_ownership.update_attributes(movie_ownership_params)
    if movie_ownership.save
      render json: { user_rating: movie_ownership.user_rating }
    else
      render json: { error: movie_ownership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def movie_ownership_params
      params.require(:movie_ownership).permit(:movie_id, :user_rating)
    end
end
