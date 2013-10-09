class Ladder < ActiveRecord::Base
  attr_accessible :order
  serialize :order, Array
end
