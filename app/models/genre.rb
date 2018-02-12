class Genre < ApplicationRecord
  has_many :genre_assignments
  has_many :movies, through: :genre_assignments, source: :assignable, source_type: 'Movie'
  has_many :shows, through: :genre_assignments, source: :assignable, source_type: 'Show'

  validates :name, presence: true, uniqueness: true
end
