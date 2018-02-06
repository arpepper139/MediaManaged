require "factory_bot"

FactoryBot.define do
  factory :user do
    sequence(:first_name) { |n| "New#{n}" }
    sequence(:last_name) { |n| "User#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password "password"
    password_confirmation "password"
  end

  factory :movie do
    sequence(:name) { |n| "Movie#{n}"}
    sequence(:director) { |n| "DirectorBot#{n}"}
    sequence(:studio) { |n| "Studio#{n}" }
    year "1991"
    sequence(:runtime) { |n| "#{n} min" }
    description "The heros win!"
    rating 3
  end

  factory :movie_ownership do
    user
    movie
  end

  factory :show do
    sequence(:name) { |n| "Show#{n}"}
    sequence(:writer) { |n| "WriterBot#{n}"}
    sequence(:studio) { |n| "Studio#{n}" }
    start_year "2008"
    end_year "2012"
    description "The characters get into all sorts of crazy situations!"
    rating 4
  end

  factory :show_ownership do
    user
    show
  end
end
