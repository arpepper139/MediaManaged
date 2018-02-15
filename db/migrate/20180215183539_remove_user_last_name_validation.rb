class RemoveUserLastNameValidation < ActiveRecord::Migration[5.1]
  def up
    change_column :users, :last_name, :string, null: true
  end

  def down
    change_column :users, :last_name, :string, null: false
  end
end
