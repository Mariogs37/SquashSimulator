User.delete_all

u1 = User.create(:email => 'benjamin_clayman@alumni.brown.edu', :password => 'a', :password_confirmation => 'a', :team => 'Brown')
u2 = User.create(:email => 'sam.clayman@alumni.yale.edu', :password => 'a', :password_confirmation => 'a', :team => 'Yale')
u3 = User.create(:email => 'jay.dolan@middlebury.edu', :password => 'a', :password_confirmation => 'a', :team => 'Middlebury')
u4 = User.create(:email => 'will.katz@bates.edu', :password => 'a', :password_confirmation => 'a', :team => 'Bates')
u5 = User.create(:email => 'todd.harrity@princeton.edu', :password => 'a', :password_confirmation => 'a', :team => 'Princeton')
u6 = User.create(:email => 'george.miller@williams.edu', :password => 'a', :password_confirmation => 'a', :team => 'Williams')
u7 = User.create(:email => 'albert.shoihet@uwo.edu', :password => 'a', :password_confirmation => 'a', :team => 'Western Ontario')
u8 = User.create(:email => 'will.hartigan@cornell.edu', :password => 'a', :password_confirmation => 'a', :team => 'Cornell')