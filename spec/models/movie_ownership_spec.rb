require 'rails_helper'

RSpec.describe MovieOwnership, type: :model do

  describe "associations" do
    it { should belong_to :user }
    it { should belong_to :movie }
  end

  describe "validations" do
    let!(:movie_ownership1) { FactoryBot.create(:movie_ownership) }

    it { should have_valid(:movie).when(movie_ownership1.movie) }
    it { should have_valid(:user).when(movie_ownership1.user) }

    it { should have_valid(:user_rating).when(5,4,3,2,1) }
    it { should have_valid(:user_rating).when(nil, '') }
    it { should_not have_valid(:user_rating).when(6,0) }
  end
end
