require "factory_bot"

FactoryBot.define do
  factory :user do
    sequence(:first_name) { |n| "New#{n}" }
    sequence(:last_name) { |n| "User#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password "password"
    password_confirmation "password"
  end

FactoryBot.define do
  factory :movie do
    sequence(:name) { |n| "Movie#{n}"}
    sequence(:director) { |n| "DirectorBot#{n}"}
    sequence(:studio) { |n| "Studio#{n}" }
    year "1991"
    sequence(:runtime) { |n| "#{n} min" }
    description "The heros win!"
    rating 3
  end
end

end
