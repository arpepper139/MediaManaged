class MovieOwnerships < ActiveRecord::Migration[5.1]
  def change
    create_table :movie_ownerships do |t|
      t.belongs_to :user, null: false
      t.belongs_to :movie, null: false
    end
  end
end
