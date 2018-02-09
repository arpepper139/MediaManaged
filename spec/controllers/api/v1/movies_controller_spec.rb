require "rails_helper"

RSpec.describe Api::V1::MoviesController, type: :controller do

  describe "GET#Show" do
    it "should return the specified user" do
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
end
