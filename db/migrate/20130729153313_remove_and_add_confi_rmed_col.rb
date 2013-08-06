class RemoveAndAddConfiRmedCol < ActiveRecord::Migration
  def change
    add_column :waves, :confirmed, :boolean, :default => false
  end
end
