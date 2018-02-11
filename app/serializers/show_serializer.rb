class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :writer, :studio, :poster, :start_year, :end_year, :description, :imdb_rating, :ownership_info

  def ownership_info
    if current_user != nil
      user_id = current_user.id
      show_id = object.id
      ownership = ShowOwnership.where({user_id: user_id, show_id: show_id})
      if ownership == []
        nil
      else
        {
          user_rating: ownership[0].user_rating,
          ownership_id: ownership[0].id
        }
      end
    end
  end
end
