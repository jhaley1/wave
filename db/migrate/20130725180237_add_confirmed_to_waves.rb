class AddConfirmedToWaves < ActiveRecord::Migration
  def change
    add_column :waves, :confimed, :boolean, :default => false
  end
end
