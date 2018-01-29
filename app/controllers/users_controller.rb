class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to user_session_path(@user)
    else
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:notice] = "Profile successfully updated."
      redirect_to root_path
    else
      flash[:alert] = @user.errors.full_messages.join(", ")
      render :edit
    end
  end

  def destroy
    User.destroy(params[:id])
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :profile_photo, :email, :encrypted_password)
  end
end
