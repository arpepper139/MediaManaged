class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def current
    @current_user = current_user
    render json: { current_user: @current_user}
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end
end
