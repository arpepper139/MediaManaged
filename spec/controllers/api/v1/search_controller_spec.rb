require "rails_helper"

RSpec.describe Api::V1::SearchController, type: :controller do

  describe "GET#Index" do
    it "should return matching results" do
      movie1 = FactoryBot.create(:movie)
      show1 = FactoryBot.create(:show, name: movie1.name)

      get :index, params: { name: "#{movie1.name}" }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["results"].length).to eq 2
      expect(returned_json["results"][0]["writer"]).to eq show1.writer
      expect(returned_json["results"][1]["director"]).to eq movie1.director
    end
  end
  
end
