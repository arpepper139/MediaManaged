class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if params[:name] == nil
      render json: { error: "Please provide a search term" }, status: :unprocessable_entity
    else
      query = params[:name].strip.downcase
      user_id = current_user.id

      relevant_movies = Movie.where("LOWER(name) LIKE ?", "%#{query}%")
      owned_movies = User.find(user_id).movies
      unowned_movie_results = relevant_movies.reject { |movie| owned_movies.include?(movie) }

      relevant_shows = Show.where("LOWER(name) LIKE ?", "%#{query}%")
      owned_shows = User.find(user_id).shows
      unowned_show_results = relevant_shows.reject { |show| owned_shows.include?(show) }

      relevant_results = unowned_movie_results + unowned_show_results

      render json: {results: relevant_results, message: "Here's what we found."}
    end
  end

  def external
    if params[:name] == nil
      render json: { error: "Please provide a search term" }, status: :unprocessable_entity
    else
      query = params[:name].strip.downcase

      response = HTTParty.get("http://www.omdbapi.com/?t=#{query}&apikey=#{ENV["API_KEY"]}")
      default_response = { message: "We couldn't find anything on Omdb, but you can add the movie below!" }

      if response["Type"] == "movie"
        processed_response = {
            movie: {
              name: response["Title"],
              director: response["Director"],
              studio: response["Production"],
              poster: response["Poster"],
              year: response["Year"],
              runtime: response["Runtime"],
              description: response["Plot"],
              imdb_rating: response["imdbRating"]
            },
            message: "Movie Found! Add #{response["Title"]} through the form below."
          }
      elsif response["Type"] == "series"
        years = response["Year"].split("–")
        processed_response = {
          show: {
            name: response["Title"],
            writer: response["Writer"],
            poster: response["Poster"],
            start_year: years[0],
            end_year: years[1],
            description: response["Plot"],
            imdb_rating: response["imdbRating"]
          },
          message: "Show Found! Add #{response["Title"]} through the form below."
        }
      else
        processed_response = default_response
      end

      render json: processed_response
    end
  end
end
