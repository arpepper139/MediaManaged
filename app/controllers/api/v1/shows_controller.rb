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

      render json: { message: "#{new_show.name} sucessfully added!" }
    else
      render json: { error: new_show.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    def show_params
      params.require(:show).permit(:name, :writer, :studio, :start_year, :end_year, :description, :rating)
    end
end
