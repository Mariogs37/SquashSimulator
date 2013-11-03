//functions defined

function start() {
  for (var n = 1; n < 10; n++) {
    var name = "#slider" + n;
    $(name).slider({
      min: 0,
      max: 100,
      slide: function(event, ui) {
        n = this.id[6];
        $('#probability' + n).val(ui.value);
        $('#team2probability' + n).val(100 - (ui.value));
      }
    });
  }
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
  $('#instructions').show();
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

    var selectText1 = $('#team1 option:selected').html();
    var selectText2 = $('#team2 option:selected').html();
    var output = "Over " + num_of_simulations.toString() + " simulations, " + selectText1 + ": " + totalMatches1.toString() + ", " + selectText2 + ": " + totalMatches2.toString() + ". " +
    selectText1 + " wins " + ((totalMatches1/num_of_simulations)*100).toFixed(2) + "%. " + selectText2 + " wins " + ((totalMatches2/num_of_simulations)*100).toFixed(2) + "%.";

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


function calculate_probability(rating1, rating2) {
  var first_probability;
  if (rating1 > rating2)
    first_probability = 1/(Math.pow(10, (-(rating1-rating2)/0.5))+1);
    first_probability = Math.round(100 * first_probability);
  else
    first_probability = 1 - (1/(Math.pow(10, (-(rating2-rating1)/0.5))+1));
    first_probability = Math.round(100 * first_probability);
  return first_probability;
}

//code run on page load

$(function(){
  start();
  $('#simulate_button').click(run_simulation);
  $('#reset_button').click(reset);
  $('select').change(function(){
    var selected_team1 = $('#team1').val();
    var selected_team2 = $('#team2').val();
    $.ajax({
      dataType: 'json',
      url: '/team_lookup',
      type: 'get',
      data: {
        first_team: selected_team1,
        second_team: selected_team2
      }
    }).done(function(received_data){
      var first = received_data.teams[0];
      var second = received_data.teams[1];
      for (var index1 = 0; index1 < first.length; index1++)
        {
          $('#Team1Name'+ (index1+1)).val(first[index1][0]);
          $('#Team1Name'+ (index1+1)).data('rating', first[index1][1]);

        }
      for (var index2 = 0; index2 < second.length; index2++)
        {
          $('#Team2Name'+ (index2+1)).val(second[index2][0]);
          $('#Team2Name'+ (index2+1)).data('rating', second[index2][1]);
        }
      if ( ($('#team1').val() != 'Select Team') || ($('#team2').val() != 'Select Team')) {
        for (var k = 1; k <= first.length; k++) {
          var first_rating = parseFloat($('#Team1Name'+k).data().rating);
          var second_rating = parseFloat($('#Team2Name'+k).data().rating);
          var first_prob = calculate_probability(first_rating, second_rating);
          var second_prob = Math.round(100 - first_prob);
          $('#probability'+k).val(first_prob);
          $('#team2probability'+k).val(second_prob);
        }
      }
  });
});

});
