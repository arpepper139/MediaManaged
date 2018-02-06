class ShowOwnership < ApplicationRecord
  belongs_to :user
  belongs_to :show

  validates :user, presence: true
  validates :show, presence: true
end
