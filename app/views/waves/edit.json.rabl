collection @Waves
attributes :id, :title, :user_id, :content, :friends
child :versions do
  attributes :title, :content, :wave_id
end