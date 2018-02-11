class Api::V1::ShowsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.json? }

  def show
    @show = Show.find(params[:id])
    render json: @show
  end

  def create
    new_show = Show.new(show_params)
    if new_show.save
      user_id = current_user.id

      new_show.update_attributes(remote_poster_url: params[:show][:poster])
      ShowOwnership.create(user_id: user_id, show_id: new_show.id, user_rating: params[:user_rating])

      render json: { message: "Sucessfully added #{new_show.name}!" }, status: 201
    else
      render json: { error: "Whoops! Looks like we already have #{new_show.name}. If it's not in your personal collection, you can add it by searching above!" }, status: :unprocessable_entity
    end
  end

  private
    def show_params
      params.require(:show).permit(:name, :writer, :studio, :start_year, :end_year, :description, :rating)
    end
end
