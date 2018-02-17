class Api::V1::ShowsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }

  def show
    show = Show.find(params[:id])
    render json: show
  end

  def create
    if params[:show]
      new_show = Show.new(show_params)
    else
      new_show = Show.new(
        name: params[:name],
        writer: params[:writer],
        studio: params[:studio],
        start_year: params[:start_year],
        end_year: params[:end_year],
        description: params[:description],
        imdb_rating: params[:imdb_rating]
      )
    end

    if new_show.save
      if params[:show]
        new_show.update_attributes(remote_poster_url: params[:show][:poster])
      else
        new_show.update_attributes(poster: params[:poster])
      end

      user_id = current_user.id
      ShowOwnership.create(user_id: user_id, show_id: new_show.id, user_rating: params[:user_rating])

      if params[:genres].is_a? String
        provided_genres = params[:genres].split(",")
      else
        provided_genres = params[:genres]
      end

      if provided_genres != [] && provided_genres != nil
        provided_genres.each do |provided_genre|
          genre = Genre.where(name: provided_genre)[0]
          new_show.genres << genre
        end
      end

      render json: { message: "Sucessfully added #{new_show.name}!" }, status: 201
    else
      render json: { error: "Whoops! Looks like we already have #{new_show.name}. If it's not in your personal collection, you can add it by searching above!" }, status: :unprocessable_entity
    end
  end

  def update
    show = Show.find(params[:id])
    show.poster = params[:poster]
    if show.save
      render json: show
    else
      render json: { error: "Oops! We had problems on our end. Try again." }, status: :unprocessable_entity
    end
  end

  private
    def show_params
      params.require(:show).permit(:name, :writer, :studio, :start_year, :end_year, :description, :rating, :poster)
    end
end
