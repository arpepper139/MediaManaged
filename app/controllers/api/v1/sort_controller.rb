class Api::V1::SortController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def type
    user = current_user
    provided_type = params[:return]

    if user == nil
      render json: { error: "Not logged in" }, status: 401
    elsif provided_type != "movie" && provided_type != "show"
      render json: { error: "Please provide a valid sort parameter" }, status: :unprocessable_entity
    else
      relevant_media = sort_by_type(user, provided_type)
      render json: relevant_media
    end
  end

  def genre
    user = current_user
    provided_genre = params[:return]
    valid_genres = Genre.all.map { |genre| genre.name }

    if user == nil
      render json: { error: "Not logged in" }, status: 401
    elsif valid_genres.include?(provided_genre)
      relevant_media = sort_by_genre(user, provided_genre)
      render json: relevant_media
    else
      render json: { error: "Please provide a valid sort parameter" }, status: :unprocessable_entity
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
    elsif user != nil
      render json: { error: "Please provide a valid sort parameter" }, status: :unprocessable_entity
    else
      render json: { error: "Not logged in" }, status: 401
    end
  end

  private

    def sort_by_type(user, type)
      plural_type = type + "s"
      if user.send(plural_type) == []
        results = { results: "Nothing Found" }
      else
        results = { results: user.send(plural_type) }
      end
      results
    end

    def sort_by_genre(user, genre)
      all_media = user.movies + user.shows
      returned_media = []

      all_media.each do |media_object|
        matches = media_object.genres.select { |assigned_genre| assigned_genre.name == genre }
        if matches != []
          returned_media << media_object
        end
      end

      if returned_media == []
        results = { results: "Nothing Found" }
      else
        results = { results: returned_media }
      end
      results
    end

    def sort_by_rating

    end

end
