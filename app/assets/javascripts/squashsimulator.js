//functions defined

function start() {
  var teamList = ["Bates", "Bowdoin", "Brown", "Colby", "Columbia", "Cornell", "Dartmouth", "Franklin and Marshall", "George Washington", "Harvard", "Middlebury", "Naval Academy", "Pennsylvania", "Princeton", "Rochester", "St. Lawrence", "Trinity", "Western Ontario", "Williams", "Yale"];

      for (var i = 0; i <= 19; i++) {
        $('#team1').append('<option value="' + teamList[i] + '">' + teamList[i] + ' </option>');
        $('#team2').append('<option value="' + teamList[i] + '">' + teamList[i] + ' </option>');
      }

for (var n = 1; n < 10; n++) {
  $("#slider1").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability1').val(ui.value);
      $('#team2probability1').val(100 - (ui.value));

    }
  });
}
  $("#slider2").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability2').val(ui.value);
      $('#team2probability2').val(100 - (ui.value));
    }
  });

  $("#slider3").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability3').val(ui.value);
      $('#team2probability3').val(100 - (ui.value));
    }
  });

  $("#slider4").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability4').val(ui.value);
      $('#team2probability4').val(100 - (ui.value));
    }
  });

  $("#slider5").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability5').val(ui.value);
      $('#team2probability5').val(100 - (ui.value));
    }
  });

  $("#slider6").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability6').val(ui.value);
      $('#team2probability6').val(100 - (ui.value));
    }
  });

  $("#slider7").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability7').val(ui.value);
      $('#team2probability7').val(100 - (ui.value));
    }
  });

  $("#slider8").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability8').val(ui.value);
      $('#team2probability8').val(100 - (ui.value));
    }
  });

  $("#slider9").slider({
    min: 0,
    max: 100,
    slide: function(event, ui) {
      $('#probability9').val(ui.value);
      $('#team2probability9').val(100 - (ui.value));
    }
  });

}

function reset() {
  for (var l = 1; l < 10; l++) {
    $('#probability' + l).val('');
    $('#team2probability' + l).val('');
  }
  $('#chart').addClass('hide');
  $('#simulate_button').show();
  $('#reset_button').addClass('hide');
  $('#result').hide();
  $('#after').show();
  $('#instructions').show()
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
    $('#team1').val() + " wins " + ((totalMatches1/num_of_simulations)*100).toFixed(2) + "%. " + $('#team2').val() + " wins " + ((totalMatches2/num_of_simulations)*100).toFixed(2) + "%."
    $('#result').text(output);
    $('#result').show();
    $('#chart').removeClass('hide');
    $('#chart').empty();
    $('#after').hide();
    $('#instructions').hide();

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
