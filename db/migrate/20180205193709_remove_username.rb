class RemoveUsername < ActiveRecord::Migration[5.1]
  def up
    remove_index :users, :username
    remove_column :users, :username, :string
  end

  def down
    add_column :users, :username, :string
    add_index :users, :username, unique: true
  end
end
