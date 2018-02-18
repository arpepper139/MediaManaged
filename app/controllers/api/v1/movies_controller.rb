class Api::V1::MoviesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }

  def show
    movie = Movie.find(params[:id])
    render json: movie
  end

  def create
    if params[:movie]
      new_movie = Movie.new(movie_params)
    else
      new_movie = Movie.new(
        name: params[:name],
        director: params[:director],
        studio: params[:studio],
        year: params[:year],
        runtime: params[:runtime],
        description: params[:description],
        imdb_rating: params[:imdb_rating]
      )
    end

    if new_movie.save
      if params[:movie]
        new_movie.update_attributes(remote_poster_url: params[:movie][:poster])
      else
        new_movie.update_attributes(poster: params[:poster])
      end

      user_id = current_user.id
      MovieOwnership.create(user_id: user_id, movie_id: new_movie.id, user_rating: params[:user_rating])

      if params[:genres].is_a? String
        provided_genres = params[:genres].split(",")
      else
        provided_genres = params[:genres]
      end

      if provided_genres != [] && provided_genres != nil
        provided_genres.each do |provided_genre|
          genre = Genre.where(name: provided_genre)[0]
          new_movie.genres << genre
        end
      end
      
      render json: { message: "Sucessfully added #{new_movie.name}!" }, status: 201
    else
      render json: { error: "Whoops! Looks like we already have #{new_movie.name}. If it's not in your personal collection, you can add it by searching above!" }, status: :unprocessable_entity
    end
  end

  def update
    movie = Movie.find(params[:id])
    movie.poster = params[:poster]
    if movie.save
      render json: movie
    else
      render json: { error: "Oops! We had problems on our end. Try again." }, status: :unprocessable_entity
    end
  end

  private
    def movie_params
      params.require(:movie).permit(:name, :director, :studio, :year, :runtime, :description, :imdb_rating, :poster)
    end
end
