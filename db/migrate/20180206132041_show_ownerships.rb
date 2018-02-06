class ShowOwnerships < ActiveRecord::Migration[5.1]
  def change
    create_table :show_ownerships do |t|
      t.belongs_to :user, null: false
      t.belongs_to :show, null: false
    end
  end
end
