class CreateWavesTable < ActiveRecord::Migration
  def change
    create_table :waves do |t|
      t.string :title
      t.text :content
      t.integer :user_id
      
      t.timestamps
    end
    
    add_index :waves, :user_id
  end
end
