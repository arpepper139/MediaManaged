require "rails_helper"

RSpec.describe Api::V1::MoviesController, type: :controller do

  describe "GET#Show" do
    it "should return the specified movie" do
      user1 = FactoryBot.create(:user)
      movie1 = FactoryBot.create(:movie)
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1)

      sign_in(user1)

      get :show, params: { id: movie1.id }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1

      expect(returned_json["movie"]["id"]).to eq movie1.id
      expect(returned_json["movie"]["director"]).to eq movie1.director
      expect(returned_json["movie"]["studio"]).to eq movie1.studio
      expect(returned_json["movie"]["year"]).to eq movie1.year
      expect(returned_json["movie"]["runtime"]).to eq movie1.runtime
      expect(returned_json["movie"]["description"]).to eq movie1.description
      expect(returned_json["movie"]["imdb_rating"]).to eq "#{movie1.imdb_rating}"
      expect(returned_json["movie"]["owned"]).to eq true
    end
  end

  describe "POST#Create" do
    it "should create a new movie" do
      user1 = FactoryBot.create(:user)
      new_movie = { movie: { name: "A New Movie", director: "Great Director", year: "1995" }}

      sign_in(user1)
      prev_count = user1.movies.count
      post(:create, params: new_movie)
      expect(user1.movies.count).to eq(prev_count + 1)
    end
  end

  it "should return status 201 and a success message" do
    user1 = FactoryBot.create(:user)
    new_movie = { movie: { name: "A New Movie", director: "Great Director", studio: "Paramount", year: "1995", description: "It's Great!", imdb_rating: "8.5" }, user_rating: "5" }

    sign_in(user1)
    post(:create, params: new_movie)

    returned_json = JSON.parse(response.body)
    expect(response.status).to eq 201
    expect(response.content_type).to eq("application/json")

    expect(returned_json["message"]).to eq("Sucessfully added A New Movie!")
  end

  it "should return status 422 and an error message if it fails to create" do
    user1 = FactoryBot.create(:user)
    movie1 = FactoryBot.create(:movie)
    new_movie = { movie: { name: movie1.name, director: "Great Director", studio: "Paramount", year: "1995", description: "It's Great!", imdb_rating: "8.5" }, user_rating: "5" }

    sign_in(user1)
    post(:create, params: new_movie)

    returned_json = JSON.parse(response.body)
    expect(response.status).to eq 422
    expect(response.content_type).to eq("application/json")

    expect(returned_json["error"]).to eq("Whoops! Looks like we already have #{movie1.name}. If it's not in your personal collection, you can add it by searching above!")
  end
end
