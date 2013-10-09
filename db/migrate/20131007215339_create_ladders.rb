class CreateLadders < ActiveRecord::Migration
  def change
    create_table :ladders do |t|

      t.timestamps
    end
  end
end
