class MovieOwnership < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :user, presence: true
  validates :movie, presence: true
  validates :user_rating,
    numericality: true,
    inclusion: { in: 1..5 }, allow_nil: true
end
