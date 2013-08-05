class RemoveExtraCols < ActiveRecord::Migration
  def change
    remove_column :waves, :token
    remove_column :waves, :confirmed
  end
end
