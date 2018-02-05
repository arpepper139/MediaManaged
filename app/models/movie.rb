class Movie < ApplicationRecord
  mount_uploader :poster, PosterUploader

  validates :name, presence: true
  validates :director, presence: true
  validates :year, presence: true, length: { is: 4 }
  validates :description,
    length: { maximum: 5000 }, allow_nil: true
  validates :rating,
    numericality: true,
    inclusion: { in: 1..5 }, allow_nil: true
end
