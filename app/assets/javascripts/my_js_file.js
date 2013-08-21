$(function() {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: '/ladder',
      type: 'get'
    }).done(function(received_data){
      for (var m = 0; m < received_data.length; m++) {
        $('#ladder ol').append('<li>' + received_data[m] + '</li>');
      }
    });
  });