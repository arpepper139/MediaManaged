class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    query = params[:name]
    relevant_movies = Movie.where("name LIKE ?", "%#{query}%")
    relevant_shows = Show.where("name LIKE ?", "%#{query}%")
    relevant_results = relevant_shows + relevant_movies
    render json: {results: relevant_results}
  end
end
