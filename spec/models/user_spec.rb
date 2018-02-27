require 'rails_helper'

RSpec.describe User, type: :model do

  describe "associations" do
    it { should have_many :movies }
    it { should have_many :movie_ownerships }

    it { should have_many :shows }
    it { should have_many :show_ownerships }
  end

  describe "validations" do
    let!(:user1) { FactoryBot.create(:user) }

    it { should have_valid(:first_name).when('John') }
    it { should_not have_valid(:first_name).when(nil, '') }

    it { should have_valid(:email).when('jsnow@gmail.com') }
    it { should_not have_valid(:email).when(nil, '', 'jsnow') }

    it 'has a matching password confirmation for the password' do
      user = User.new
      user.password = 'password'
      user.password_confirmation = 'anotherpassword'

      expect(user).to_not be_valid
      expect(user.errors[:password_confirmation]).to_not be_blank
    end
  end

  describe ".from_omniauth" do
    context "for an auth hash that does not have the provider and uid of an existing user" do
      let!(:new_fb_user) { FactoryBot.build(:facebook_user) }
      let!(:auth_hash) {
        mock_auth_for(new_fb_user)
      }

      it "should create a new user and return the newly created user" do
        user = User.from_omniauth(auth_hash)
        expect(user.uid).to eq(new_fb_user.uid)
        expect(user.provider).to eq(new_fb_user.provider)
        expect(user.first_name).to eq(new_fb_user.first_name)
        expect(user.last_name).to eq(new_fb_user.last_name)
        expect(user.email).to eq(new_fb_user.email)
        expect(User.count).to eq(1)
      end
    end

    context "for an auth hash that has the provider and uid of an existing user" do
      let(:existing_user) { FactoryBot.create(:facebook_user) }
      let!(:auth_hash) {
        mock_auth_for(existing_user)
      }
      it "should return the existing user" do
        user = User.from_omniauth(auth_hash)
        expect(user).to eq(existing_user)
        expect(user.first_name).to eq(existing_user.first_name)
        expect(user.last_name).to eq(existing_user.last_name)
        expect(user.email).to eq(existing_user.email)
      end
    end

    context "for an auth hash with no provided name" do
      let(:no_name_user) { FactoryBot.build(:facebook_user) }
      let!(:auth_hash) {
        no_name_mock_auth_for(no_name_user)
      }
      it "should create a new user and return the newly created user" do
        user = User.from_omniauth(auth_hash)
        expect(user.uid).to eq(no_name_user.uid)
        expect(user.provider).to eq(no_name_user.provider)
        expect(user.first_name).to eq("User")
        expect(user.last_name).to eq("")
        expect(User.count).to eq(1)
      end
    end
  end
end
