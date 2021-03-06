class Api::V1::ShowOwnershipsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def create
    user_id = current_user.id
    show_id = show_ownership_params[:show_id]

    show_ownership = ShowOwnership.new({user_id: user_id, show_id: show_id})
    if show_ownership_params[:user_rating] != ""
      show_ownership.user_rating = show_ownership_params[:user_rating]
    end

    if show_ownership.save
      show = Show.find(show_id)
      render json: { message: "Sucessfully added #{show.name}!" }, status: 201
    else
      render json: { error: show_ownership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    show_ownership = ShowOwnership.find(params[:id])
    show_ownership.update_attributes(show_ownership_params)
    if show_ownership.save
      render json: { user_rating: show_ownership.user_rating }
    else
      render json: { error: show_ownership.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    show_ownership = ShowOwnership.find(params[:id])
    show = show_ownership.show
    show_ownership.destroy
    render json: { message: "Removed #{show.name} from your collection."}
  end

  private
    def show_ownership_params
      params.require(:show_ownership).permit(:show_id, :user_rating)
    end
end
