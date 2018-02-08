class Api::V1::ShowOwnershipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    show = ShowOwnership.new(show_ownership_params)
    if show.save
      render json: {message: "Sucessfully added!"}
    else
      render json: { error: show.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def show_ownership_params
      params.require(:show_ownership).permit(:user_rating, :user_id, :show_id)
    end
end
