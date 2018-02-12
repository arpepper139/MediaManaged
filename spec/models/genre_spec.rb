require 'rails_helper'

RSpec.describe Genre, type: :model do

  describe "associations" do
    it { should have_many :genre_assignments }
    it { should have_many :movies }
    it { should have_many :shows }
  end

  describe "validations" do
    let!(:genre1) { FactoryBot.create(:genre) }

    it { should have_valid(:name).when("New Genre!")}
    it { should validate_uniqueness_of(:name) }
    it { should_not have_valid(:name).when(genre1.name) }
    it { should_not have_valid(:name).when(nil, '') }
  end
end
