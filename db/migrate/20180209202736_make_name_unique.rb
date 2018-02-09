class MakeNameUnique < ActiveRecord::Migration[5.1]
  def change
    add_index :movies, :name, unique: true
    add_index :shows, :name, unique: true
  end
end
