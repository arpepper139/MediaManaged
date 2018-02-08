class RatingFix < ActiveRecord::Migration[5.1]
  def change
    rename_column :movies, :rating, :imdb_rating
    rename_column :shows, :rating, :imdb_rating

    add_column :movie_ownerships, :user_rating, :integer
    add_column :show_ownerships, :user_rating, :integer
  end
end
