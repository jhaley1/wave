collection @waves
attributes :id, :title, :user_id, :content, :friends
child :versions do
  attributes :id, :title, :content, :wave_id, :save_time
end
