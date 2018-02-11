class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :writer, :studio, :poster, :start_year, :end_year, :description, :imdb_rating, :user_rating, :owned

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
      show_id = object.id
      ownership = ShowOwnership.where({user_id: user_id, show_id: show_id})
      if ownership == []
        nil
      else
        ownership[0].user_rating
      end
    end
  end
end
