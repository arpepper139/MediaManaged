require 'rails_helper'

RSpec.describe Show, type: :model do

  describe "associations" do
    it { should have_many :users }
    it { should have_many :show_ownerships }
  end

  describe "validations" do
    let!(:show1) { FactoryBot.create(:show) }

    it { should have_valid(:name).when(show1.name) }
    it { should_not have_valid(:name).when(nil, '') }

    it { should have_valid(:writer).when(show1.writer) }
    it { should_not have_valid(:writer).when(nil, '') }

    it { should have_valid(:start_year).when(show1.start_year) }
    it { should_not have_valid(:start_year).when(nil, '') }
    it { should_not have_valid(:start_year).when("1"*5, "1"*3)}

    it { should have_valid(:end_year).when(show1.end_year) }
    it { should have_valid(:end_year).when(nil, '') }
    it { should_not have_valid(:end_year).when("1"*5, "1"*3)}

    it { should have_valid(:description).when(show1.description) }
    it { should have_valid(:description).when(nil, '') }
    it { should_not have_valid(:description).when("a"*5001) }

    it { should have_valid(:rating).when(5,4,3,2,1) }
    it { should have_valid(:rating).when(nil, '') }
    it { should_not have_valid(:rating).when(6,0) }
  end
end
