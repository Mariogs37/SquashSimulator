class CreateTeamTable < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :team_id
      t.integer :ranking
      t.timestamps
    end
  end
end
