require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do

  describe "GET#Current" do
    it "should return the current user" do
      user1 = FactoryBot.create(:user)

      movie1 = FactoryBot.create(:movie)
      movie_ownership1 = FactoryBot.create(:movie_ownership, user: user1, movie: movie1)

      show1 = FactoryBot.create(:show)
      show_ownership1 = FactoryBot.create(:show_ownership, user: user1, show: show1)

      sign_in(user1)

      get :current

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["user"]["first_name"]).to eq user1.first_name
      expect(returned_json["user"]["last_name"]).to eq user1.last_name
      expect(returned_json["user"]["email"]).to eq user1.email
      expect(returned_json["user"]["media"].length).to eq 2
    end

    it "should return nil and 422 if there is no current user" do
      get :current

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to eq nil
    end
  end
end
