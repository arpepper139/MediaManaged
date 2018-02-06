class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :writer, :studio, :poster, :start_year, :end_year, :description, :rating
end
