class AddTokenToWaves < ActiveRecord::Migration
  def change
    add_column :waves, :token, :string
  end
end
