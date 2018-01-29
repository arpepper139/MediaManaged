require 'rails_helper'

feature 'A user deletes themself....forever', %Q{
  As an authenticated user
  I want to delete my account
  So that my information is no longer retained by the app
} do
  scenario 'The user deletes their account' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'
    visit edit_user_registration_path

    click_button 'Cancel my account'

    expect(page).to have_content('successfully cancelled')

  end
end
