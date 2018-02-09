require "rails_helper"

RSpec.describe Api::V1::ShowOwnershipsController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:show1) {FactoryBot.create(:show)}

  describe "POST#create" do
    it "should create a new show" do
      new_show_ownership = { show_ownership: { user_rating: 5, show_id: show1.id } }

      sign_in(user1)
      prev_count = user1.shows.count
      post(:create, params: new_show_ownership)
      expect(user1.shows.count).to eq(prev_count + 1)
    end

    it "should return status 201 and a sucess message" do
      new_show_ownership = { show_ownership: { user_rating: 5, show_id: show1.id } }

      sign_in(user1)
      post(:create, params: new_show_ownership)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 201
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("Sucessfully added!")
    end

    it "should return status 422 and errors if show not created" do
      new_show_ownership = {show_ownership: { user_rating: "" }}

      sign_in(user1)
      post(:create, params: new_show_ownership)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"][0]).to eq("Show must exist")
      expect(returned_json["error"][1]).to eq("Show can't be blank")
    end
  end
end
