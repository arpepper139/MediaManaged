class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :director, :studio, :poster, :year, :runtime, :description, :imdb_rating, :owned

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
end
