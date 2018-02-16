require "rails_helper"

RSpec.describe Api::V1::MoviesController, type: :controller do

  describe "GET#Show" do
    it "should return the specified movie" do
      user1 = FactoryBot.create(:user)
      movie1 = FactoryBot.create(:movie)
      genre1 = FactoryBot.create(:genre)
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1, user_rating: 5)
      genre_assignment1 = GenreAssignment.create!(genre: genre1, assignable: movie1)

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
      expect(returned_json["movie"]["ownership_info"]["user_rating"]).to eq 5
      expect(returned_json["movie"]["ownership_info"]["ownership_id"]).to eq movie_ownership1.id
      expect(returned_json["movie"]["genres"][0]["name"]).to eq genre1.name
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

    it "should return status 201 and a success message when passed JSON" do
      user1 = FactoryBot.create(:user)
      genre1 = FactoryBot.create(:genre)
      new_movie = {
        movie: {
          name: "A New Movie",
          director: "Great Director",
          studio: "Paramount",
          year: "1995",
          description: "It's Great!",
          imdb_rating: "8.5",
          poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
          },
        user_rating: "5",
        genres:[genre1.name]
      }

      sign_in(user1)
      post(:create, params: new_movie)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 201
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("Sucessfully added A New Movie!")
    end

    it "should return status 201 and a sucess message when passed Form Data" do
      user1 = FactoryBot.create(:user)
      genre1 = FactoryBot.create(:genre)
      new_movie = {
        name: "A New Movie",
        director: "Great Director",
        studio: "Paramount", year: "1995",
        description: "It's Great!",
        imdb_rating: "8.5",
        user_rating: "5",
        genres: genre1.name,
        poster: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', 'test_poster.jpg'), 'image/jpeg')
      }

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

  describe "PATCH#Update" do
    it "should return the updated movie with the poster URL" do
      movie1 = FactoryBot.create(:movie)

      patch :update, params: { id: movie1.id, poster: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', 'test_poster.jpg'), 'image/jpeg') }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["movie"]["name"]).to eq movie1.name
      expect(returned_json["movie"]["poster"]["url"]).to eq "/uploads/movie/poster/#{movie1.id}/test_poster.jpg"
    end
  end

end
