class ShowOwnership < ApplicationRecord
  belongs_to :user
  belongs_to :show

  validates :user, presence: true
  validates :show, presence: true
  validates :user_rating,
    numericality: true,
    inclusion: { in: 1..5 }, allow_nil: true
end
