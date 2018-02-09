class ChangeImdbRating < ActiveRecord::Migration[5.1]
  def up
    change_column :movies, :imdb_rating, :decimal
    change_column :shows, :imdb_rating, :decimal
  end

  def down
    change_column :movies, :imdb_rating, :integer
    change_column :shows, :imdb_rating, :integer
  end
end
