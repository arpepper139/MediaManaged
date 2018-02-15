class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  mount_uploader :profile_photo, ProfilePhotoUploader

  has_many :movie_ownerships
  has_many :movies, through: :movie_ownerships

  has_many :show_ownerships
  has_many :shows, through: :show_ownerships

  validates :first_name, presence: true

  def self.from_omniauth(auth)
    provider = auth.provider
    uid = auth.uid

    if auth.info.name
      names = auth.info.name.split()
      first_name = names.first
      last_name = names.last
    else
      first_name = "User"
      last_name = ""
    end

    where(provider: provider, uid: uid).first_or_create do |user|
      user.email = auth.info.email
      user.first_name = first_name
      user.last_name = last_name
      user.password = Devise.friendly_token[0,20]
    end
  end
end
