require 'rails_helper'

feature 'user logs in via OmniAuth' do
  scenario 'user creates a new account via facebook' do
    user = FactoryBot.build(:facebook_user)
    sign_in_as(user)

    expect(page).to have_content("Signed in sucessfully!")
    expect(page).to have_link("Sign Out")
  end

  scenario 'user logs in with their existing account created via facebook' do
    user = FactoryBot.create(:facebook_user)
    sign_in_as(user)

    expect(page).to have_content("Signed in sucessfully!")
    expect(page).to have_link("Sign Out")
  end

  scenario 'user tries to log in via facebook but already has an account with the same email' do
    user1 = FactoryBot.create(:user)
    user2 = FactoryBot.build(:facebook_user, email: user1.email)

    sign_in_as(user2)

    expect(page).to have_content("We found an already existing account associated with your Facebook email. Please log in with that account.")
    expect(page).to have_link("Sign In")
    expect(page).to have_link("Sign In With Facebook")
  end
end
