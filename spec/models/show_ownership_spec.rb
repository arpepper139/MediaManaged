require 'rails_helper'

RSpec.describe ShowOwnership, type: :model do

  describe "associations" do
    it { should belong_to :user }
    it { should belong_to :show }
  end

  describe "validations" do
    let!(:show_ownership1) { FactoryBot.create(:show_ownership) }

    it { should have_valid(:show).when(show_ownership1.show) }
    it { should have_valid(:user).when(show_ownership1.user) }

    it { should have_valid(:user_rating).when(5,4,3,2,1) }
    it { should have_valid(:user_rating).when(nil, '') }
    it { should_not have_valid(:user_rating).when(6,0) }
  end
end
