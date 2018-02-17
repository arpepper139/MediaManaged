class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def current
    @current_user = current_user
    if @current_user != nil
      @user = User.find(current_user.id)
      render json: @user, serializer: UserCurrentSerializer
    else
      render json: { error: "Not logged in" }, status: 401
    end
  end
end
