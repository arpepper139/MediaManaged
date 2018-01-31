# require 'rails_helper'
#
# feature 'NavBar' do
#   scenario 'As a user I want to click Floofer and be directed to the Index' do
#     user = FactoryBot.create(:user)
#
#     visit new_user_session_path
#
#     fill_in 'Email', with: user.email
#     fill_in 'Password', with: user.password
#
#     click_button 'Log in'
#     expect(page).to have_content('Signed in successfully')
#
#     click_link 'Floofer'
#     expect(page).to have_current_path('/')
#   end
#
#   scenario 'As a user I want to be able to click an icon and see a link to settings' do
#     user = FactoryBot.create(:user)
#
#     visit new_user_session_path
#
#     fill_in 'Email', with: user.email
#     fill_in 'Password', with: user.password
#
#     click_button 'Log in'
#     expect(page).to have_content('Signed in successfully')
#     expect(page).to have_link('User Actions')
#     expect(page).to have_link('Settings')
#     expect(page).to have_link('Add Floof')
#     expect(page).to have_link('Sign Out')
#   end
#
#   scenario "As a user I want to be able to navigate to the Add Floof page from the NavBar dropdown" do
#     user = FactoryBot.create(:user)
#
#     visit new_user_session_path
#
#     fill_in 'Email', with: user.email
#     fill_in 'Password', with: user.password
#
#     click_button 'Log in'
#     expect(page).to have_content('Signed in successfully')
#
#     click_link "Add Floof"
#     expect(page).to have_current_path('/floofs/new')
#   end
# end
