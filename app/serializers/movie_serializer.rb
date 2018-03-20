class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :director, :studio, :poster, :year,
  :runtime, :description, :imdb_rating, :ownership_info, :genres

  def ownership_info
    if current_user != nil
      user_id = current_user.id
      movie_id = object.id
      ownership = MovieOwnership.where({user_id: user_id, movie_id: movie_id})
      if ownership == []
        return nil
      else
        info = {
          user_rating: ownership[0].user_rating,
          ownership_id: ownership[0].id
        }
        return info
      end
    end
  end

  def genres
    genre_names = object.genres.map { |genre| genre.name }
    genres_string = genre_names.sort.join(', ')
  end
end
