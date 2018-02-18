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

      render json: { results: relevant_results[0..9], message: "Here's what we found." }
    end
  end

  def external
    if params[:name] == nil
      render json: { error: "Please provide a search term" }, status: :unprocessable_entity
    else
      query = params[:name].strip.downcase

      response = HTTParty.get("http://www.omdbapi.com/?t=#{query}&apikey=#{ENV["API_KEY"]}")

      if response["Genre"] != nil
        supplied_genres = response["Genre"].split(', ')
        database_genres = Genre.where(name: supplied_genres)
        genre_array = database_genres.map { |genre| genre.name }
      end

      show_db_check = Show.where(name: response["Title"])
      movie_db_check = Movie.where(name: response["Title"])

      if show_db_check != [] || movie_db_check != []
        render json: {
          found_media: response["Title"],
          type: nil,
          in_database: true
        }
      elsif response["Type"] == "movie"
        processed_response = {
            name: response["Title"],
            director: response["Director"],
            studio: response["Production"],
            poster: response["Poster"],
            year: response["Year"],
            runtime: response["Runtime"],
            description: response["Plot"],
            imdb_rating: response["imdbRating"],
            genres: genre_array
          }
          render json: {
            found_media: processed_response,
            type: "movie",
            in_database: false
          }
      elsif response["Type"] == "series"
        years = response["Year"].split("–")
        processed_response = {
          name: response["Title"],
          writer: response["Writer"],
          poster: response["Poster"],
          start_year: years[0],
          end_year: years[1],
          description: response["Plot"],
          imdb_rating: response["imdbRating"],
          genres: genre_array
        }
        render json: {
          found_media: processed_response,
          type: "show",
          in_database: false
        }
      else
        render json: {
          found_media: nil,
          type: nil,
          in_database: false
        }
      end
    end
  end
end
