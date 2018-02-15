require 'rails_helper'

feature 'user updates profile' do
  scenario 'user updates profile' do
    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'

    visit edit_user_registration_path

    fill_in 'First Name', with: 'Jon'
    fill_in 'Last Name', with: 'Targaryen'
    fill_in 'Email', with: 'john@example.com'
    attach_file "Profile Photo", "#{Rails.root}/spec/support/images/photo2.jpeg"
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    fill_in 'Current password', with: user.password

    click_button 'Save Changes'

    expect(page).to have_content('updated successfully')
    expect(page).to have_link('Sign Out')
  end

  scenario 'user incorrectly updates profile' do

    user = FactoryBot.create(:user)

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Sign In'

    visit edit_user_registration_path

    click_button 'Save Changes'

    expect(page).to have_content("can't be blank")
  end
end
