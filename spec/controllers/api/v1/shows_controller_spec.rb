require "rails_helper"

RSpec.describe Api::V1::ShowsController, type: :controller do

  describe "GET#Show" do
    it "should return the specified user" do
      show1 = FactoryBot.create(:show)

      get :show, params: { id: show1.id }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1

      expect(returned_json["show"]["id"]).to eq show1.id
      expect(returned_json["show"]["writer"]).to eq show1.writer
      expect(returned_json["show"]["studio"]).to eq show1.studio
      expect(returned_json["show"]["start_year"]).to eq show1.start_year
      expect(returned_json["show"]["end_year"]).to eq show1.end_year
      expect(returned_json["show"]["description"]).to eq show1.description
      expect(returned_json["show"]["rating"]).to eq show1.rating
    end
  end
end
