require "rails_helper"

RSpec.describe Api::V1::SearchController, type: :controller do

  describe "GET#Index" do
    it "if given a query string, it should return matching results" do
      user1 = FactoryBot.create(:user)
      movie1 = FactoryBot.create(:movie)
      show1 = FactoryBot.create(:show, name: movie1.name)

      movie2 = FactoryBot.create(:movie, name: "#{movie1.name} 2")
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie2)

      sign_in(user1)

      get :index, params: { name: "#{movie1.name}" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"].length).to eq 2
      expect(returned_json["results"][0]["director"]).to eq movie1.director
      expect(returned_json["results"][1]["writer"]).to eq show1.writer
      expect(returned_json["message"]).to eq "Here's what we found."
    end

    it "returns status 422 and a message if no query param is provided" do
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")
      expect(returned_json["error"]).to eq("Please provide a search term")
    end
  end

  describe "GET#external" do
    it "returns a formatted response if a movie is found" do
      get :external, params: { name: "Star Wars" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["found_media"]["name"]).to eq "Star Wars: Episode IV - A New Hope"
      expect(returned_json["type"]).to eq("movie")
      expect(returned_json["in_database"]).to eq false
    end

    it "returns a formatted response if a show is found" do
      get :external, params: { name: "Game Of Thrones" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["found_media"]["name"]).to eq "Game of Thrones"
      expect(returned_json["type"]).to eq("show")
      expect(returned_json["in_database"]).to eq false
    end

    it "returns nothing if nothing is found" do
      get :external, params: { name: "Random Words Here Not A Movie" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["found_media"]).to eq nil
      expect(returned_json["type"]).to eq nil
      expect(returned_json["in_database"]).to eq false
    end

    it "tells the user the movie is already in the database" do
      show1 = FactoryBot.create(:show, name: "Mad Men")

      get :external, params: { name: "Mad Men" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["found_media"]).to eq "Mad Men"
      expect(returned_json["type"]).to eq nil
      expect(returned_json["in_database"]).to eq true
    end

    it "returns status 422 and a message if no query param is provided" do
      get :external

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")
      expect(returned_json["error"]).to eq("Please provide a search term")
    end
  end

end
