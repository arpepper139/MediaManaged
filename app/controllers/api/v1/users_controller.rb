class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def current
    @current_user = current_user
    if @current_user != nil
      @user = User.find(current_user.id)
      render json: @user, serializer: UserCurrentSerializer
    else
      render json: nil, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end
end