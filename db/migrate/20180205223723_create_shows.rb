class CreateShows < ActiveRecord::Migration[5.1]
  def change
    create_table :shows do |t|
      t.string :name, null: false
      t.string :writer, null: false
      t.string :studio
      t.string :poster
      t.string :start_year, null: false
      t.string :end_year
      t.text :description
      t.integer :rating

      t.timestamps
    end
  end
end
