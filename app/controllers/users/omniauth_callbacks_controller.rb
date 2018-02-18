class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    facebook_email = request.env["omniauth.auth"]["info"]["email"]
    email_search = User.where(email: facebook_email)

    if email_search != [] && email_search[0].provider == nil
      flash[:notice] = "We found an already existing account associated with your Facebook email. Please log in with that account."
      render 'static_pages/index'
    else
      user = User.from_omniauth(request.env["omniauth.auth"])
      flash[:notice] = "Signed in sucessfully!"
      sign_in_and_redirect user
    end
  end
end
