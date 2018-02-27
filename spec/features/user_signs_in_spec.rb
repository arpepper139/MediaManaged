require 'rails_helper'

feature 'user signs in via devise' do
  scenario 'specify valid credentials' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_link('Sign Out')
  end
  
  scenario 'specify invalid credentials' do
    visit new_user_session_path

    click_button 'Sign In'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_link('Sign Out')
  end
end
