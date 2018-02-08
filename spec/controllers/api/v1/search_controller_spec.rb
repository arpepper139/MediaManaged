require "rails_helper"

RSpec.describe Api::V1::SearchController, type: :controller do

  describe "GET#Index" do
    it "should return matching results" do
      user1 = FactoryBot.create(:user)
      movie1 = FactoryBot.create(:movie)
      show1 = FactoryBot.create(:show, name: movie1.name)

      movie2 = FactoryBot.create(:movie, name: movie1.name)
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie2)

      sign_in(user1)

      get :index, params: { name: "#{movie1.name}" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"].length).to eq 2
      expect(returned_json["results"][0]["director"]).to eq movie1.director
      expect(returned_json["results"][1]["writer"]).to eq show1.writer
      expect(returned_json["message"]).to eq "We found some matching media you don't already own!"
    end
  end

end
