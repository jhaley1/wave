# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format
# (all these examples are active by default):
# ActiveSupport::Inflector.inflections do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end
#
# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections do |inflect|
#   inflect.acronym 'RESTful'
# end

ActiveSupport::Inflector.inflections do |inflect|
  inflect.singular 'waves', 'wave'
end

ActiveSupport::Inflector.inflections do |inflect|
  inflect.plural 'wave', 'waves'
end

ActiveSupport::Inflector.inflections do |inflect|
  inflect.singular 'Waves', 'Wave'
end

ActiveSupport::Inflector.inflections do |inflect|
  inflect.plural 'Wave', 'Waves'
end