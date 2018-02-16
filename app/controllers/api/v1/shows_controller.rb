class Api::V1::ShowsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  protect_from_forgery unless: -> { request.format.form_data? || request.format.json? }

  def show
    show = Show.find(params[:id])
    render json: show
  end

  def create
    new_show = Show.new(show_params)
    if new_show.save
      provided_genres = params[:genres]
      user_id = current_user.id


      #refactor this to conditionally add via dropzone
      new_show.update_attributes(remote_poster_url: params[:show][:poster])


      ShowOwnership.create(user_id: user_id, show_id: new_show.id, user_rating: params[:user_rating])

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
      render json: { error: "Oops! We had problems on our end. Try again." }
    end
  end

  private
    def show_params
      params.require(:show).permit(:name, :writer, :studio, :start_year, :end_year, :description, :rating, :poster)
    end
end
