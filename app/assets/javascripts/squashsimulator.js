function start() {
  var teamList = ["Bates", "Bowdoin", "Brown", "Colby", "Columbia", "Cornell", "Dartmouth", "Franklin and Marshall", "George Washington", "Harvard", "Middlebury", "Naval Academy", "Pennsylvania", "Princeton", "Rochester", "St. Lawrence", "Trinity", "Western Ontario", "Williams", "Yale"];

      for (var i = 0; i <= 19; i++) {
        $('#team1').append('<option value="' + teamList[i] + '">' + teamList[i] + ' </option>');
        $('#team2').append('<option value="' + teamList[i] + '">' + teamList[i] + ' </option>');
      }
    }

$(function(){
  start();
  $('#simulate_button').click(run_simulation);

});

function run_simulation() {
  var num_of_simulations = parseInt($('#num_of_simulations').val());
  var totalMatches1 = 0;
  var totalMatches2 = 0;
  var team1_90 = 0;
  var team1_81 = 0;
  var team1_72 = 0;
  var team1_63 = 0;
  var team1_54 = 0;
  var team1_45 = 0;
  var team1_36 = 0;
  var team1_27 = 0;
  var team1_18 = 0;
  var team1_09 = 0;
  for (var i = 0; i < num_of_simulations; i++) {
    var teamMatches1 = 0;
    var teamMatches2 = 0;
    for (var j = 1; j < 10; j++) {
      var probabilityOfWin = parseFloat($('#probability' + j).val());
      if (probabilityOfWin >= (Math.random() * 100)) {
        teamMatches1++;
      }
      else {
        teamMatches2++;
      }
    }
    switch(teamMatches1) {

      case 9:
        team1_90++;
        break;
      case 8:
        team1_81++;
        break;
      case 7:
        team1_72++;
        break;
      case 6:
        team1_63++;
        break;
      case 5:
        team1_54++;
        break;
      case 4:
        team1_45++;
        break;
      case 3:
        team1_36++;
        break;
      case 2:
        team1_27++;
        break;
      case 1:
        team1_18++;
        break;
      case 0:
        team1_09++;
        break;
    }

    if (teamMatches1 > teamMatches2) {
      totalMatches1++;
    }
    else {
      totalMatches2++;
    }

    var output = "Over " + num_of_simulations.toString() + " simulations, " + $('#team1').val() + ": " + totalMatches1.toString() + ", " + $('#team2').val() + ": " + totalMatches2.toString() + ". " +
    "The probability of " + $('#team1').val() + " winning is " + ((totalMatches1/num_of_simulations)*100).toFixed(2) + "%." + " The probability of " + $('#team2').val() + " winning is " + ((totalMatches2/num_of_simulations)*100).toFixed(2) + "%."

    var breakdown9 = " Team 1 wins 9-0: " + ((team1_90/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown8 = " Team 1 wins 8-1: " + ((team1_81/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown7 = " Team 1 wins 7-2: " + ((team1_72/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown6 = " Team 1 wins 6-3: " + ((team1_63/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown5 = " Team 1 wins 5-4: " + ((team1_54/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown4 = " Team 1 loses 4-5: " + ((team1_45/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown3 = " Team 1 loses 3-6: " + ((team1_36/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown2 = " Team 1 loses 2-7: " + ((team1_27/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown1 = " Team 1 loses 1-8: " + ((team1_18/num_of_simulations)*100).toFixed(2) + "%";
    var breakdown0 = " Team 1 loses 0-9: " + ((team1_09/num_of_simulations)*100).toFixed(2) + "%";

    $('#result').text(output);
    $('#breakdown9').text(breakdown9);
    $('#breakdown8').text(breakdown8);
    $('#breakdown7').text(breakdown7);
    $('#breakdown6').text(breakdown6);
    $('#breakdown5').text(breakdown5);
    $('#breakdown4').text(breakdown4);
    $('#breakdown3').text(breakdown3);
    $('#breakdown2').text(breakdown2);
    $('#breakdown1').text(breakdown1);
    $('#breakdown0').text(breakdown0);


  }
  $('#breakdown9').removeClass('hide');
  $('#breakdown8').removeClass('hide');
  $('#breakdown7').removeClass('hide');
  $('#breakdown6').removeClass('hide');
  $('#breakdown5').removeClass('hide');
  $('#breakdown4').removeClass('hide');
  $('#breakdown3').removeClass('hide');
  $('#breakdown2').removeClass('hide');
  $('#breakdown1').removeClass('hide');
  $('#breakdown0').removeClass('hide');
  $('#result').removeClass('hide');
  $('#simulate_button').hide();
}

