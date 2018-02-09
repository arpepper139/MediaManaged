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

      expect(returned_json["message"]).to eq("Movie Found! Add Star Wars: Episode IV - A New Hope through the form below.")
    end

    it "returns a formatted response if a show is found" do
      get :external, params: { name: "Game Of Thrones" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("Show Found! Add Game of Thrones through the form below.")
    end

    it "only returns a message if nothing is found" do
      get :external, params: { name: "Random Words Here Not A Movie" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("We couldn't find anything on Omdb, but you can add the movie below!")
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
