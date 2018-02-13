require "rails_helper"

RSpec.describe Api::V1::GenresController, type: :controller do
  let!(:genre1) {FactoryBot.create(:genre)}
  let!(:genre2) {FactoryBot.create(:genre)}

  describe "GET#index" do
    it "should return a list of all the genres" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1
      expect(returned_json["genres"][0]["name"]).to eq genre1.name
      expect(returned_json["genres"][0]["name"]).to eq genre1.name
    end
  end
end
