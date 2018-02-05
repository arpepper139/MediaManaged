class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :name, null: false
      t.string :director, null: false
      t.string :studio
      t.string :poster
      t.string :year, null: false
      t.string :runtime
      t.text :description
      t.integer :rating

      t.timestamps
    end
  end
end
