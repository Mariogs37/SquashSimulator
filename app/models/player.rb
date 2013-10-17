class Player < ActiveRecord::Base
  attr_accessible :name, :rating, :team
end
