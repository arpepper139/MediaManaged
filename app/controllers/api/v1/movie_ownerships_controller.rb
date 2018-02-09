class Api::V1::MovieOwnershipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    user_id = current_user.id
    movie_id = movie_ownership_params[:movie_id]

    movie = MovieOwnership.new({user_id: user_id, movie_id: movie_id})
    if movie_ownership_params[:user_rating] != ""
      movie.user_rating = movie_ownership_params[:user_rating]
    end

    if movie.save
      render json: {message: "Sucessfully added!"}, status: 201
    else
      render json: { error: movie.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def movie_ownership_params
      params.require(:movie_ownership).permit(:movie_id, :user_rating)
    end
end
