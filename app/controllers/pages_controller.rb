class PagesController < ApplicationController
  require 'open-uri'

  def simulation
  end

  def datatable
  end

  def scrape
    team1 = params[:first_team]
    team2 = params[:second_team]
    two_teams = []
    collection = [team1, team2].each do |team|
      url = "http://modules.ussquash.com/ssm/pages/leagues/Team_Information.asp?id=#{team}"


      doc = Nokogiri::HTML(open(url))
      player_names = doc.css('.table.table-bordered.table-striped.table-condensed')[1].css('tr td a').map(&:content)
      player_ratings = doc.css('.table.table-bordered.table-striped.table-condensed')[1].css('tr td:nth-child(4)').map(&:content)

      player_hash = {}
      for i in (0..player_names.length-1)
        player_hash[player_names[i]] = player_ratings[i]
      end
      player_hash = player_hash.sort_by{|key, value| value}.reverse.first(9)
      two_teams << player_hash
    end
    render :json => {teams: two_teams}

  end

end