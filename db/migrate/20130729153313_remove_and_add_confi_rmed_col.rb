class RemoveAndAddConfiRmedCol < ActiveRecord::Migration
  def change
    remove_column :waves, :confimed
    add_column :waves, :confirmed, :boolean, :default => false
  end
end
