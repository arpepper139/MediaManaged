class UserCurrentSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :media

  def media
    media = [object.movies] << [object.shows]
    sorted_media = media.flatten.sort_by { |media| media.name.downcase }
  end
end
