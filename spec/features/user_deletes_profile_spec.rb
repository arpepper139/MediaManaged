require 'rails_helper'

feature 'A user deletes themself forever' do
  scenario 'The user deletes their account' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'
    visit edit_user_registration_path

    click_button 'Cancel My Account'

    expect(page).to have_content('successfully cancelled')

  end
end
