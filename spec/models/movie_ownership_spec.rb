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
  end
end
