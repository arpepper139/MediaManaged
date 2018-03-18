class Api::V1::SearchController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if params[:name] == nil
      render json: { error: "Please provide a search term" }, status: :unprocessable_entity
    else
      query = params[:name].strip.downcase
      user_id = current_user.id
      relevant_results = get_relevant_results(query, user_id)

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
        genres_array = get_database_genres(response["Genre"])
      end

      db_check_title = response["Title"] ? response["Title"] : query

      if in_database?(db_check_title)
        render json: format_response(db_check_title, nil, true)
      elsif response["Type"] == "movie"
        formatted_movie = format_movie(response, genres_array)
        render json: format_response(formatted_movie, "movie", false)
      elsif response["Type"] == "series"
        formatted_show = format_show(response, genres_array)
        render json: format_response(formatted_show, "show", false)
      else
        render json: format_response(nil, nil, false)
      end
    end
  end

  private

    def get_relevant_results(query, user_id)
      relevant_movies = Movie.where("LOWER(name) LIKE ?", "%#{query}%")
      owned_movies = User.find(user_id).movies
      unowned_movie_results = relevant_movies.reject { |movie| owned_movies.include?(movie) }

      relevant_shows = Show.where("LOWER(name) LIKE ?", "%#{query}%")
      owned_shows = User.find(user_id).shows
      unowned_show_results = relevant_shows.reject { |show| owned_shows.include?(show) }

      relevant_results = unowned_movie_results + unowned_show_results
    end

    def get_database_genres(genres_string)
      supplied_genres = genres_string.split(', ')
      database_genres = Genre.where(name: supplied_genres)

      genre_array = database_genres.map { |genre| genre.name }
    end

    def in_database?(title)
      show_db_check = Show.where(name: title)
      movie_db_check = Movie.where(name: title)

      in_database = (show_db_check != [] || movie_db_check != []) ? true : false
    end

    def format_response(found_media, type, in_database)
      response = {
        found_media: found_media,
        type: type,
        in_database: in_database
      }
    end

    def format_movie(response, genres)
      formatted_movie = {
        name: response["Title"],
        director: response["Director"],
        studio: response["Production"],
        poster: response["Poster"],
        year: response["Year"],
        runtime: response["Runtime"],
        description: response["Plot"],
        imdb_rating: response["imdbRating"],
        genres: genres
      }
    end

    def format_show(response, genres)
      years = response["Year"].split("–")
      formatted_show = {
        name: response["Title"],
        writer: response["Writer"],
        poster: response["Poster"],
        start_year: years[0],
        end_year: years[1],
        description: response["Plot"],
        imdb_rating: response["imdbRating"],
        genres: genres
      }
    end
end
