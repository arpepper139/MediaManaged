require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do

  describe "GET#Current" do
    it "should return the current user" do
      user1 = FactoryBot.create(:user)
      sign_in(user1)

      get :current

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["current_user"]["id"]).to eq user1.id
      expect(returned_json["current_user"]["email"]).to eq user1.email
      expect(returned_json["current_user"]["first_name"]).to eq user1.first_name
      expect(returned_json["current_user"]["last_name"]).to eq user1.last_name
    end

    it "should return nil if there is no current user" do
      get :current
      returned_json = JSON.parse(response.body)

      expect(returned_json["current_user"]).to eq nil
    end
  end

  describe "GET#Show" do
    it "should return the specified user" do
      user1 = FactoryBot.create(:user)

      movie1 = FactoryBot.create(:movie)
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1)

      show1 = FactoryBot.create(:show)
      show_ownership1 = FactoryBot.create(:show_ownership, user: user1, show: show1)

      get :show, params: { id: user1.id }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 1

      expect(returned_json["user"]["first_name"]).to eq user1.first_name
      expect(returned_json["user"]["last_name"]).to eq user1.last_name
      expect(returned_json["user"]["email"]).to eq user1.email
      expect(returned_json["user"]["movies"][0]["id"]).to eq movie1.id
      expect(returned_json["user"]["shows"][0]["id"]).to eq show1.id
    end
  end
end
