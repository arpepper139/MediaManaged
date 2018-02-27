module AuthenticationHelper
  def sign_in_as(user)
    mock_auth_for(user)
    visit "/"
    click_link "Sign In With Facebook"
  end

  def mock_auth_for(user)
    OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new(
      "provider"=> user.provider,
      "uid"=> user.uid,
      "info"=> {
        "email"=> user.email,
        "name"=> "#{user.first_name} #{user.last_name}",
        "image"=> "http://graph.facebook.com/v2.6/10211465387890445/picture"
      },
      "credentials"=> {
        "token"=> "1234",
        "expires"=> false
      },
      "extra"=> {
        "raw_info"=> {
          "name"=> "#{user.first_name} #{user.last_name}",
          "email"=> user.email,
          "id"=> user.uid
        }
      }
    )
  end

  def no_name_mock_auth_for(user)
    OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new(
      "provider"=> user.provider,
      "uid"=> user.uid,
      "info"=> {
        "email"=> user.email,
        "image"=> "http://graph.facebook.com/v2.6/10211465387890445/picture"
      },
      "credentials"=> {
        "token"=> "1234",
        "expires"=> false
      },
      "extra"=> {
        "raw_info"=> {
          "email"=> user.email,
          "id"=> user.uid
        }
      }
    )
  end
end
