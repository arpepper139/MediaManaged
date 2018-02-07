class Api::V1::ShowsController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def show
    @show = Show.find(params[:id])
    render json: @show
  end
end
