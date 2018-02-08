require "rails_helper"

RSpec.describe Api::V1::MovieOwnershipsController, type: :controller do
  let!(:user1) {FactoryBot.create(:user)}
  let!(:movie1) {FactoryBot.create(:movie)}

  describe "POST#create" do
    it "should create a new movie" do
      new_movie_ownership = { movie_ownership: { user_id: user1.id, user_rating: 5, movie_id: movie1.id } }
      prev_count = user1.movies.count
      post(:create, params: new_movie_ownership)
      expect(user1.movies.count).to eq(prev_count + 1)
    end

    it "should return status 201 and a sucess message" do
      new_movie_ownership = { movie_ownership: { user_id: user1.id, user_rating: 5, movie_id: movie1.id } }
      post(:create, params: new_movie_ownership)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 201
      expect(response.content_type).to eq("application/json")

      expect(returned_json["message"]).to eq("Sucessfully added!")
    end

    it "should return status 422 and errors if movie not created" do
      new_movie_ownership = {movie_ownership: { user_id: user1.id }}
      post(:create, params: new_movie_ownership)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 422
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"][0]).to eq("Movie must exist")
      expect(returned_json["error"][1]).to eq("Movie can't be blank")
    end
  end
end
