class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :director, :studio, :poster, :year, :runtime, :description, :imdb_rating, :user_rating, :owned

  def owned
    if current_user != nil
      owner_ids = object.users.map { |user| user.id }
      if owner_ids.include?(current_user.id)
        return true
      else
        return false
      end
    end
  end

  def user_rating
    if current_user != nil
      user_id = current_user.id
      movie_id = object.id
      ownership = MovieOwnership.where({user_id: user_id, movie_id: movie_id})
      if ownership == []
        nil
      else
        ownership[0].user_rating
      end
    end
  end
end
