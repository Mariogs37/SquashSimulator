class AddPlayersTable < ActiveRecord::Migration
  create_table :players do |t|
    t.string :name
    t.float :rating, :precision => 4
    t.string :team
    t.timestamps
  end
end
