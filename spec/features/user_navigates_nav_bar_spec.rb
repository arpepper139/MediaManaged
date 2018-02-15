require 'rails_helper'

feature 'NavBar' do
  scenario 'As a user I want to click MediaManaged and be directed to the home page' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'
    expect(page).to have_content('Signed in successfully')

    click_link 'MediaManaged'
    expect(page).to have_current_path('/')
  end

  scenario 'As a user I want to be able to edit my information from the Nav Bar' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_link('Home')
    expect(page).to have_link('Edit Info')
    click_link 'Edit Info'
    expect(page).to have_current_path edit_user_registration_path
  end

  scenario 'As a user I want to be able to edit my information from the Nav Bar' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_link('Home')
    expect(page).to have_link('Sign Out')

    click_link 'Sign Out'
    expect(page).to have_current_path("/")
    expect(page).to have_content('Signed out successfully')
  end
end
