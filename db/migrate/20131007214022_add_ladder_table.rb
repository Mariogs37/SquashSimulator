class AddLadderTable < ActiveRecord::Migration
  def change
    create_table :ladders do |t|
      t.text :order
      t.timestamps
    end
  end
end
