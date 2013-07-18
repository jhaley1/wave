class CreateFriendsWaves < ActiveRecord::Migration
  def change
    create_table :friends_waves do |t|
      t.integer :shared_wave_id
      t.integer :friend_id

      t.timestamps
    end
  end
end
