class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    facebook_email = request.env["omniauth.auth"]["info"]["email"]
    email_search = User.where(email: facebook_email)

    if email_search != []
      user = email_search[0]
      sign_in_and_redirect user
    else
      user = User.from_omniauth(request.env["omniauth.auth"])
      sign_in_and_redirect user
    end
  end
end
