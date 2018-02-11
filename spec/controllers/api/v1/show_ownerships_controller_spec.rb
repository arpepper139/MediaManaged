require "rails_helper"

RSpec.describe Api::V1::ShowOwnershipsController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:show1) {FactoryBot.create(:show)}
  let!(:show_ownership1) {FactoryBot.create(:show_ownership, user: user1, show: show1, user_rating: 5)}

  describe "POST#create" do
    it "should create a new show ownership" do
      new_show_ownership = { show_ownership: { user_rating: 5, show_id: show1.id } }

      sign_in(user1)
      prev_count = user1.shows.count
      post(:create, params: new_show_ownership)
      expect(user1.shows.count).to eq(prev_count + 1)
    end

    it "should return status 201 and a success message" do
      new_show_ownership = { show_ownership: { user_rating: 5, show_id: show1.id } }

      sign_in(user1)
      post(:create, params: new_show_ownership)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 201
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("Sucessfully added #{show1.name}!")
    end

    it "should return status 422 and errors if show ownership not created" do
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

  describe "PATCH#update" do
    it "updates the targeted show ownership and returns the updated rating" do
      rating_update_params = { id: show_ownership1.id, show_ownership: { user_rating: 3 } }
      patch(:update, params: rating_update_params)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["user_rating"]).to eq 3
    end
  end

  describe "PATCH#update" do
    it "returns error if the update is unsucessful" do
      rating_update_params = { id: show_ownership1.id, show_ownership: { user_rating: 7 } }
      patch(:update, params: rating_update_params)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"][0]).to eq "User rating is not included in the list"
    end
  end
end
