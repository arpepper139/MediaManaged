class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :director, :studio, :poster, :year, :runtime, :description, :rating
end
