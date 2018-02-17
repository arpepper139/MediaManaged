require "rails_helper"

RSpec.describe Api::V1::SortController, type: :controller do

  describe "GET#type" do

    it "returns all medi of the specified type" do
      user1 = FactoryBot.create(:user)

      movie1 = FactoryBot.create(:movie)
      movie2 = FactoryBot.create(:movie)

      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1)
      movie_ownership2 = FactoryBot.create(:movie_ownership, user: user1, movie: movie2)

      show1 = FactoryBot.create(:show)
      show_ownership1 = FactoryBot.create(:show_ownership, user: user1, show: show1)

      sign_in(user1)

      get :type, params: { return: "movie" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"].length).to eq 2
      expect(returned_json["results"][0]["name"]).to eq movie1.name
      expect(returned_json["results"][1]["name"]).to eq movie2.name
    end

    it "returns 'nothing found' if nothing is found" do
      user1 = FactoryBot.create(:user)

      movie1 = FactoryBot.create(:movie)
      movie2 = FactoryBot.create(:movie)

      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1)
      movie_ownership2 = FactoryBot.create(:movie_ownership, user: user1, movie: movie2)

      sign_in(user1)

      get :type, params: { return: "show" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"]).to eq "Nothing Found"
    end

    it "returns a prompt to log in if not logged in" do
      get :type, params: { return: "videogame" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Not logged in"
    end

    it "propts for a valid sort parameter if one is not given" do
      user1 = FactoryBot.create(:user)

      sign_in(user1)

      get :type, params: { return: "videogame" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Please provide a valid sort parameter"
    end
  end

  describe "GET#genre" do
    it "returns all media of a specified genre" do
      user1 = FactoryBot.create(:user)
      genre1 = FactoryBot.create(:genre)

      movie1 = FactoryBot.create(:movie)
      show1 = FactoryBot.create(:show)
      show2 = FactoryBot.create(:show)

      genre_assignemnt1 = genre_assignment1 = GenreAssignment.create!(genre: genre1, assignable: movie1)
      genre_assignemnt2 = genre_assignment1 = GenreAssignment.create!(genre: genre1, assignable: show1)

      ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1)
      ownership2 = FactoryBot.create(:show_ownership, user: user1, show: show1)
      ownership3 = FactoryBot.create(:show_ownership, user: user1, show: show2)

      sign_in(user1)

      get :genre, params: { return: genre1.name }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"].length).to eq 2
      expect(returned_json["results"][0]["name"]).to eq movie1.name
      expect(returned_json["results"][1]["name"]).to eq show1.name
    end

    it "returns 'nothing found' if nothing is found" do
      user1 = FactoryBot.create(:user)
      genre1 = FactoryBot.create(:genre)

      sign_in(user1)

      get :genre, params: { return: genre1.name }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"]).to eq "Nothing Found"
    end

    it "prompts log in if the submitter is not logged in" do
      get :genre, params: { return: "Action" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Not logged in"
    end

    it "prompts for a valid search parameter if one isn't provided" do
      user1 = FactoryBot.create(:user)

      sign_in(user1)

      get :genre, params: { return: "experimental" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Please provide a valid sort parameter"
    end
  end

  describe "GET#rating" do
    it "returns all media with the specified user rating" do
      user1 = FactoryBot.create(:user)

      movie1 = FactoryBot.create(:movie)
      movie2 = FactoryBot.create(:movie)
      show1 = FactoryBot.create(:show)

      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1, user_rating: 5)
      movie_ownership2 = FactoryBot.create(:movie_ownership, user: user1, movie: movie2, user_rating: 4)
      show_ownership1 = FactoryBot.create(:show_ownership, user: user1, show: show1, user_rating: 4)

      sign_in(user1)

      get :rating, params: { return: 4 }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"].length).to eq 2
      expect(returned_json["results"][0]["name"]).to eq movie2.name
      expect(returned_json["results"][1]["name"]).to eq show1.name
    end

    it "returns 'nothing found' if nothing is found" do
      user1 = FactoryBot.create(:user)
      movie1 = FactoryBot.create(:movie)
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1, user_rating: 5)

      sign_in(user1)

      get :rating, params: { return: 4 }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"]).to eq "Nothing Found"
    end

    it "prompts log in if the submitter is not logged in" do
      get :rating, params: { return: 4 }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Not logged in"
    end

    it "prompts for a valid search parameter if one isn't provided" do
      user1 = FactoryBot.create(:user)

      sign_in(user1)

      get :rating, params: { return: 6 }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Please provide a valid sort parameter"
    end
  end
end
