class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: {message: "hello"}
  end
end
