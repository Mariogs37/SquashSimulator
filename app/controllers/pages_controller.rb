class PagesController < ApplicationController
  require 'open-uri'

  def simulation
    @top_80 = Team.all
    @top_20 = Team.where("ranking > 0 AND ranking < 21")
  end

  def ladder
    if Ladder.exists? && Ladder.all.first.ordered_list.length != 0
      most_recent = Ladder.all.order('created_at').last
      @ladder = most_recent
    else
      get_most_recent_ladder
    end
  end

  def get_most_recent_ladder
    @top_80 = Team.all
    # loop through all teams, add each player and their rating to the hash, sort by rating, limit to 200
    all_players = []

    @top_80.each do |team|
      url = "http://modules.ussquash.com/ssm/pages/leagues/Team_Information.asp?id=#{team.team_id}"
      doc = Nokogiri::HTML(open(url))
      player_names = doc.css('.table.table-bordered.table-striped.table-condensed')[1].css('tr td a').map(&:content)
      player_ratings = doc.css('.table.table-bordered.table-striped.table-condensed')[1].css('tr td:nth-child(4)').map(&:content)
      for i in (0..player_names.length-1)
        player = Player.create(:name => player_names[i], :rating => player_ratings[i].to_f, :team => team.name)
        all_players << player
      end
    end

    all_players = all_players.sort{|player1, player2| player1.rating <=> player2.rating}.reverse.first(200)
    #insert creation of ladder object with order
    @ladder = all_players
    render 'ladder'
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
