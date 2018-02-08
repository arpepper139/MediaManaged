class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    query = params[:name]
    user_id = current_user.id

    relevant_movies = Movie.where("name LIKE ?", "%#{query}%")
    owned_movies = User.find(user_id).movies
    unowned_movie_results = relevant_movies.reject { |movie| owned_movies.include?(movie) }

    relevant_shows = Show.where("name LIKE ?", "%#{query}%")
    owned_shows = User.find(user_id).shows
    unowned_show_results = relevant_shows.reject { |show| owned_shows.include?(show) }

    relevant_results = unowned_movie_results + unowned_show_results
    render json: {results: relevant_results, message: "We found some matching media you don't already own!"}
  end
end
