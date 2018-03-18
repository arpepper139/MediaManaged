require "factory_bot"

FactoryBot.define do
  factory :user do
    sequence(:first_name) { |n| "New#{n}" }
    sequence(:last_name) { |n| "User#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password "password"
    password_confirmation "password"

    factory :facebook_user do
      provider "facebook"
      sequence(:uid) { |n| n }
      sequence(:first_name) { |n| "New#{n}" }
      sequence(:last_name) { |n| "User#{n}" }
      sequence(:email) { |n| "user#{n}@example.com" }
    end
  end

  factory :movie do
    sequence(:name) { |n| "Movie#{n}"}
    sequence(:director) { |n| "DirectorBot#{n}" }
    sequence(:studio) { |n| "Studio#{n}" }
    year "1991"
    sequence(:runtime) { |n| "#{n} min" }
    description "The heros win!"
    imdb_rating 3.0
  end

  factory :movie_ownership do
    user
    movie
    user_rating 4
  end

  factory :show do
    sequence(:name) { |n| "Show#{n}" }
    sequence(:writer) { |n| "WriterBot#{n}" }
    sequence(:studio) { |n| "Studio#{n}" }
    start_year "2008"
    end_year "2012"
    description "The characters get into all sorts of crazy situations!"
    imdb_rating 4.0
  end

  factory :show_ownership do
    user
    show
    user_rating 5
  end

  factory :genre do
    sequence(:name) { |n| "Genre#{n}" }
  end
end
