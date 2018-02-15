require 'rails_helper'

feature 'user registers' do

  # Acceptance Criteria:
  # * I must specify a valid email address,
  #   password, and password confirmation
  # * If I don't specify the required information, I am presented with
  #   an error message

  scenario 'user provides valid registration information, but no photo' do
    visit new_user_registration_path

    fill_in 'First Name', with: 'John'
    fill_in 'Last Name', with: 'Snow'
    fill_in 'Email', with: 'john@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'

    click_button 'Sign Up'

    expect(page).to have_content('Welcome! You have signed up successfully.')
    expect(page).to have_link('Sign Out')
  end

  scenario "user uploads a profile photo" do
    visit root_path
    click_link "Sign Up"

    fill_in 'First Name', with: 'Ash'
    fill_in 'Last Name', with: 'Ketchum'
    fill_in "Email", with: "ash@pallet-town.com"
    fill_in "Password", with: "12345abcde!"
    fill_in "Password Confirmation", with: "12345abcde!"
    attach_file "Profile Photo", "#{Rails.root}/spec/support/images/photo.png"
    click_button "Sign Up"

    expect(page).to have_content("Welcome! You have signed up successfully.")

    # Revisit when adding photo to nav bar
    # expect(page).to have_css("img[src*='photo.png']")
  end

  scenario 'user provides invalid registration information' do
    visit new_user_registration_path

    click_button 'Sign Up'
    expect(page).to have_content("can't be blank")
    expect(page).to_not have_link('Sign Out')
  end
end
