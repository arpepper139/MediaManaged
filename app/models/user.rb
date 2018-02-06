class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :movie_ownerships
  has_many :movies, through: :movie_ownerships

  has_many :show_ownerships
  has_many :shows, through: :show_ownerships

  validates :first_name, presence: true
  validates :last_name, presence: true
end
