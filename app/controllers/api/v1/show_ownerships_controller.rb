class Api::V1::ShowOwnershipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    user_id = current_user.id
    show_id = show_ownership_params[:show_id]

    show = ShowOwnership.new({user_id: user_id, show_id: show_id})
    if show_ownership_params[:user_rating] != ""
      show.user_rating = show_ownership_params[:user_rating]
    end

    if show.save
      render json: {message: "Sucessfully added!"}, status: 201
    else
      render json: { error: show.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def show_ownership_params
      params.require(:show_ownership).permit(:show_id, :user_rating)
    end
end
