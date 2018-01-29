require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "username#{n}" }
    sequence(:first_name) { |n| "New#{n}" }
    sequence(:last_name) { |n| "User#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end

end
