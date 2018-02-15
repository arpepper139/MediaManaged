require "rails_helper"

RSpec.describe Api::V1::ShowsController, type: :controller do

  describe "GET#Show" do
    it "should return the specified show" do
      user1 = FactoryBot.create(:user)
      show1 = FactoryBot.create(:show)
      genre1 = FactoryBot.create(:genre)
      show_ownership1 = FactoryBot.create(:show_ownership, user: user1, show: show1, user_rating: 4)
      genre_assignment1 = GenreAssignment.create!(genre: genre1, assignable: show1)

      sign_in(user1)

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
      expect(returned_json["show"]["imdb_rating"]).to eq "#{show1.imdb_rating}"
      expect(returned_json["show"]["ownership_info"]["user_rating"]).to eq 4
      expect(returned_json["show"]["ownership_info"]["ownership_id"]).to eq show_ownership1.id
      expect(returned_json["show"]["genres"][0]["name"]).to eq genre1.name
    end
  end

  describe "POST#Create" do
    it "should create a new show" do
      user1 = FactoryBot.create(:user)
      new_show = { show: { name: "A New Show", writer: "Great Writer", start_year: "1995" }}

      sign_in(user1)
      prev_count = user1.shows.count
      post(:create, params: new_show)
      expect(user1.shows.count).to eq(prev_count + 1)
    end

    it "should return status 201 and a success message" do
      genre1 = FactoryBot.create(:genre)
      user1 = FactoryBot.create(:user)
      new_show = { show: { name: "A New Show", writer: "Great Writer", studio: "Disney", start_year: "1995", end_year: "2001", description: "It's Great!", imdb_rating: "8.5" }, user_rating: "5", genres:[genre1.name] }

      sign_in(user1)
      post(:create, params: new_show)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 201
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("Sucessfully added A New Show!")
    end

    it "should return status 422 and an error message if it fails to create" do
      user1 = FactoryBot.create(:user)
      show1 = FactoryBot.create(:show)
      new_show = { show: { name: show1.name, writer: "Great Writer", studio: "Disney", start_year: "1995", end_year: "2001", description: "It's Great!", imdb_rating: "8.5" }, user_rating: "5" }

      sign_in(user1)
      post(:create, params: new_show)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq("Whoops! Looks like we already have #{show1.name}. If it's not in your personal collection, you can add it by searching above!")
    end
  end

  describe "PATCH#Update" do
    it "should return the updated movie with the poster URL" do
      show1 = FactoryBot.create(:show)

      patch :update, params: { id: show1.id, poster: Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'images', 'test_poster.jpg')) }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["show"]["name"]).to eq show1.name
      expect(returned_json["show"]["poster"]["url"]).to eq "/uploads/show/poster/#{show1.id}/test_poster.jpg"
    end
  end
end
