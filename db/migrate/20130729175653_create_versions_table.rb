class CreateVersionsTable < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.integer :wave_id
      t.string :title
      t.text :content
      t.timestamp :save_time
    end
  end
end
