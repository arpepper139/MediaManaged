class UserCurrentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :media

  def media
    media = [object.movies] << [object.shows]
    media.flatten.shuffle!
  end
end
