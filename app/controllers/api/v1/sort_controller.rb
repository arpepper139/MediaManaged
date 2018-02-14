class Api::V1::SortController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def type
    user = current_user

    if user == nil
      render json: { error: "Not logged in" }, status: :unprocessable_entity
    elsif params[:return] == "movie"
      if user.movies == []
        render json: { results: "Nothing Found" }
      else
        render json: { results: user.movies }
      end
    elsif params[:return] == "show"
      if user.shows == []
        render json: { results: "Nothing Found" }
      else
        render json: { results: user.shows }
      end
    else
      render json: { error: "Please provide a valid sort parameter" }, status: :unprocessable_entity
    end
  end

  def genre
    user = current_user
    valid_genres = Genre.all.map { |genre| genre.name }

    if user != nil
      if valid_genres.include?(params[:return])
        sort_genre = params[:return]
        media = current_user.movies + current_user.shows

        returned_media = []
        media.each do |media_object|
          matches = media_object.genres.select { |assigned_genre| assigned_genre.name == sort_genre }
          if matches != []
            returned_media << media_object
          end
        end

        if returned_media == []
          render json: { results: "Nothing Found" }
        else
          render json: { results: returned_media }
        end
      else
        render json: { error: "Please provide a valid sort parameter" }, status: :unprocessable_entity
      end
    else
      render json: { error: "Not logged in" }, status: :unprocessable_entity
    end
  end

  def rating
    user = current_user
    provided_rating = params[:return].to_i
    valid_ratings = [1,2,3,4,5]

    if user != nil && valid_ratings.include?(provided_rating)
      ownerships = user.movie_ownerships + user.show_ownerships
      relevant_ownerships = ownerships.select { |ownership| ownership.user_rating == provided_rating }

      if relevant_ownerships == []
        render json: { results: "Nothing Found" }
      else
        relevant_media = []
        relevant_ownerships.each do |ownership|
          if ownership.class.name == "MovieOwnership"
            relevant_media << ownership.movie
          else
            relevant_media << ownership.show
          end
        end

        render json: { results: relevant_media}
      end
    elsif user!= nil
      render json: { error: "Please provide a valid sort parameter" }, status: :unprocessable_entity
    else
      render json: { error: "Not logged in" }, status: :unprocessable_entity
    end
  end
end
