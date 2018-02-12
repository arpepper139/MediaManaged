class CreateGenreAssignments < ActiveRecord::Migration[5.1]
  def change
    create_table :genre_assignments do |t|
      t.belongs_to :genre, null: false
      t.references :assignable, polymorphic: true, null: false

      t.timestamps
    end

    add_index :genre_assignments, [:genre_id, :assignable_id, :assignable_type], unique: true, name: "genre_assigns_index"
  end
end
