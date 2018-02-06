require 'rails_helper'

RSpec.describe Movie, type: :model do

  describe "associations" do
    it { should have_many :users }
    it { should have_many :movie_ownerships }
  end

  describe "validations" do
    let!(:movie1) { FactoryBot.create(:movie) }

    it { should have_valid(:name).when(movie1.name) }
    it { should_not have_valid(:name).when(nil, '') }

    it { should have_valid(:director).when(movie1.director) }
    it { should_not have_valid(:director).when(nil, '') }

    it { should have_valid(:year).when(movie1.year) }
    it { should_not have_valid(:year).when(nil, '') }
    it { should_not have_valid(:year).when("1"*5, "1"*3)}

    it { should have_valid(:description).when(movie1.description) }
    it { should have_valid(:description).when(nil, '') }
    it { should_not have_valid(:description).when("a"*5001) }

    it { should have_valid(:rating).when(5,4,3,2,1) }
    it { should have_valid(:rating).when(nil, '') }
    it { should_not have_valid(:rating).when(6,0) }
  end
end
