class Movie < ApplicationRecord
  mount_uploader :poster, PosterUploader

  has_many :movie_ownerships
  has_many :users, through: :movie_ownerships

  validates :name, presence: true
  validates :director, presence: true
  validates :year, presence: true, length: { is: 4 }
  validates :description,
    length: { maximum: 5000 }, allow_nil: true
  validates :rating,
    numericality: true,
    inclusion: { in: 1..5 }, allow_nil: true
end
