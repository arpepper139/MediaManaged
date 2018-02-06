class Show < ApplicationRecord
  mount_uploader :poster, PosterUploader

  has_many :show_ownerships
  has_many :users, through: :show_ownerships

  validates :name, presence: true
  validates :writer, presence: true
  validates :start_year, presence: true, length: { is: 4 }
  validates :end_year, length: { is: 4 }, allow_blank: true
  validates :description,
    length: { maximum: 5000 }, allow_nil: true
  validates :rating,
    numericality: true,
    inclusion: { in: 1..5 }, allow_nil: true
end
