class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :writer, :studio, :poster, :start_year, :end_year, :description, :rating, :owned

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
