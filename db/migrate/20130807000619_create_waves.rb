class CreateWaves < ActiveRecord::Migration
  def change
    create_table :waves do |t|
      t.integer :user_id
      t.string :title
      t.text :content
    end
  end
end
