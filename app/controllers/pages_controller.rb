class PagesController < ApplicationController
  require 'open-uri'

  def simulation
    @top_80 = Team.all
    @top_20 = Team.limit(20).sorted
  end

  def ladder
    @top_80 = Team.all
    # loop through all teams, add each player and their rating to the hash, sort by rating, limit to 200
    all_players = {}

    @top_80.each do |team|
      url = "http://modules.ussquash.com/ssm/pages/leagues/Team_Information.asp?id=#{team.team_id}"
      doc = Nokogiri::HTML(open(url))
      player_names = doc.css('.table.table-bordered.table-striped.table-condensed')[1].css('tr td a').map(&:content)
      player_ratings = doc.css('.table.table-bordered.table-striped.table-condensed')[1].css('tr td:nth-child(4)').map(&:content)
      team_players_hash = {}

      for i in (0..player_names.length-1)
          team_players_hash[player_names[i]] = player_ratings[i].to_f
      end

      all_players = all_players.merge(team_players_hash)

    end
    all_players = all_players.sort_by{|_key, value| value}.reverse.first(200)
    list = []
    all_players.each do |player|
      list << player[0]
    end
    @list = list
    render
  end

  def datatable
    url = "http://modules.ussquash.com/ssm/pages/leagues/Team_Information.asp?id=#{team}"
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