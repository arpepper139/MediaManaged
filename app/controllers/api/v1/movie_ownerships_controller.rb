class Api::V1::MovieOwnershipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    movie = MovieOwnership.new(movie_ownership_params)
    if movie.save
      render json: {message: "Sucessfully added!"}
    else
      render json: { error: movie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def movie_ownership_params
      params.require(:movie_ownership).permit(:user_rating, :user_id, :movie_id)
    end
end
