//functions defined

function start() {
  var teamList = ["Bates", "Bowdoin", "Brown", "Colby", "Columbia", "Cornell", "Dartmouth", "Franklin and Marshall", "George Washington", "Harvard", "Middlebury", "Naval Academy", "Pennsylvania", "Princeton", "Rochester", "St. Lawrence", "Trinity", "Western Ontario", "Williams", "Yale"];

      for (var i = 0; i <= 19; i++) {
        $('#team1').append('<option value="' + teamList[i] + '">' + teamList[i] + ' </option>');
        $('#team2').append('<option value="' + teamList[i] + '">' + teamList[i] + ' </option>');
      }

  $("#slider1").slider();
}

function reset() {
  for (var l = 1; l < 10; l++) {
    $('#probability' + l).val('');
  }
  $('#chart').addClass('hide');
  $('#simulate_button').show();
  $('#reset_button').addClass('hide');
}

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


    $('#result').removeClass('hide');
    $('#chart').removeClass('hide');
    $('#chart').empty();

  }

  //create chart for results

    Morris.Bar({
      element: 'chart',
      data: [
        { x: '9-0', y: ((team1_90/num_of_simulations)*100).toFixed(2)},
        { x: '8-1', y: ((team1_81/num_of_simulations)*100).toFixed(2)},
        { x: '7-2', y: ((team1_72/num_of_simulations)*100).toFixed(2)},
        { x: '6-3', y: ((team1_63/num_of_simulations)*100).toFixed(2)},
        { x: '5-4', y: ((team1_54/num_of_simulations)*100).toFixed(2)},
        { x: '4-5', y: ((team1_45/num_of_simulations)*100).toFixed(2)},
        { x: '3-6', y: ((team1_36/num_of_simulations)*100).toFixed(2)},
        { x: '2-7', y: ((team1_27/num_of_simulations)*100).toFixed(2)},
        { x: '1-8', y: ((team1_18/num_of_simulations)*100).toFixed(2)},
        { x: '0-9', y: ((team1_09/num_of_simulations)*100).toFixed(2)}

      ],
      xkey: ['x'],
      ykeys: ['y'],
      labels: ['Match Score']
    });
}

 //code run on page load

$(function(){
  start();
  $('#simulate_button').click(run_simulation);
  $('#reset_button').click(reset);

});
