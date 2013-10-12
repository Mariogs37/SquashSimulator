class AddLadderTable < ActiveRecord::Migration
  def change
    create_table :ladders do |t|
      t.text :ordered_list
      t.timestamps
    end
  end
end
