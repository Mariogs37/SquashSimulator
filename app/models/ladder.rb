class Ladder < ActiveRecord::Base
  attr_accessible :ordered_list
  serialize :ordered_list, Array
end
